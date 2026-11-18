const hashes = {py:'f0f35095757cd39c8736f78441a4c7ff1ae2b69ab1ae0e43233f741b9b7e32e7',ps1:'880d23fdd71f26b5435139a279556a9c0ecb5fa5f155a8dc8a76f4934771aae1'};
export function chooseSetupModel(models, selected) {
  const ids = (models || []).map(x => x.id);
  const candidates = [selected, 'gpt-6.1-sol','gpt-6-sol','gpt-5.6-sol'];
  return candidates.find(x => x && /^gpt-(?!image|oss)/.test(x) && ids.includes(x)) || 'gpt-6.1-sol';
}
export function setupPreview(mode,base,key,model) {
  if(mode==='account') return '# 恢复本工具保存的原 provider 和登录态；保留 MCP、插件及项目配置。\n# 没有备份时清除 API 登录并回到账号登录，新建对话验证。';
  const lines=['# 配置项预览；执行命令会验证可用模型并合并原配置。',`model = ${JSON.stringify(model)}`,`review_model = ${JSON.stringify(model)}`,'model_provider = "cpa_helper"'];
  if(mode==='basic') lines.push('cli_auth_credentials_store = "file"','forced_login_method = "api"');
  lines.push('','[model_providers.cpa_helper]','name = "CPA-helper"',`base_url = ${JSON.stringify(base)}`,'wire_api = "responses"',`requires_openai_auth = ${mode==='basic'}`);
  if(mode==='api') lines.push(`experimental_bearer_token = ${JSON.stringify(key)}`);
  else lines.push('','# auth.json',JSON.stringify({auth_mode:'apikey',OPENAI_API_KEY:key},null,2));
  return lines.join('\n');
}
export function setupCommand(os,mode,base,key,model,origin) {
  const payload = btoa(unescape(encodeURIComponent(JSON.stringify({mode,base_url:base,api_key:mode==='account'?'':key,model}))));
  const title = {basic:'基础版',api:'CPA API 版',account:'恢复账号版'}[mode];
  const url=origin.replace(/\/$/,'')+'/assets/cpa-codex-setup-20261117.';
  if(os==='windows') return [
    `# Windows PowerShell — ${title}；请先保存任务。先验证接口，再备份、切换和重启。`,
    '& {',"$ErrorActionPreference = 'Stop'",
    "$setupFile = Join-Path ([IO.Path]::GetTempPath()) ('cpa-codex-'+[guid]::NewGuid().ToString('N')+'.ps1')",
    'try {',
    `  Invoke-WebRequest -UseBasicParsing -Uri '${(url+'ps1').replace(/'/g,"''")}' -OutFile $setupFile`,
    `  if ((Get-FileHash -LiteralPath $setupFile -Algorithm SHA256).Hash.ToLowerInvariant() -ne '${hashes.ps1}') { throw '安装脚本校验失败；未修改配置。' }`,
    `  & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $setupFile -Payload '${payload}'`,
    "  if ($LASTEXITCODE -ne 0) { throw '切换失败，请查看上面的错误信息。' }",
    '} finally { Remove-Item -LiteralPath $setupFile -Force -ErrorAction SilentlyContinue }','}'
  ].join('\n');
  const sq=s=>"'"+s.replace(/'/g,"'\\''")+"'";
  return [
    `# Mac — ${title}；需要 Python 3，请先保存任务。先验证接口，再备份、切换和重启。`,
    '(', 'set -eu', 'umask 077',
    'command -v python3 >/dev/null 2>&1 || { echo "需要 Python 3；尚未修改配置。" >&2; exit 1; }',
    'SETUP_FILE="$(mktemp -t cpa-codex-setup)"',
    'trap \'rm -f "$SETUP_FILE"\' EXIT',
    `curl --fail --silent --show-error --location ${sq(url+'py')} -o "$SETUP_FILE"`,
    `python3 -c 'import hashlib,sys; assert hashlib.sha256(open(sys.argv[1],"rb").read()).hexdigest()==sys.argv[2], "安装脚本校验失败"' "$SETUP_FILE" '${hashes.py}'`,
    `python3 "$SETUP_FILE" '${payload}'`, ')'
  ].join('\n');
}
