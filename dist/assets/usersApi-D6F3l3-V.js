import{c as t}from"./createLucideIcon-cBP00-Pw.js";import{b6 as r}from"./index-Dfrjz4pj.js";/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const a=t("CircleDollarSignIcon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 18V6",key:"zqpxq5"}]]);function i(){return r.get("/users")}function o(e){return r.post("/users",e)}function c(e,s){return r.put(`/users/${e}`,s)}function p(e,s){return r.put(`/users/${e}/quota`,s)}function l(){return r.get("/account/quota")}function f(e){return r.post(`/users/${e}/disable`)}function d(e){return r.post(`/users/${e}/enable`)}function y(e,s){return r.post(`/users/${e}/api-keys`,s)}function U(e,s){return r.delete(`/users/${e}/api-keys/${s}`)}export{a as C,p as a,y as b,o as c,U as d,d as e,f,l as g,i as l,c as u};
