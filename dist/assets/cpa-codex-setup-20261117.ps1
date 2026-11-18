param([Parameter(Mandatory=$true)][string]$Payload, [switch]$NoApp)
$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding($false)
$data = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($Payload)) | ConvertFrom-Json
$mode = $data.mode
if ($mode -notin @('basic','api','account')) { throw '未知模式' }
$dir = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $HOME '.codex' }
$configPath = Join-Path $dir 'config.toml'; $authPath = Join-Path $dir 'auth.json'
$stateDir = Join-Path $dir 'cpa-helper-account-backup'; $manifest = Join-Path $stateDir 'state.json'
function Read-Text($path) { if (Test-Path -LiteralPath $path) { return [IO.File]::ReadAllText($path) }; return '' }
function Write-Atomic($path, [string]$text) {
    $temp = $path + '.cpa-tmp'
    [IO.File]::WriteAllText($temp, $text, $utf8)
    if (Test-Path -LiteralPath $path) { [IO.File]::Replace($temp,$path,[System.Management.Automation.Language.NullString]::Value) }
    else { [IO.File]::Move($temp,$path) }
}
function Split-Config([string]$text) {
    if ($text.Contains('"""') -or $text.Contains("'''")) { throw '配置含多行 TOML 字符串，请手动合并；原文件未修改。' }
    $root = New-Object 'Collections.Generic.List[string]'
    $tables = New-Object 'Collections.Generic.List[string]'
    $saved = New-Object 'Collections.Generic.List[string]'
    $section = ''
    foreach ($line in ($text -split '\r?\n')) {
        if ($line -match '^\s*\[.*\]\s*(?:#.*)?$') { $section = ($line -split '#',2)[0].Trim() }
        if ($section -eq '[model_providers.cpa_helper]' -or $section.StartsWith('[model_providers.cpa_helper.')) { continue }
        if (-not $section -and $line -match '^\s*["'']?(model|review_model|model_provider|profile|openai_base_url|forced_login_method|cli_auth_credentials_store)["'']?\s*=') { $saved.Add($line) }
        elseif ($section) { $tables.Add($line) } else { $root.Add($line) }
    }
    return @{ Root=@($root.ToArray()); Tables=@($tables.ToArray()); Saved=@($saved.ToArray()) }
}
function Json-String([string]$value) { return ConvertTo-Json -InputObject $value -Compress }
function Test-Endpoint {
    $base = $data.base_url.TrimEnd('/')
    if (-not ($base.StartsWith('https://') -or $base.StartsWith('http://127.0.0.1:'))) { throw '需要 HTTPS API 地址。' }
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $headers = @{Authorization=('Bearer '+$data.api_key)}
    $catalog = Invoke-RestMethod -Uri ($base+'/models') -Headers $headers -TimeoutSec 60
    $ids = @($catalog.data | ForEach-Object { $_.id })
    $chosen = @($data.model,'gpt-6.1-sol','gpt-6-sol','gpt-5.6-sol') | Where-Object { $_ -and $_ -in $ids } | Select-Object -First 1
    if (-not $chosen) { throw '未找到支持的 Codex 模型，请在后台选择当前可用模型。' }
    $body = @{model=$chosen;input=@(@{role='user';content=@(@{type='input_text';text='Reply only OK.'})});stream=$true;store=$false} | ConvertTo-Json -Depth 10 -Compress
    $r = Invoke-WebRequest -UseBasicParsing -Uri ($base+'/responses') -Method Post -Headers $headers -ContentType 'application/json' -Body ([Text.Encoding]::UTF8.GetBytes($body)) -TimeoutSec 90
    $content = if ($r.Content -is [byte[]]) { [Text.Encoding]::UTF8.GetString($r.Content) } else { [string]$r.Content }
    $complete = $false
    foreach ($line in ($content -split '\r?\n')) {
        if ($line.StartsWith('data: {')) {
            $ev = $line.Substring(6) | ConvertFrom-Json
            if ($ev.type -eq 'response.completed') { $complete=$true }
            if ($ev.type -in @('error','response.failed')) { throw '模型调用失败，未切换配置。' }
        }
    }
    if (-not $complete) { throw 'Responses 流未正常完成，未切换配置。' }
    Write-Host ('接口及模型验证成功：'+$chosen)
    return $chosen
}
function Stop-Desktop {
    # Remember the running executable before closing it. No forced termination.
    $running = @(Get-Process -Name Codex,ChatGPT -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowHandle -ne 0 })
    $target = $null
    foreach ($p in $running) {
        if (-not $target) { $target=$p.Path }
        if (-not $p.CloseMainWindow()) { throw '应用未正常退出，请保存任务并手动退出后重试。' }
        if (-not $p.WaitForExit(20000)) { throw '等待应用退出超时；未写入配置，请手动退出后重试。' }
    }
    return $target
}
$parts = Split-Config (Read-Text $configPath)
$state = if (Test-Path -LiteralPath $manifest) { Read-Text $manifest | ConvertFrom-Json } else { $null }
$model = if ($mode -ne 'account') { Test-Endpoint } else { $null }
$appPath = if (-not $NoApp) { Stop-Desktop } else { $null }
$parts = Split-Config (Read-Text $configPath)
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$stamp = Get-Date -Format yyyyMMddHHmmssfffffff
foreach ($p in @($configPath,$authPath)) { if (Test-Path -LiteralPath $p) { Copy-Item -LiteralPath $p -Destination ($p+'.bak-cpa-helper-'+$stamp) } }
if ($mode -ne 'account' -and -not $state) {
    New-Item -ItemType Directory -Force -Path $stateDir | Out-Null
    $state = [pscustomobject]@{root_keys=@($parts.Saved);auth_existed=(Test-Path -LiteralPath $authPath)}
    if ($state.auth_existed) { Copy-Item -LiteralPath $authPath -Destination (Join-Path $stateDir 'auth.json') }
    Write-Atomic $manifest ($state | ConvertTo-Json -Depth 10)
}
if ($mode -eq 'account') {
    $restored = if ($state) { @($state.root_keys) } else { @('model_provider = "openai"') }
    $final = (($restored + $parts.Root + $parts.Tables) -join "`n").Trim()+"`n"
} else {
    $top = @('model = '+(Json-String $model); 'review_model = '+(Json-String $model); 'model_provider = "cpa_helper"')
    if ($mode -eq 'basic') { $top += @('cli_auth_credentials_store = "file"','forced_login_method = "api"') }
    $block = @(''; '[model_providers.cpa_helper]'; 'name = "CPA-helper"'; 'base_url = '+(Json-String $data.base_url.TrimEnd('/')); 'wire_api = "responses"'; 'requires_openai_auth = '+$(if ($mode -eq 'basic') {'true'} else {'false'}))
    if ($mode -eq 'api') { $block += 'experimental_bearer_token = '+(Json-String $data.api_key) }
    $final = (($top + $parts.Root + $parts.Tables + $block) -join "`n")+"`n"
}
Write-Atomic $configPath $final
if ($mode -eq 'basic') { Write-Atomic $authPath (@{auth_mode='apikey';OPENAI_API_KEY=$data.api_key} | ConvertTo-Json) }
elseif ($state) {
    if ($state.auth_existed) { Write-Atomic $authPath (Read-Text (Join-Path $stateDir 'auth.json')) }
    elseif (Test-Path -LiteralPath $authPath) { Remove-Item -LiteralPath $authPath }
} elseif ($mode -eq 'account' -and (Test-Path -LiteralPath $authPath)) {
    $authData = Read-Text $authPath | ConvertFrom-Json
    if ($authData.OPENAI_API_KEY -and -not $authData.tokens) { Remove-Item -LiteralPath $authPath }
}
if ($mode -eq 'account' -and $state) { Move-Item -LiteralPath $stateDir -Destination ($stateDir+'.restored-'+$stamp) }
Write-Host ('配置已写入；MCP、插件和项目配置已保留。备份时间：'+$stamp)
if (-not $NoApp) {
    if ($appPath) { Start-Process -FilePath $appPath }
    else {
        $app = Get-StartApps | Where-Object { $_.Name -in @('Codex','ChatGPT') } | Select-Object -First 1
        if ($app) { Start-Process explorer.exe -ArgumentList ('shell:AppsFolder\'+$app.AppID) }
        else { Write-Host '未找到应用，请手动启动 Codex/ChatGPT。' }
    }
}
Write-Host '请新建对话验证；旧对话可能保留原 provider。账号模式如有提示请重新登录。'
