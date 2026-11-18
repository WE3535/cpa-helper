import{c as o}from"./createLucideIcon-cBP00-Pw.js";import{b6 as t}from"./index-Dfrjz4pj.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=o("CirclePauseIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"10",x2:"10",y1:"15",y2:"9",key:"c1nkhi"}],["line",{x1:"14",x2:"14",y1:"15",y2:"9",key:"h65svq"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=o("ShieldAlertIcon",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=o("Trash2Icon",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);function a(){return t.get("/codex-keeper/settings")}function d(e){return t.put("/codex-keeper/settings",e)}function i(e){return t.post("/codex-keeper/schedule/preview",e)}function x(){return t.get("/codex-keeper/status")}function l(){return t.get("/codex-keeper/accounts")}function k(){return t.post("/codex-keeper/run-once")}function C(){return t.post("/codex-keeper/start")}function y(){return t.post("/codex-keeper/stop")}function f(){return t.post("/codex-keeper/logs/clear")}function h(e){return t.post(`/codex-keeper/accounts/${encodeURIComponent(e)}/enable`)}function K(e){return t.post(`/codex-keeper/accounts/${encodeURIComponent(e)}/disable`)}function g(e){return t.delete(`/codex-keeper/accounts/${encodeURIComponent(e)}`)}function b(e){return t.post("/codex-keeper/accounts/bulk-delete",e)}function m(e){return t.post("/codex-keeper/accounts/refresh",e)}function A(e,r){return t.patch(`/codex-keeper/accounts/${encodeURIComponent(e)}/priority`,{priority:r})}export{s as C,p as S,u as T,x as a,y as b,f as c,b as d,m as e,A as f,a as g,h,K as i,g as j,l,i as p,k as r,C as s,d as u};
