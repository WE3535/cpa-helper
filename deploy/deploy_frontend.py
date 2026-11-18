#!/usr/bin/env python3
"""Publish versioned frontend assets to the existing 2C/4GB deployment."""
import hashlib, io, json, os, pathlib, re, subprocess, sys, tarfile, time
root=pathlib.Path(__file__).resolve().parent.parent
revision=sys.argv[1] if len(sys.argv)>1 else 'codex-setup-20261117'
mem=int(next(x.split()[1] for x in pathlib.Path('/proc/meminfo').read_text().splitlines() if x.startswith('MemTotal:')))
assert os.cpu_count()==2 and 3_000_000<mem<5_000_000, 'Expected Tencent Singapore 2C/4GB host'
k=['sudo','-n','kubectl','-n','environment-69fc6d9de5ed304c1d8452b4']
d=json.loads(subprocess.check_output(k+['get','deployment','cpa-helper','-o','json']))
selector=','.join(a+'='+b for a,b in d['spec']['selector']['matchLabels'].items())
pods=json.loads(subprocess.check_output(k+['get','pods','-l',selector,'-o','json']))['items']
ready=[p for p in pods if p['status']['phase']=='Running' and all(c.get('ready') for c in p['status'].get('containerStatuses',[]))]
assert len(ready)==1, 'Expected one ready CPA-helper pod'
pod=ready[0]['metadata']['name'];ex=k+['exec','-i',pod,'--']
files=['assets/'+n for n in ['ApiKeysView-codex-setup-20261117.js','cpa-codex-setup-20261117.js','cpa-codex-setup-20261117.py','cpa-codex-setup-20261117.ps1','index-cpa-setup-20261117.js']]
buf=io.BytesIO();hashes={}
with tarfile.open(fileobj=buf,mode='w:gz') as tar:
    for f in files:
        tar.add(root/'dist'/f,arcname=f);hashes[f]=hashlib.sha256((root/'dist'/f).read_bytes()).hexdigest()
    tar.add(root/'dist/index.html',arcname='index.html.next')
dest='/app/data/override/dist'
# Preserve the existing tokenized compatibility route only on the server.
# It must never enter source control, release archives or command output.
settings=dest+'/runtime-settings.js'
exists=subprocess.run(ex+['test','-f',settings],capture_output=True).returncode==0
if not exists:
    old=subprocess.check_output(ex+['cat',dest+'/assets/ApiKeysView-CKHC4xHI-profileonly-cmdfix0817-preserve-deletes.js'],text=True)
    route=re.search(r'/(hermes-[a-f0-9]{32})/v1',old)
    path='/'+route[1]+'/v1' if route else '/v1'
    subprocess.run(ex+['sh','-c','umask 077; cat > '+settings],input='window.CPA_HELPER_HERMES_PATH='+json.dumps(path)+';\n',text=True,check=True)
backup='/app/data/override/frontend-backups/release-'+str(int(time.time()))
subprocess.run(ex+['mkdir','-p',backup],check=True)
subprocess.run(ex+['cp',dest+'/index.html',backup+'/index.html'],check=True)
subprocess.run(ex+['tar','xzf','-','-C',dest],input=buf.getvalue(),check=True)
for f,want in hashes.items():
    got=subprocess.check_output(ex+['sha256sum',dest+'/'+f],text=True).split()[0]
    assert got==want, 'Asset digest mismatch: '+f
subprocess.run(ex+['mv',dest+'/index.html.next',dest+'/index.html'],check=True)
subprocess.run(ex+['sh','-c','cat > /app/data/override/frontend-release.txt'],input=(root/'frontend-release.txt').read_bytes(),check=True)
hashes['index.html']=hashlib.sha256((root/'dist/index.html').read_bytes()).hexdigest()
subprocess.run(ex+['sh','-c','cat > /app/data/override/frontend-deploy.json'],input=json.dumps({'revision':revision,'files':hashes}).encode(),check=True)
print('CPA-helper frontend deployed: '+revision+'; rollback: '+backup+'/index.html')
