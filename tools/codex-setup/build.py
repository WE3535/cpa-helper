import hashlib, json, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
HERE = pathlib.Path(__file__).resolve().parent
ASSETS = ROOT/'dist/assets'
VERSION = '20261117'
for ext in ('py','ps1'):
    data=(HERE/('setup.'+ext)).read_bytes()
    # Windows PowerShell 5.1 needs a BOM to decode Chinese script text correctly.
    if ext=='ps1': data=b'\xef\xbb\xbf'+data
    (ASSETS/('cpa-codex-setup-'+VERSION+'.'+ext)).write_bytes(data)
hashes={ext:hashlib.sha256((ASSETS/('cpa-codex-setup-'+VERSION+'.'+ext)).read_bytes()).hexdigest() for ext in ('py','ps1')}
template=(HERE/'generator.mjs').read_text().replace('__HASH_PY__',hashes['py']).replace('__HASH_PS__',hashes['ps1'])
(ASSETS/('cpa-codex-setup-'+VERSION+'.js')).write_text(template)
s=(HERE/'live-before.js').read_text()
a=s.index('te=v(()=>');b=s.index('}),he=v(()=>',a)+2
new='te=v(()=>setupPreview(cmdMode.value,z.value,ee.value,chooseSetupModel(Q.value?.models,b.value))),be=v(()=>setupCommand(cmdOs.value,cmdMode.value,z.value,ee.value,chooseSetupModel(Q.value?.models,b.value),window.location.origin))'
s=s[:a]+new+s[b:]
s='import {setupPreview,setupCommand,chooseSetupModel} from "./cpa-codex-setup-'+VERSION+'.js";\n'+s
s=s.replace('gpt-5.5','gpt-6.1-sol')
s=s.replace('选择系统和版本后只显示对应命令；CPA API 版会自动修复桌面端快速选项。','选择系统和版本后复制命令；先验证接口，再备份、切换并重启。请先保存正在进行的任务。')
s=s.replace('基础版会显示 config.toml 和 auth.json；API 版不写死 model_reasoning_effort。','下方仅预览受管理的配置项；一键命令会保留现有 MCP、插件和项目配置，模型以接口验证结果为准。')
s=s.replace('CPA API 命令会修复 CodeX 桌面端，让 API 模式也能在模型面板里选择快速/深度。','命令会验证模型接口并保留现有配置；切换后请新建对话验证。')
out=ASSETS/('ApiKeysView-codex-setup-'+VERSION+'.js');out.write_text(s)
print(out)
