import base64, http.server, json, os, pathlib, subprocess, sys, tempfile, threading, tomllib, unittest
HERE=pathlib.Path(__file__).resolve().parent
PWSH=os.environ.get('CPA_TEST_PWSH', 'pwsh')
ORIGINAL='''model = "original-model"
model_provider = "openai"
model_reasoning_effort = "medium"
notify = ["a", "b"]
[mcp_servers.example]
command = "echo"
[plugins."example@test"]
enabled = true
[projects."/a path"]
trust_level = "trusted"
'''
AUTH={'auth_mode':'chatgpt','tokens':{'test':'original'},'OPENAI_API_KEY':None}
class Server(http.server.BaseHTTPRequestHandler):
    def log_message(self,*a): pass
    def do_GET(self):
        if self.headers.get('Authorization')!='Bearer test-key': self.send_error(401);return
        body=json.dumps({'data':[{'id':'gpt-6.1-sol'}]}).encode();self.send_response(200);self.end_headers();self.wfile.write(body)
    def do_POST(self):
        b=json.loads(self.rfile.read(int(self.headers['Content-Length'])))
        if b['model']!='gpt-6.1-sol': self.send_error(400);return
        self.send_response(200);self.send_header('Content-Type','text/event-stream');self.end_headers()
        self.wfile.write(b'event: response.completed\ndata: {"type":"response.completed"}\n\n')

class SetupTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server=http.server.ThreadingHTTPServer(('127.0.0.1',0),Server)
        threading.Thread(target=cls.server.serve_forever,daemon=True).start()
    @classmethod
    def tearDownClass(cls):cls.server.shutdown()
    def run_mode(self,platform,folder,mode,key='test-key'):
        payload=base64.b64encode(json.dumps({'mode':mode,'api_key':key,'base_url':'http://127.0.0.1:'+str(self.server.server_port),'model':'gpt-5.5'}).encode()).decode()
        cmd=([sys.executable,str(HERE/'setup.py'),payload,'--no-app'] if platform=='mac' else [PWSH,'-NoProfile','-File',str(HERE/'setup.ps1'),'-Payload',payload,'-NoApp'])
        env=dict(os.environ,CODEX_HOME=str(folder))
        return subprocess.run(cmd,env=env,capture_output=True,text=True,timeout=25)
    def test_switch_restore_and_failure(self):
        for platform in ('mac','windows'):
            with self.subTest(platform=platform),tempfile.TemporaryDirectory() as d:
                p=pathlib.Path(d);(p/'config.toml').write_text(ORIGINAL);(p/'auth.json').write_text(json.dumps(AUTH))
                before=(p/'config.toml').read_bytes()
                r=self.run_mode(platform,p,'basic','invalid');self.assertNotEqual(r.returncode,0);self.assertEqual(before,(p/'config.toml').read_bytes());self.assertFalse((p/'cpa-helper-account-backup').exists())
                for mode in ('basic','basic','api','api','basic','account'):
                    r=self.run_mode(platform,p,mode);self.assertEqual(r.returncode,0,r.stdout+r.stderr)
                    raw=(p/'config.toml').read_bytes();self.assertFalse(raw.startswith(b'\xef\xbb\xbf'))
                    j=tomllib.loads(raw.decode());orig=tomllib.loads(ORIGINAL)
                    for k in ('mcp_servers','plugins','projects','notify','model_reasoning_effort'):self.assertEqual(j[k],orig[k])
                    auth=json.loads((p/'auth.json').read_text())
                    if mode=='account':self.assertEqual(j,orig);self.assertEqual(auth,AUTH)
                    else:
                        self.assertEqual(j['model'],'gpt-6.1-sol');self.assertEqual(j['model_provider'],'cpa_helper')
                        self.assertEqual(j['model_providers']['cpa_helper']['requires_openai_auth'],mode=='basic')
                        if mode=='basic':self.assertEqual(auth['OPENAI_API_KEY'],'test-key')
                        else:self.assertEqual(auth,AUTH);self.assertEqual(j['model_providers']['cpa_helper']['experimental_bearer_token'],'test-key')
    def test_no_initial_config(self):
        for platform in ('mac','windows'):
            with self.subTest(platform=platform),tempfile.TemporaryDirectory() as d:
                p=pathlib.Path(d)
                for mode in ('basic','account'):
                    r=self.run_mode(platform,p,mode);self.assertEqual(r.returncode,0,r.stdout+r.stderr)
                self.assertFalse((p/'auth.json').exists());self.assertEqual(tomllib.loads((p/'config.toml').read_text()),{})
    def test_multiline_stops_without_changes(self):
        for platform in ('mac','windows'):
            with self.subTest(platform=platform),tempfile.TemporaryDirectory() as d:
                p=pathlib.Path(d);s='instructions = """\n[not_a_table]\nmodel = "keep"\n"""\n';(p/'config.toml').write_text(s)
                r=self.run_mode(platform,p,'account');self.assertNotEqual(r.returncode,0);self.assertEqual((p/'config.toml').read_text(),s)
if __name__=='__main__':unittest.main(verbosity=2)
