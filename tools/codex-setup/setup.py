#!/usr/bin/env python3
"""CPA-helper setup: preflight first; preserve unrelated TOML and account auth."""
import base64, datetime, hashlib, json, os, pathlib, re, shutil, ssl, subprocess, sys, time, urllib.request

OWNED = {'model', 'review_model', 'model_provider', 'profile', 'openai_base_url',
         'forced_login_method', 'cli_auth_credentials_store'}
HEADER = re.compile(r'^\s*\[.*\]\s*(?:#.*)?$')
KEY = re.compile(r'^\s*["\']?([A-Za-z_][\w-]*)["\']?\s*=')

def split_config(text):
    # Deliberately stop on multiline TOML rather than risk changing its contents.
    if '\"\"\"' in text or "'''" in text:
        raise RuntimeError('配置含多行 TOML 字符串，请手动合并；原文件未修改。')
    root, tables, saved, section = [], [], [], ''
    for line in text.splitlines():
        if HEADER.match(line):
            section = line.strip().split('#', 1)[0].strip()
        if section == '[model_providers.cpa_helper]' or section.startswith('[model_providers.cpa_helper.'):
            continue
        m = KEY.match(line)
        if not section and m and m[1] in OWNED:
            saved.append(line)
        elif section:
            tables.append(line)
        else:
            root.append(line)
    return root, tables, saved

def write(path, data):
    temp = path.with_name(path.name + '.cpa-tmp')
    with open(temp, 'w', encoding='utf-8') as f:
        os.chmod(temp, 0o600); f.write(data)
    os.replace(temp, path)

def api(base, key, path, payload=None):
    req = urllib.request.Request(base + path, data=json.dumps(payload).encode() if payload else None,
        headers={'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json'})
    context = ssl.create_default_context()
    if sys.platform == 'darwin' and pathlib.Path('/etc/ssl/cert.pem').exists():
        context.load_verify_locations('/etc/ssl/cert.pem')
    return urllib.request.urlopen(req, timeout=90, context=context)

def preflight(data):
    base = data['base_url'].rstrip('/')
    if not base.startswith('https://') and not base.startswith('http://127.0.0.1:'):
        raise RuntimeError('需要 HTTPS API 地址。')
    with api(base, data['api_key'], '/models') as r:
        ids = [x['id'] for x in json.load(r)['data']]
    choices = [data.get('model'), 'gpt-6.1-sol', 'gpt-6-sol', 'gpt-5.6-sol']
    model = next((x for x in choices if x and x in ids), None)
    if not model: raise RuntimeError('未找到支持的 Codex 模型，请在后台选择当前可用模型。')
    payload = {'model': model, 'input': [{'role': 'user', 'content': [{'type': 'input_text', 'text': 'Reply only OK.'}]}], 'stream': True, 'store': False}
    completed = False
    with api(base, data['api_key'], '/responses', payload) as r:
        for line in r:
            if line.startswith(b'data: {'):
                event = json.loads(line[6:])
                if event.get('type') == 'response.completed': completed = True
                if event.get('type') in ('error', 'response.failed'): raise RuntimeError('模型调用失败，未切换配置。')
    if not completed: raise RuntimeError('Responses 流未正常完成，未切换配置。')
    print('接口及模型验证成功：' + model)
    return model

def stop_app():
    # Resolve the actually running main app, not an old installed Codex copy.
    ps = subprocess.check_output(['ps', '-axo', 'pid=,comm='], text=True)
    apps = []
    for line in ps.splitlines():
        m = re.match(r'\s*(\d+)\s+(.*/(Codex|ChatGPT)\.app)/Contents/MacOS/(?:Codex|ChatGPT)$', line)
        if m: apps.append((int(m[1]), m[2]))
    for pid, path in apps:
        result = subprocess.run(['osascript', '-e', 'tell application ' + json.dumps(path) + ' to quit'], capture_output=True)
        if result.returncode: raise RuntimeError('应用未正常退出，请保存任务并手动退出后重试。')
        for _ in range(100):
            try: os.kill(pid, 0)
            except ProcessLookupError: break
            time.sleep(.2)
        else: raise RuntimeError('等待应用退出超时；未写入配置。')
    if apps: return apps[0][1]
    for path in ['/Applications/ChatGPT.app', '/Applications/Codex.app', str(pathlib.Path.home()/'Applications/ChatGPT.app'), str(pathlib.Path.home()/'Applications/Codex.app')]:
        if pathlib.Path(path).exists(): return path
    return None

def main():
    data = json.loads(base64.b64decode(sys.argv[1]))
    mode = data['mode']
    if mode not in ('basic', 'api', 'account'): raise RuntimeError('未知模式')
    folder = pathlib.Path(os.environ.get('CODEX_HOME') or pathlib.Path.home()/'.codex')
    config, auth = folder/'config.toml', folder/'auth.json'
    old = config.read_text(encoding='utf-8-sig') if config.exists() else ''
    root, tables, original_keys = split_config(old)
    state_dir = folder/'cpa-helper-account-backup'
    manifest = state_dir/'state.json'
    state = json.loads(manifest.read_text()) if manifest.exists() else None
    model = preflight(data) if mode != 'account' else None
    app = None if '--no-app' in sys.argv else stop_app()
    # Re-read after exit: a running app may flush settings as it shuts down.
    old = config.read_text(encoding='utf-8-sig') if config.exists() else ''
    root, tables, original_keys = split_config(old)
    folder.mkdir(mode=0o700, parents=True, exist_ok=True)
    stamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')
    for f in (config, auth):
        if f.exists():
            backup = f.with_name(f.name+'.bak-cpa-helper-'+stamp)
            shutil.copy2(f, backup); backup.chmod(0o600)
    if mode != 'account' and state is None:
        state_dir.mkdir(mode=0o700, exist_ok=True);state_dir.chmod(0o700)
        original_auth = auth.read_bytes() if auth.exists() else None
        state = {'root_keys': original_keys, 'auth_existed': original_auth is not None}
        if original_auth is not None:
            (state_dir/'auth.json').write_bytes(original_auth);(state_dir/'auth.json').chmod(0o600)
        write(manifest, json.dumps(state))
    if mode == 'account':
        restored = state['root_keys'] if state else []
        # No snapshot: explicitly return to the built-in provider instead of retaining a stale API model.
        if not state: restored = ['model_provider = "openai"']
        final = '\n'.join(restored + root + tables).strip()+'\n'
    else:
        top = ['model = '+json.dumps(model), 'review_model = '+json.dumps(model), 'model_provider = "cpa_helper"']
        if mode == 'basic': top += ['cli_auth_credentials_store = "file"', 'forced_login_method = "api"']
        block = ['', '[model_providers.cpa_helper]', 'name = "CPA-helper"', 'base_url = '+json.dumps(data['base_url'].rstrip('/')), 'wire_api = "responses"', 'requires_openai_auth = '+('true' if mode == 'basic' else 'false')]
        if mode == 'api': block += ['experimental_bearer_token = '+json.dumps(data['api_key'])]
        final = '\n'.join(top+root+tables+block)+'\n'
    try:
        import tomllib
        tomllib.loads(final)
    except ImportError: pass  # Python 3.8-3.10; generated TOML uses only basic strings.
    write(config, final)
    if mode == 'basic': write(auth, json.dumps({'auth_mode':'apikey','OPENAI_API_KEY':data['api_key']}))
    elif state:
        if state['auth_existed']: write(auth, (state_dir/'auth.json').read_text())
        elif auth.exists(): auth.unlink()
    elif mode == 'account' and auth.exists():
        j=json.loads(auth.read_text())
        if j.get('OPENAI_API_KEY') and not j.get('tokens'): auth.unlink()
    if mode == 'account' and state:
        # Keep the snapshot as an archive; allow a future switch to capture new account settings.
        state_dir.rename(folder/('cpa-helper-account-backup.restored-'+stamp))
    print('配置已验证并写入；MCP、插件和项目配置已保留。备份时间：'+stamp)
    if app:
        subprocess.run(['open','-a',app],check=True)
        print('已重新启动应用。请新建对话验证；旧对话可能保留原 provider。')
    else: print('请启动 Codex/ChatGPT 并新建对话；账号模式如有提示请重新登录。')

if __name__ == '__main__':
    try: main()
    except Exception as exc:
        # Never echo request headers, payloads or auth file contents.
        print('切换失败：'+str(exc), file=sys.stderr);sys.exit(1)
