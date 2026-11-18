import{Z as xe,p as z,r as T,M as it,d as ee,R as dt,z as l,a1 as ct,a4 as ln,o as Ke,bI as rn,bw as an,bj as rt,bJ as sn,U as Y,bi as _e,bK as Qe,ai as Ce,a6 as Ct,G as B,O as L,P as se,Q as Rt,I as Ue,J as me,L as qe,bL as dn,aN as ve,X as Te,aa as St,H as re,V as at,aG as Ft,ay as ft,bh as un,S as cn,aE as fn,aU as Ot,bM as hn,ad as Tt,bN as Le,bO as vn,_ as gn,a2 as bn,bP as pn,aB as mn,aT as wn,aD as ht,aH as yn,aI as xn,aC as Cn,aK as Rn,T as ce,bQ as Sn}from"./index-Dfrjz4pj.js";import{f as Fn,e as On,g as et,i as ut,h as $e,j as Tn,k as zn,V as vt,N as In,B as Mn,a as Pn,b as kn,d as st,c as Bn}from"./Popover-DTVg7lv7.js";import{u as zt,a as _n}from"./Input-D1hzrCBS.js";import{N as tt}from"./Tag-mqY5PaYR.js";import{u as gt}from"./_plugin-vue_export-helper-DzwHZgiI.js";import{u as Ln}from"./use-compitable-cb_Gb3bI.js";function bt(e){return e&-e}class It{constructor(n,o){this.l=n,this.min=o;const i=new Array(n+1);for(let s=0;s<n+1;++s)i[s]=0;this.ft=i}add(n,o){if(o===0)return;const{l:i,ft:s}=this;for(n+=1;n<=i;)s[n]+=o,n+=bt(n)}get(n){return this.sum(n+1)-this.sum(n)}sum(n){if(n===void 0&&(n=this.l),n<=0)return 0;const{ft:o,min:i,l:s}=this;if(n>s)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let f=n*i;for(;n>0;)f+=o[n],n-=bt(n);return f}getBound(n){let o=0,i=this.l;for(;i>o;){const s=Math.floor((o+i)/2),f=this.sum(s);if(f>n){i=s;continue}else if(f<n){if(o===s)return this.sum(o+1)<=n?o+1:s;o=s}else return s}return o}}let We;function $n(){return typeof document>"u"?!1:(We===void 0&&("matchMedia"in window?We=window.matchMedia("(pointer:coarse)").matches:We=!1),We)}let nt;function pt(){return typeof document>"u"?1:(nt===void 0&&(nt="chrome"in window?window.devicePixelRatio:1),nt)}const Mt="VVirtualListXScroll";function En({columnsRef:e,renderColRef:n,renderItemWithColsRef:o}){const i=T(0),s=T(0),f=z(()=>{const b=e.value;if(b.length===0)return null;const y=new It(b.length,0);return b.forEach((p,I)=>{y.add(I,p.width)}),y}),v=xe(()=>{const b=f.value;return b!==null?Math.max(b.getBound(s.value)-1,0):0}),d=b=>{const y=f.value;return y!==null?y.sum(b):0},C=xe(()=>{const b=f.value;return b!==null?Math.min(b.getBound(s.value+i.value)+1,e.value.length-1):0});return it(Mt,{startIndexRef:v,endIndexRef:C,columnsRef:e,renderColRef:n,renderItemWithColsRef:o,getLeft:d}),{listWidthRef:i,scrollLeftRef:s}}const mt=ee({name:"VirtualListRow",props:{index:{type:Number,required:!0},item:{type:Object,required:!0}},setup(){const{startIndexRef:e,endIndexRef:n,columnsRef:o,getLeft:i,renderColRef:s,renderItemWithColsRef:f}=dt(Mt);return{startIndex:e,endIndex:n,columns:o,renderCol:s,renderItemWithCols:f,getLeft:i}},render(){const{startIndex:e,endIndex:n,columns:o,renderCol:i,renderItemWithCols:s,getLeft:f,item:v}=this;if(s!=null)return s({itemIndex:this.index,startColIndex:e,endColIndex:n,allColumns:o,item:v,getLeft:f});if(i!=null){const d=[];for(let C=e;C<=n;++C){const b=o[C];d.push(i({column:b,left:f(C),item:v}))}return d}return null}}),Nn=et(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[et("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[et("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]),An=ee({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},columns:{type:Array,default:()=>[]},renderCol:Function,renderItemWithCols:Function,items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(e){const n=sn();Nn.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:Fn,ssr:n}),Ke(()=>{const{defaultScrollIndex:u,defaultScrollKey:w}=e;u!=null?K({index:u}):w!=null&&K({key:w})});let o=!1,i=!1;rn(()=>{if(o=!1,!i){i=!0;return}K({top:F.value,left:v.value})}),an(()=>{o=!0,i||(i=!0)});const s=xe(()=>{if(e.renderCol==null&&e.renderItemWithCols==null||e.columns.length===0)return;let u=0;return e.columns.forEach(w=>{u+=w.width}),u}),f=z(()=>{const u=new Map,{keyField:w}=e;return e.items.forEach((_,$)=>{u.set(_[w],$)}),u}),{scrollLeftRef:v,listWidthRef:d}=En({columnsRef:Y(e,"columns"),renderColRef:Y(e,"renderCol"),renderItemWithColsRef:Y(e,"renderItemWithCols")}),C=T(null),b=T(void 0),y=new Map,p=z(()=>{const{items:u,itemSize:w,keyField:_}=e,$=new It(u.length,w);return u.forEach((A,U)=>{const N=A[_],W=y.get(N);W!==void 0&&$.add(U,W)}),$}),I=T(0),F=T(0),m=xe(()=>Math.max(p.value.getBound(F.value-rt(e.paddingTop))-1,0)),E=z(()=>{const{value:u}=b;if(u===void 0)return[];const{items:w,itemSize:_}=e,$=m.value,A=Math.min($+Math.ceil(u/_+1),w.length-1),U=[];for(let N=$;N<=A;++N)U.push(w[N]);return U}),K=(u,w)=>{if(typeof u=="number"){X(u,w,"auto");return}const{left:_,top:$,index:A,key:U,position:N,behavior:W,debounce:H=!0}=u;if(_!==void 0||$!==void 0)X(_,$,W);else if(A!==void 0)V(A,W,H);else if(U!==void 0){const Q=f.value.get(U);Q!==void 0&&V(Q,W,H)}else N==="bottom"?X(0,Number.MAX_SAFE_INTEGER,W):N==="top"&&X(0,0,W)};let P,k=null;function V(u,w,_){const{value:$}=p,A=$.sum(u)+rt(e.paddingTop);if(!_)C.value.scrollTo({left:0,top:A,behavior:w});else{P=u,k!==null&&window.clearTimeout(k),k=window.setTimeout(()=>{P=void 0,k=null},16);const{scrollTop:U,offsetHeight:N}=C.value;if(A>U){const W=$.get(u);A+W<=U+N||C.value.scrollTo({left:0,top:A+W-N,behavior:w})}else C.value.scrollTo({left:0,top:A,behavior:w})}}function X(u,w,_){C.value.scrollTo({left:u,top:w,behavior:_})}function j(u,w){var _,$,A;if(o||e.ignoreItemResize||te(w.target))return;const{value:U}=p,N=f.value.get(u),W=U.get(N),H=(A=($=(_=w.borderBoxSize)===null||_===void 0?void 0:_[0])===null||$===void 0?void 0:$.blockSize)!==null&&A!==void 0?A:w.contentRect.height;if(H===W)return;H-e.itemSize===0?y.delete(u):y.set(u,H-e.itemSize);const le=H-W;if(le===0)return;U.add(N,le);const r=C.value;if(r!=null){if(P===void 0){const h=U.sum(N);r.scrollTop>h&&r.scrollBy(0,le)}else if(N<P)r.scrollBy(0,le);else if(N===P){const h=U.sum(N);H+h>r.scrollTop+r.offsetHeight&&r.scrollBy(0,le)}J()}I.value++}const D=!$n();let ne=!1;function oe(u){var w;(w=e.onScroll)===null||w===void 0||w.call(e,u),(!D||!ne)&&J()}function fe(u){var w;if((w=e.onWheel)===null||w===void 0||w.call(e,u),D){const _=C.value;if(_!=null){if(u.deltaX===0&&(_.scrollTop===0&&u.deltaY<=0||_.scrollTop+_.offsetHeight>=_.scrollHeight&&u.deltaY>=0))return;u.preventDefault(),_.scrollTop+=u.deltaY/pt(),_.scrollLeft+=u.deltaX/pt(),J(),ne=!0,On(()=>{ne=!1})}}}function ge(u){if(o||te(u.target))return;if(e.renderCol==null&&e.renderItemWithCols==null){if(u.contentRect.height===b.value)return}else if(u.contentRect.height===b.value&&u.contentRect.width===d.value)return;b.value=u.contentRect.height,d.value=u.contentRect.width;const{onResize:w}=e;w!==void 0&&w(u)}function J(){const{value:u}=C;u!=null&&(F.value=u.scrollTop,v.value=u.scrollLeft)}function te(u){let w=u;for(;w!==null;){if(w.style.display==="none")return!0;w=w.parentElement}return!1}return{listHeight:b,listStyle:{overflow:"auto"},keyToIndex:f,itemsStyle:z(()=>{const{itemResizable:u}=e,w=_e(p.value.sum());return I.value,[e.itemsStyle,{boxSizing:"content-box",width:_e(s.value),height:u?"":w,minHeight:u?w:"",paddingTop:_e(e.paddingTop),paddingBottom:_e(e.paddingBottom)}]}),visibleItemsStyle:z(()=>(I.value,{transform:`translateY(${_e(p.value.sum(m.value))})`})),viewportItems:E,listElRef:C,itemsElRef:T(null),scrollTo:K,handleListResize:ge,handleListScroll:oe,handleListWheel:fe,handleItemResize:j}},render(){const{itemResizable:e,keyField:n,keyToIndex:o,visibleItemsTag:i}=this;return l(ct,{onResize:this.handleListResize},{default:()=>{var s,f;return l("div",ln(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[this.items.length!==0?l("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[l(i,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>{const{renderCol:v,renderItemWithCols:d}=this;return this.viewportItems.map(C=>{const b=C[n],y=o.get(b),p=v!=null?l(mt,{index:y,item:C}):void 0,I=d!=null?l(mt,{index:y,item:C}):void 0,F=this.$slots.default({item:C,renderedCols:p,renderedItemWithCols:I,index:y})[0];return e?l(ct,{key:b,onResize:m=>this.handleItemResize(b,m)},{default:()=>F}):(F.key=b,F)})}})]):(f=(s=this.$slots).empty)===null||f===void 0?void 0:f.call(s)])}})}});function Pt(e,n){n&&(Ke(()=>{const{value:o}=e;o&&Qe.registerHandler(o,n)}),Ce(e,(o,i)=>{i&&Qe.unregisterHandler(i)},{deep:!1}),Ct(()=>{const{value:o}=e;o&&Qe.unregisterHandler(o)}))}function wt(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}function ot(e){const n=e.filter(o=>o!==void 0);if(n.length!==0)return n.length===1?n[0]:o=>{e.forEach(i=>{i&&i(o)})}}const so=ee({name:"Backward",render(){return l("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l("path",{d:"M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z",fill:"currentColor"}))}}),Dn=ee({name:"Checkmark",render(){return l("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16"},l("g",{fill:"none"},l("path",{d:"M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",fill:"currentColor"})))}}),Vn=ee({name:"Empty",render(){return l("svg",{viewBox:"0 0 28 28",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l("path",{d:"M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",fill:"currentColor"}),l("path",{d:"M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",fill:"currentColor"}))}}),uo=ee({name:"FastBackward",render(){return l("svg",{viewBox:"0 0 20 20",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},l("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},l("g",{fill:"currentColor","fill-rule":"nonzero"},l("path",{d:"M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z"}))))}}),co=ee({name:"FastForward",render(){return l("svg",{viewBox:"0 0 20 20",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},l("g",{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"},l("g",{fill:"currentColor","fill-rule":"nonzero"},l("path",{d:"M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z"}))))}}),fo=ee({name:"Forward",render(){return l("svg",{viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l("path",{d:"M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z",fill:"currentColor"}))}}),jn=ee({props:{onFocus:Function,onBlur:Function},setup(e){return()=>l("div",{style:"width: 0; height: 0",tabindex:0,onFocus:e.onFocus,onBlur:e.onBlur})}}),Wn=B("empty",`
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`,[L("icon",`
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `,[se("+",[L("description",`
 margin-top: 8px;
 `)])]),L("description",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),L("extra",`
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]),Hn=Object.assign(Object.assign({},me.props),{description:String,showDescription:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!0},size:{type:String,default:"medium"},renderIcon:Function}),Kn=ee({name:"Empty",props:Hn,slots:Object,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:o,mergedComponentPropsRef:i}=Ue(e),s=me("Empty","-empty",Wn,dn,e,n),{localeRef:f}=zt("Empty"),v=z(()=>{var y,p,I;return(y=e.description)!==null&&y!==void 0?y:(I=(p=i==null?void 0:i.value)===null||p===void 0?void 0:p.Empty)===null||I===void 0?void 0:I.description}),d=z(()=>{var y,p;return((p=(y=i==null?void 0:i.value)===null||y===void 0?void 0:y.Empty)===null||p===void 0?void 0:p.renderIcon)||(()=>l(Vn,null))}),C=z(()=>{const{size:y}=e,{common:{cubicBezierEaseInOut:p},self:{[ve("iconSize",y)]:I,[ve("fontSize",y)]:F,textColor:m,iconColor:E,extraTextColor:K}}=s.value;return{"--n-icon-size":I,"--n-font-size":F,"--n-bezier":p,"--n-text-color":m,"--n-icon-color":E,"--n-extra-text-color":K}}),b=o?qe("empty",z(()=>{let y="";const{size:p}=e;return y+=p[0],y}),C,e):void 0;return{mergedClsPrefix:n,mergedRenderIcon:d,localizedDescription:z(()=>v.value||f.value.description),cssVars:o?void 0:C,themeClass:b==null?void 0:b.themeClass,onRender:b==null?void 0:b.onRender}},render(){const{$slots:e,mergedClsPrefix:n,onRender:o}=this;return o==null||o(),l("div",{class:[`${n}-empty`,this.themeClass],style:this.cssVars},this.showIcon?l("div",{class:`${n}-empty__icon`},e.icon?e.icon():l(Rt,{clsPrefix:n},{default:this.mergedRenderIcon})):null,this.showDescription?l("div",{class:`${n}-empty__description`},e.default?e.default():this.localizedDescription):null,e.extra?l("div",{class:`${n}-empty__extra`},e.extra()):null)}}),yt=ee({name:"NBaseSelectGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{renderLabelRef:e,renderOptionRef:n,labelFieldRef:o,nodePropsRef:i}=dt(ut);return{labelField:o,nodeProps:i,renderLabel:e,renderOption:n}},render(){const{clsPrefix:e,renderLabel:n,renderOption:o,nodeProps:i,tmNode:{rawNode:s}}=this,f=i==null?void 0:i(s),v=n?n(s,!1):Te(s[this.labelField],s,!1),d=l("div",Object.assign({},f,{class:[`${e}-base-select-group-header`,f==null?void 0:f.class]}),v);return s.render?s.render({node:d,option:s}):o?o({node:d,option:s,selected:!1}):d}});function Un(e,n){return l(St,{name:"fade-in-scale-up-transition"},{default:()=>e?l(Rt,{clsPrefix:n,class:`${n}-base-select-option__check`},{default:()=>l(Dn)}):null})}const xt=ee({name:"NBaseSelectOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(e){const{valueRef:n,pendingTmNodeRef:o,multipleRef:i,valueSetRef:s,renderLabelRef:f,renderOptionRef:v,labelFieldRef:d,valueFieldRef:C,showCheckmarkRef:b,nodePropsRef:y,handleOptionClick:p,handleOptionMouseEnter:I}=dt(ut),F=xe(()=>{const{value:P}=o;return P?e.tmNode.key===P.key:!1});function m(P){const{tmNode:k}=e;k.disabled||p(P,k)}function E(P){const{tmNode:k}=e;k.disabled||I(P,k)}function K(P){const{tmNode:k}=e,{value:V}=F;k.disabled||V||I(P,k)}return{multiple:i,isGrouped:xe(()=>{const{tmNode:P}=e,{parent:k}=P;return k&&k.rawNode.type==="group"}),showCheckmark:b,nodeProps:y,isPending:F,isSelected:xe(()=>{const{value:P}=n,{value:k}=i;if(P===null)return!1;const V=e.tmNode.rawNode[C.value];if(k){const{value:X}=s;return X.has(V)}else return P===V}),labelField:d,renderLabel:f,renderOption:v,handleMouseMove:K,handleMouseEnter:E,handleClick:m}},render(){const{clsPrefix:e,tmNode:{rawNode:n},isSelected:o,isPending:i,isGrouped:s,showCheckmark:f,nodeProps:v,renderOption:d,renderLabel:C,handleClick:b,handleMouseEnter:y,handleMouseMove:p}=this,I=Un(o,e),F=C?[C(n,o),f&&I]:[Te(n[this.labelField],n,o),f&&I],m=v==null?void 0:v(n),E=l("div",Object.assign({},m,{class:[`${e}-base-select-option`,n.class,m==null?void 0:m.class,{[`${e}-base-select-option--disabled`]:n.disabled,[`${e}-base-select-option--selected`]:o,[`${e}-base-select-option--grouped`]:s,[`${e}-base-select-option--pending`]:i,[`${e}-base-select-option--show-checkmark`]:f}],style:[(m==null?void 0:m.style)||"",n.style||""],onClick:ot([b,m==null?void 0:m.onClick]),onMouseenter:ot([y,m==null?void 0:m.onMouseenter]),onMousemove:ot([p,m==null?void 0:m.onMousemove])}),l("div",{class:`${e}-base-select-option__content`},F));return n.render?n.render({node:E,option:n,selected:o}):d?d({node:E,option:n,selected:o}):E}}),qn=B("base-select-menu",`
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`,[B("scrollbar",`
 max-height: var(--n-height);
 `),B("virtual-list",`
 max-height: var(--n-height);
 `),B("base-select-option",`
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `,[L("content",`
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]),B("base-select-group-header",`
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `),B("base-select-menu-option-wrapper",`
 position: relative;
 width: 100%;
 `),L("loading, empty",`
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `),L("loading",`
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `),L("header",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),L("action",`
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `),B("base-select-group-header",`
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `),B("base-select-option",`
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `,[re("show-checkmark",`
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `),se("&::before",`
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),se("&:active",`
 color: var(--n-option-text-color-pressed);
 `),re("grouped",`
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `),re("pending",[se("&::before",`
 background-color: var(--n-option-color-pending);
 `)]),re("selected",`
 color: var(--n-option-text-color-active);
 `,[se("&::before",`
 background-color: var(--n-option-color-active);
 `),re("pending",[se("&::before",`
 background-color: var(--n-option-color-active-pending);
 `)])]),re("disabled",`
 cursor: not-allowed;
 `,[at("selected",`
 color: var(--n-option-text-color-disabled);
 `),re("selected",`
 opacity: var(--n-option-opacity-disabled);
 `)]),L("check",`
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `,[Ft({enterScale:"0.5"})])])]),Gn=ee({name:"InternalSelectMenu",props:Object.assign(Object.assign({},me.props),{clsPrefix:{type:String,required:!0},scrollable:{type:Boolean,default:!0},treeMate:{type:Object,required:!0},multiple:Boolean,size:{type:String,default:"medium"},value:{type:[String,Number,Array],default:null},autoPending:Boolean,virtualScroll:{type:Boolean,default:!0},show:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},loading:Boolean,focusable:Boolean,renderLabel:Function,renderOption:Function,nodeProps:Function,showCheckmark:{type:Boolean,default:!0},onMousedown:Function,onScroll:Function,onFocus:Function,onBlur:Function,onKeyup:Function,onKeydown:Function,onTabOut:Function,onMouseenter:Function,onMouseleave:Function,onResize:Function,resetMenuOnOptionsChange:{type:Boolean,default:!0},inlineThemeDisabled:Boolean,scrollbarProps:Object,onToggle:Function}),setup(e){const{mergedClsPrefixRef:n,mergedRtlRef:o,mergedComponentPropsRef:i}=Ue(e),s=Ot("InternalSelectMenu",o,n),f=me("InternalSelectMenu","-internal-select-menu",qn,hn,e,Y(e,"clsPrefix")),v=T(null),d=T(null),C=T(null),b=z(()=>e.treeMate.getFlattenedNodes()),y=z(()=>Tn(b.value)),p=T(null);function I(){const{treeMate:r}=e;let h=null;const{value:q}=e;q===null?h=r.getFirstAvailableNode():(e.multiple?h=r.getNode((q||[])[(q||[]).length-1]):h=r.getNode(q),(!h||h.disabled)&&(h=r.getFirstAvailableNode())),$(h||null)}function F(){const{value:r}=p;r&&!e.treeMate.getNode(r.key)&&(p.value=null)}let m;Ce(()=>e.show,r=>{r?m=Ce(()=>e.treeMate,()=>{e.resetMenuOnOptionsChange?(e.autoPending?I():F(),Tt(A)):F()},{immediate:!0}):m==null||m()},{immediate:!0}),Ct(()=>{m==null||m()});const E=z(()=>rt(f.value.self[ve("optionHeight",e.size)])),K=z(()=>Le(f.value.self[ve("padding",e.size)])),P=z(()=>e.multiple&&Array.isArray(e.value)?new Set(e.value):new Set),k=z(()=>{const r=b.value;return r&&r.length===0}),V=z(()=>{var r,h;return(h=(r=i==null?void 0:i.value)===null||r===void 0?void 0:r.Select)===null||h===void 0?void 0:h.renderEmpty});function X(r){const{onToggle:h}=e;h&&h(r)}function j(r){const{onScroll:h}=e;h&&h(r)}function D(r){var h;(h=C.value)===null||h===void 0||h.sync(),j(r)}function ne(){var r;(r=C.value)===null||r===void 0||r.sync()}function oe(){const{value:r}=p;return r||null}function fe(r,h){h.disabled||$(h,!1)}function ge(r,h){h.disabled||X(h)}function J(r){var h;$e(r,"action")||(h=e.onKeyup)===null||h===void 0||h.call(e,r)}function te(r){var h;$e(r,"action")||(h=e.onKeydown)===null||h===void 0||h.call(e,r)}function u(r){var h;(h=e.onMousedown)===null||h===void 0||h.call(e,r),!e.focusable&&r.preventDefault()}function w(){const{value:r}=p;r&&$(r.getNext({loop:!0}),!0)}function _(){const{value:r}=p;r&&$(r.getPrev({loop:!0}),!0)}function $(r,h=!1){p.value=r,h&&A()}function A(){var r,h;const q=p.value;if(!q)return;const de=y.value(q.key);de!==null&&(e.virtualScroll?(r=d.value)===null||r===void 0||r.scrollTo({index:de}):(h=C.value)===null||h===void 0||h.scrollTo({index:de,elSize:E.value}))}function U(r){var h,q;!((h=v.value)===null||h===void 0)&&h.contains(r.target)&&((q=e.onFocus)===null||q===void 0||q.call(e,r))}function N(r){var h,q;!((h=v.value)===null||h===void 0)&&h.contains(r.relatedTarget)||(q=e.onBlur)===null||q===void 0||q.call(e,r)}it(ut,{handleOptionMouseEnter:fe,handleOptionClick:ge,valueSetRef:P,pendingTmNodeRef:p,nodePropsRef:Y(e,"nodeProps"),showCheckmarkRef:Y(e,"showCheckmark"),multipleRef:Y(e,"multiple"),valueRef:Y(e,"value"),renderLabelRef:Y(e,"renderLabel"),renderOptionRef:Y(e,"renderOption"),labelFieldRef:Y(e,"labelField"),valueFieldRef:Y(e,"valueField")}),it(zn,v),Ke(()=>{const{value:r}=C;r&&r.sync()});const W=z(()=>{const{size:r}=e,{common:{cubicBezierEaseInOut:h},self:{height:q,borderRadius:de,color:Re,groupHeaderTextColor:he,actionDividerColor:ie,optionTextColorPressed:Se,optionTextColor:be,optionTextColorDisabled:ze,optionTextColorActive:Ie,optionOpacityDisabled:Me,optionCheckColor:we,actionTextColor:ye,optionColorPending:Pe,optionColorActive:ke,loadingColor:Be,loadingSize:Fe,optionColorActivePending:Oe,[ve("optionFontSize",r)]:ae,[ve("optionHeight",r)]:a,[ve("optionPadding",r)]:g}}=f.value;return{"--n-height":q,"--n-action-divider-color":ie,"--n-action-text-color":ye,"--n-bezier":h,"--n-border-radius":de,"--n-color":Re,"--n-option-font-size":ae,"--n-group-header-text-color":he,"--n-option-check-color":we,"--n-option-color-pending":Pe,"--n-option-color-active":ke,"--n-option-color-active-pending":Oe,"--n-option-height":a,"--n-option-opacity-disabled":Me,"--n-option-text-color":be,"--n-option-text-color-active":Ie,"--n-option-text-color-disabled":ze,"--n-option-text-color-pressed":Se,"--n-option-padding":g,"--n-option-padding-left":Le(g,"left"),"--n-option-padding-right":Le(g,"right"),"--n-loading-color":Be,"--n-loading-size":Fe}}),{inlineThemeDisabled:H}=e,Q=H?qe("internal-select-menu",z(()=>e.size[0]),W,e):void 0,le={selfRef:v,next:w,prev:_,getPendingTmNode:oe};return Pt(v,e.onResize),Object.assign({mergedTheme:f,mergedClsPrefix:n,rtlEnabled:s,virtualListRef:d,scrollbarRef:C,itemSize:E,padding:K,flattenedNodes:b,empty:k,mergedRenderEmpty:V,virtualListContainer(){const{value:r}=d;return r==null?void 0:r.listElRef},virtualListContent(){const{value:r}=d;return r==null?void 0:r.itemsElRef},doScroll:j,handleFocusin:U,handleFocusout:N,handleKeyUp:J,handleKeyDown:te,handleMouseDown:u,handleVirtualListResize:ne,handleVirtualListScroll:D,cssVars:H?void 0:W,themeClass:Q==null?void 0:Q.themeClass,onRender:Q==null?void 0:Q.onRender},le)},render(){const{$slots:e,virtualScroll:n,clsPrefix:o,mergedTheme:i,themeClass:s,onRender:f}=this;return f==null||f(),l("div",{ref:"selfRef",tabindex:this.focusable?0:-1,class:[`${o}-base-select-menu`,`${o}-base-select-menu--${this.size}-size`,this.rtlEnabled&&`${o}-base-select-menu--rtl`,s,this.multiple&&`${o}-base-select-menu--multiple`],style:this.cssVars,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onKeyup:this.handleKeyUp,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onMouseenter:this.onMouseenter,onMouseleave:this.onMouseleave},ft(e.header,v=>v&&l("div",{class:`${o}-base-select-menu__header`,"data-header":!0,key:"header"},v)),this.loading?l("div",{class:`${o}-base-select-menu__loading`},l(un,{clsPrefix:o,strokeWidth:20})):this.empty?l("div",{class:`${o}-base-select-menu__empty`,"data-empty":!0},fn(e.empty,()=>{var v;return[((v=this.mergedRenderEmpty)===null||v===void 0?void 0:v.call(this))||l(Kn,{theme:i.peers.Empty,themeOverrides:i.peerOverrides.Empty,size:this.size})]})):l(cn,Object.assign({ref:"scrollbarRef",theme:i.peers.Scrollbar,themeOverrides:i.peerOverrides.Scrollbar,scrollable:this.scrollable,container:n?this.virtualListContainer:void 0,content:n?this.virtualListContent:void 0,onScroll:n?void 0:this.doScroll},this.scrollbarProps),{default:()=>n?l(An,{ref:"virtualListRef",class:`${o}-virtual-list`,items:this.flattenedNodes,itemSize:this.itemSize,showScrollbar:!1,paddingTop:this.padding.top,paddingBottom:this.padding.bottom,onResize:this.handleVirtualListResize,onScroll:this.handleVirtualListScroll,itemResizable:!0},{default:({item:v})=>v.isGroup?l(yt,{key:v.key,clsPrefix:o,tmNode:v}):v.ignored?null:l(xt,{clsPrefix:o,key:v.key,tmNode:v})}):l("div",{class:`${o}-base-select-menu-option-wrapper`,style:{paddingTop:this.padding.top,paddingBottom:this.padding.bottom}},this.flattenedNodes.map(v=>v.isGroup?l(yt,{key:v.key,clsPrefix:o,tmNode:v}):l(xt,{clsPrefix:o,key:v.key,tmNode:v})))}),ft(e.action,v=>v&&[l("div",{class:`${o}-base-select-menu__action`,"data-action":!0,key:"action"},v),l(jn,{onFocus:this.onTabOut,key:"focus-detector"})]))}}),Zn=se([B("base-selection",`
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `,[B("base-loading",`
 color: var(--n-loading-color);
 `),B("base-selection-tags","min-height: var(--n-height);"),L("border, state-border",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),L("state-border",`
 z-index: 1;
 border-color: #0000;
 `),B("base-suffix",`
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `,[L("arrow",`
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]),B("base-selection-overlay",`
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `,[L("wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),B("base-selection-placeholder",`
 color: var(--n-placeholder-color);
 `,[L("inner",`
 max-width: 100%;
 overflow: hidden;
 `)]),B("base-selection-tags",`
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `),B("base-selection-label",`
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `,[B("base-selection-input",`
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `,[L("content",`
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]),L("render-label",`
 color: var(--n-text-color);
 `)]),at("disabled",[se("&:hover",[L("state-border",`
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]),re("focus",[L("state-border",`
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]),re("active",[L("state-border",`
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `),B("base-selection-label","background-color: var(--n-color-active);"),B("base-selection-tags","background-color: var(--n-color-active);")])]),re("disabled","cursor: not-allowed;",[L("arrow",`
 color: var(--n-arrow-color-disabled);
 `),B("base-selection-label",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[B("base-selection-input",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `),L("render-label",`
 color: var(--n-text-color-disabled);
 `)]),B("base-selection-tags",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `),B("base-selection-placeholder",`
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]),B("base-selection-input-tag",`
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `,[L("input",`
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `),L("mirror",`
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]),["warning","error"].map(e=>re(`${e}-status`,[L("state-border",`border: var(--n-border-${e});`),at("disabled",[se("&:hover",[L("state-border",`
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]),re("active",[L("state-border",`
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `),B("base-selection-label",`background-color: var(--n-color-active-${e});`),B("base-selection-tags",`background-color: var(--n-color-active-${e});`)]),re("focus",[L("state-border",`
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]),B("base-selection-popover",`
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `),B("base-selection-tag-wrapper",`
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `,[se("&:last-child","padding-right: 0;"),B("tag",`
 font-size: 14px;
 max-width: 100%;
 `,[L("content",`
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]),Xn=ee({name:"InternalSelection",props:Object.assign(Object.assign({},me.props),{clsPrefix:{type:String,required:!0},bordered:{type:Boolean,default:void 0},active:Boolean,pattern:{type:String,default:""},placeholder:String,selectedOption:{type:Object,default:null},selectedOptions:{type:Array,default:null},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},multiple:Boolean,filterable:Boolean,clearable:Boolean,disabled:Boolean,size:{type:String,default:"medium"},loading:Boolean,autofocus:Boolean,showArrow:{type:Boolean,default:!0},inputProps:Object,focused:Boolean,renderTag:Function,onKeydown:Function,onClick:Function,onBlur:Function,onFocus:Function,onDeleteOption:Function,maxTagCount:[String,Number],ellipsisTagPopoverProps:Object,onClear:Function,onPatternInput:Function,onPatternFocus:Function,onPatternBlur:Function,renderLabel:Function,status:String,inlineThemeDisabled:Boolean,ignoreComposition:{type:Boolean,default:!0},onResize:Function}),setup(e){const{mergedClsPrefixRef:n,mergedRtlRef:o}=Ue(e),i=Ot("InternalSelection",o,n),s=T(null),f=T(null),v=T(null),d=T(null),C=T(null),b=T(null),y=T(null),p=T(null),I=T(null),F=T(null),m=T(!1),E=T(!1),K=T(!1),P=me("InternalSelection","-internal-selection",Zn,pn,e,Y(e,"clsPrefix")),k=z(()=>e.clearable&&!e.disabled&&(K.value||e.active)),V=z(()=>e.selectedOption?e.renderTag?e.renderTag({option:e.selectedOption,handleClose:()=>{}}):e.renderLabel?e.renderLabel(e.selectedOption,!0):Te(e.selectedOption[e.labelField],e.selectedOption,!0):e.placeholder),X=z(()=>{const a=e.selectedOption;if(a)return a[e.labelField]}),j=z(()=>e.multiple?!!(Array.isArray(e.selectedOptions)&&e.selectedOptions.length):e.selectedOption!==null);function D(){var a;const{value:g}=s;if(g){const{value:G}=f;G&&(G.style.width=`${g.offsetWidth}px`,e.maxTagCount!=="responsive"&&((a=I.value)===null||a===void 0||a.sync({showAllItemsBeforeCalculate:!1})))}}function ne(){const{value:a}=F;a&&(a.style.display="none")}function oe(){const{value:a}=F;a&&(a.style.display="inline-block")}Ce(Y(e,"active"),a=>{a||ne()}),Ce(Y(e,"pattern"),()=>{e.multiple&&Tt(D)});function fe(a){const{onFocus:g}=e;g&&g(a)}function ge(a){const{onBlur:g}=e;g&&g(a)}function J(a){const{onDeleteOption:g}=e;g&&g(a)}function te(a){const{onClear:g}=e;g&&g(a)}function u(a){const{onPatternInput:g}=e;g&&g(a)}function w(a){var g;(!a.relatedTarget||!(!((g=v.value)===null||g===void 0)&&g.contains(a.relatedTarget)))&&fe(a)}function _(a){var g;!((g=v.value)===null||g===void 0)&&g.contains(a.relatedTarget)||ge(a)}function $(a){te(a)}function A(){K.value=!0}function U(){K.value=!1}function N(a){!e.active||!e.filterable||a.target!==f.value&&a.preventDefault()}function W(a){J(a)}const H=T(!1);function Q(a){if(a.key==="Backspace"&&!H.value&&!e.pattern.length){const{selectedOptions:g}=e;g!=null&&g.length&&W(g[g.length-1])}}let le=null;function r(a){const{value:g}=s;if(g){const G=a.target.value;g.textContent=G,D()}e.ignoreComposition&&H.value?le=a:u(a)}function h(){H.value=!0}function q(){H.value=!1,e.ignoreComposition&&u(le),le=null}function de(a){var g;E.value=!0,(g=e.onPatternFocus)===null||g===void 0||g.call(e,a)}function Re(a){var g;E.value=!1,(g=e.onPatternBlur)===null||g===void 0||g.call(e,a)}function he(){var a,g;if(e.filterable)E.value=!1,(a=b.value)===null||a===void 0||a.blur(),(g=f.value)===null||g===void 0||g.blur();else if(e.multiple){const{value:G}=d;G==null||G.blur()}else{const{value:G}=C;G==null||G.blur()}}function ie(){var a,g,G;e.filterable?(E.value=!1,(a=b.value)===null||a===void 0||a.focus()):e.multiple?(g=d.value)===null||g===void 0||g.focus():(G=C.value)===null||G===void 0||G.focus()}function Se(){const{value:a}=f;a&&(oe(),a.focus())}function be(){const{value:a}=f;a&&a.blur()}function ze(a){const{value:g}=y;g&&g.setTextContent(`+${a}`)}function Ie(){const{value:a}=p;return a}function Me(){return f.value}let we=null;function ye(){we!==null&&window.clearTimeout(we)}function Pe(){e.active||(ye(),we=window.setTimeout(()=>{j.value&&(m.value=!0)},100))}function ke(){ye()}function Be(a){a||(ye(),m.value=!1)}Ce(j,a=>{a||(m.value=!1)}),Ke(()=>{bn(()=>{const a=b.value;a&&(e.disabled?a.removeAttribute("tabindex"):a.tabIndex=E.value?-1:0)})}),Pt(v,e.onResize);const{inlineThemeDisabled:Fe}=e,Oe=z(()=>{const{size:a}=e,{common:{cubicBezierEaseInOut:g},self:{fontWeight:G,borderRadius:Ge,color:Ze,placeholderColor:Xe,textColor:Ee,paddingSingle:Ne,paddingMultiple:Ae,caretColor:Ye,colorDisabled:Je,textColorDisabled:De,placeholderColorDisabled:pe,colorActive:t,boxShadowFocus:c,boxShadowActive:x,boxShadowHover:O,border:R,borderFocus:S,borderHover:M,borderActive:Z,arrowColor:ue,arrowColorDisabled:Bt,loadingColor:_t,colorActiveWarning:Lt,boxShadowFocusWarning:$t,boxShadowActiveWarning:Et,boxShadowHoverWarning:Nt,borderWarning:At,borderFocusWarning:Dt,borderHoverWarning:Vt,borderActiveWarning:jt,colorActiveError:Wt,boxShadowFocusError:Ht,boxShadowActiveError:Kt,boxShadowHoverError:Ut,borderError:qt,borderFocusError:Gt,borderHoverError:Zt,borderActiveError:Xt,clearColor:Yt,clearColorHover:Jt,clearColorPressed:Qt,clearSize:en,arrowSize:tn,[ve("height",a)]:nn,[ve("fontSize",a)]:on}}=P.value,Ve=Le(Ne),je=Le(Ae);return{"--n-bezier":g,"--n-border":R,"--n-border-active":Z,"--n-border-focus":S,"--n-border-hover":M,"--n-border-radius":Ge,"--n-box-shadow-active":x,"--n-box-shadow-focus":c,"--n-box-shadow-hover":O,"--n-caret-color":Ye,"--n-color":Ze,"--n-color-active":t,"--n-color-disabled":Je,"--n-font-size":on,"--n-height":nn,"--n-padding-single-top":Ve.top,"--n-padding-multiple-top":je.top,"--n-padding-single-right":Ve.right,"--n-padding-multiple-right":je.right,"--n-padding-single-left":Ve.left,"--n-padding-multiple-left":je.left,"--n-padding-single-bottom":Ve.bottom,"--n-padding-multiple-bottom":je.bottom,"--n-placeholder-color":Xe,"--n-placeholder-color-disabled":pe,"--n-text-color":Ee,"--n-text-color-disabled":De,"--n-arrow-color":ue,"--n-arrow-color-disabled":Bt,"--n-loading-color":_t,"--n-color-active-warning":Lt,"--n-box-shadow-focus-warning":$t,"--n-box-shadow-active-warning":Et,"--n-box-shadow-hover-warning":Nt,"--n-border-warning":At,"--n-border-focus-warning":Dt,"--n-border-hover-warning":Vt,"--n-border-active-warning":jt,"--n-color-active-error":Wt,"--n-box-shadow-focus-error":Ht,"--n-box-shadow-active-error":Kt,"--n-box-shadow-hover-error":Ut,"--n-border-error":qt,"--n-border-focus-error":Gt,"--n-border-hover-error":Zt,"--n-border-active-error":Xt,"--n-clear-size":en,"--n-clear-color":Yt,"--n-clear-color-hover":Jt,"--n-clear-color-pressed":Qt,"--n-arrow-size":tn,"--n-font-weight":G}}),ae=Fe?qe("internal-selection",z(()=>e.size[0]),Oe,e):void 0;return{mergedTheme:P,mergedClearable:k,mergedClsPrefix:n,rtlEnabled:i,patternInputFocused:E,filterablePlaceholder:V,label:X,selected:j,showTagsPanel:m,isComposing:H,counterRef:y,counterWrapperRef:p,patternInputMirrorRef:s,patternInputRef:f,selfRef:v,multipleElRef:d,singleElRef:C,patternInputWrapperRef:b,overflowRef:I,inputTagElRef:F,handleMouseDown:N,handleFocusin:w,handleClear:$,handleMouseEnter:A,handleMouseLeave:U,handleDeleteOption:W,handlePatternKeyDown:Q,handlePatternInputInput:r,handlePatternInputBlur:Re,handlePatternInputFocus:de,handleMouseEnterCounter:Pe,handleMouseLeaveCounter:ke,handleFocusout:_,handleCompositionEnd:q,handleCompositionStart:h,onPopoverUpdateShow:Be,focus:ie,focusInput:Se,blur:he,blurInput:be,updateCounter:ze,getCounter:Ie,getTail:Me,renderLabel:e.renderLabel,cssVars:Fe?void 0:Oe,themeClass:ae==null?void 0:ae.themeClass,onRender:ae==null?void 0:ae.onRender}},render(){const{status:e,multiple:n,size:o,disabled:i,filterable:s,maxTagCount:f,bordered:v,clsPrefix:d,ellipsisTagPopoverProps:C,onRender:b,renderTag:y,renderLabel:p}=this;b==null||b();const I=f==="responsive",F=typeof f=="number",m=I||F,E=l(vn,null,{default:()=>l(_n,{clsPrefix:d,loading:this.loading,showArrow:this.showArrow,showClear:this.mergedClearable&&this.selected,onClear:this.handleClear},{default:()=>{var P,k;return(k=(P=this.$slots).arrow)===null||k===void 0?void 0:k.call(P)}})});let K;if(n){const{labelField:P}=this,k=u=>l("div",{class:`${d}-base-selection-tag-wrapper`,key:u.value},y?y({option:u,handleClose:()=>{this.handleDeleteOption(u)}}):l(tt,{size:o,closable:!u.disabled,disabled:i,onClose:()=>{this.handleDeleteOption(u)},internalCloseIsButtonTag:!1,internalCloseFocusable:!1},{default:()=>p?p(u,!0):Te(u[P],u,!0)})),V=()=>(F?this.selectedOptions.slice(0,f):this.selectedOptions).map(k),X=s?l("div",{class:`${d}-base-selection-input-tag`,ref:"inputTagElRef",key:"__input-tag__"},l("input",Object.assign({},this.inputProps,{ref:"patternInputRef",tabindex:-1,disabled:i,value:this.pattern,autofocus:this.autofocus,class:`${d}-base-selection-input-tag__input`,onBlur:this.handlePatternInputBlur,onFocus:this.handlePatternInputFocus,onKeydown:this.handlePatternKeyDown,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),l("span",{ref:"patternInputMirrorRef",class:`${d}-base-selection-input-tag__mirror`},this.pattern)):null,j=I?()=>l("div",{class:`${d}-base-selection-tag-wrapper`,ref:"counterWrapperRef"},l(tt,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,onMouseleave:this.handleMouseLeaveCounter,disabled:i})):void 0;let D;if(F){const u=this.selectedOptions.length-f;u>0&&(D=l("div",{class:`${d}-base-selection-tag-wrapper`,key:"__counter__"},l(tt,{size:o,ref:"counterRef",onMouseenter:this.handleMouseEnterCounter,disabled:i},{default:()=>`+${u}`})))}const ne=I?s?l(vt,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,getTail:this.getTail,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:V,counter:j,tail:()=>X}):l(vt,{ref:"overflowRef",updateCounter:this.updateCounter,getCounter:this.getCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:V,counter:j}):F&&D?V().concat(D):V(),oe=m?()=>l("div",{class:`${d}-base-selection-popover`},I?V():this.selectedOptions.map(k)):void 0,fe=m?Object.assign({show:this.showTagsPanel,trigger:"hover",overlap:!0,placement:"top",width:"trigger",onUpdateShow:this.onPopoverUpdateShow,theme:this.mergedTheme.peers.Popover,themeOverrides:this.mergedTheme.peerOverrides.Popover},C):null,J=(this.selected?!1:this.active?!this.pattern&&!this.isComposing:!0)?l("div",{class:`${d}-base-selection-placeholder ${d}-base-selection-overlay`},l("div",{class:`${d}-base-selection-placeholder__inner`},this.placeholder)):null,te=s?l("div",{ref:"patternInputWrapperRef",class:`${d}-base-selection-tags`},ne,I?null:X,E):l("div",{ref:"multipleElRef",class:`${d}-base-selection-tags`,tabindex:i?void 0:0},ne,E);K=l(gn,null,m?l(In,Object.assign({},fe,{scrollable:!0,style:"max-height: calc(var(--v-target-height) * 6.6);"}),{trigger:()=>te,default:oe}):te,J)}else if(s){const P=this.pattern||this.isComposing,k=this.active?!P:!this.selected,V=this.active?!1:this.selected;K=l("div",{ref:"patternInputWrapperRef",class:`${d}-base-selection-label`,title:this.patternInputFocused?void 0:wt(this.label)},l("input",Object.assign({},this.inputProps,{ref:"patternInputRef",class:`${d}-base-selection-input`,value:this.active?this.pattern:"",placeholder:"",readonly:i,disabled:i,tabindex:-1,autofocus:this.autofocus,onFocus:this.handlePatternInputFocus,onBlur:this.handlePatternInputBlur,onInput:this.handlePatternInputInput,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd})),V?l("div",{class:`${d}-base-selection-label__render-label ${d}-base-selection-overlay`,key:"input"},l("div",{class:`${d}-base-selection-overlay__wrapper`},y?y({option:this.selectedOption,handleClose:()=>{}}):p?p(this.selectedOption,!0):Te(this.label,this.selectedOption,!0))):null,k?l("div",{class:`${d}-base-selection-placeholder ${d}-base-selection-overlay`,key:"placeholder"},l("div",{class:`${d}-base-selection-overlay__wrapper`},this.filterablePlaceholder)):null,E)}else K=l("div",{ref:"singleElRef",class:`${d}-base-selection-label`,tabindex:this.disabled?void 0:0},this.label!==void 0?l("div",{class:`${d}-base-selection-input`,title:wt(this.label),key:"input"},l("div",{class:`${d}-base-selection-input__content`},y?y({option:this.selectedOption,handleClose:()=>{}}):p?p(this.selectedOption,!0):Te(this.label,this.selectedOption,!0))):l("div",{class:`${d}-base-selection-placeholder ${d}-base-selection-overlay`,key:"placeholder"},l("div",{class:`${d}-base-selection-placeholder__inner`},this.placeholder)),E);return l("div",{ref:"selfRef",class:[`${d}-base-selection`,this.rtlEnabled&&`${d}-base-selection--rtl`,this.themeClass,e&&`${d}-base-selection--${e}-status`,{[`${d}-base-selection--active`]:this.active,[`${d}-base-selection--selected`]:this.selected||this.active&&this.pattern,[`${d}-base-selection--disabled`]:this.disabled,[`${d}-base-selection--multiple`]:this.multiple,[`${d}-base-selection--focus`]:this.focused}],style:this.cssVars,onClick:this.onClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onKeydown:this.onKeydown,onFocusin:this.handleFocusin,onFocusout:this.handleFocusout,onMousedown:this.handleMouseDown},K,v?l("div",{class:`${d}-base-selection__border`}):null,v?l("div",{class:`${d}-base-selection__state-border`}):null)}});function He(e){return e.type==="group"}function kt(e){return e.type==="ignored"}function lt(e,n){try{return!!(1+n.toString().toLowerCase().indexOf(e.trim().toLowerCase()))}catch{return!1}}function Yn(e,n){return{getIsGroup:He,getIgnored:kt,getKey(i){return He(i)?i.name||i.key||"key-required":i[e]},getChildren(i){return i[n]}}}function Jn(e,n,o,i){if(!n)return e;function s(f){if(!Array.isArray(f))return[];const v=[];for(const d of f)if(He(d)){const C=s(d[i]);C.length&&v.push(Object.assign({},d,{[i]:C}))}else{if(kt(d))continue;n(o,d)&&v.push(d)}return v}return s(e)}function Qn(e,n,o){const i=new Map;return e.forEach(s=>{He(s)?s[o].forEach(f=>{i.set(f[n],f)}):i.set(s[n],s)}),i}const eo=se([B("select",`
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `),B("select-menu",`
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `,[Ft({originalTransition:"background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"})])]),to=Object.assign(Object.assign({},me.props),{to:st.propTo,bordered:{type:Boolean,default:void 0},clearable:Boolean,clearCreatedOptionsOnClear:{type:Boolean,default:!0},clearFilterAfterSelect:{type:Boolean,default:!0},options:{type:Array,default:()=>[]},defaultValue:{type:[String,Number,Array],default:null},keyboard:{type:Boolean,default:!0},value:[String,Number,Array],placeholder:String,menuProps:Object,multiple:Boolean,size:String,menuSize:{type:String},filterable:Boolean,disabled:{type:Boolean,default:void 0},remote:Boolean,loading:Boolean,filter:Function,placement:{type:String,default:"bottom-start"},widthMode:{type:String,default:"trigger"},tag:Boolean,onCreate:Function,fallbackOption:{type:[Function,Boolean],default:void 0},show:{type:Boolean,default:void 0},showArrow:{type:Boolean,default:!0},maxTagCount:[Number,String],ellipsisTagPopoverProps:Object,consistentMenuWidth:{type:Boolean,default:!0},virtualScroll:{type:Boolean,default:!0},labelField:{type:String,default:"label"},valueField:{type:String,default:"value"},childrenField:{type:String,default:"children"},renderLabel:Function,renderOption:Function,renderTag:Function,"onUpdate:value":[Function,Array],inputProps:Object,nodeProps:Function,ignoreComposition:{type:Boolean,default:!0},showOnFocus:Boolean,onUpdateValue:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onFocus:[Function,Array],onScroll:[Function,Array],onSearch:[Function,Array],onUpdateShow:[Function,Array],"onUpdate:show":[Function,Array],displayDirective:{type:String,default:"show"},resetMenuOnOptionsChange:{type:Boolean,default:!0},status:String,showCheckmark:{type:Boolean,default:!0},scrollbarProps:Object,onChange:[Function,Array],items:Array}),ho=ee({name:"Select",props:to,slots:Object,setup(e){const{mergedClsPrefixRef:n,mergedBorderedRef:o,namespaceRef:i,inlineThemeDisabled:s,mergedComponentPropsRef:f}=Ue(e),v=me("Select","-select",eo,Sn,e,n),d=T(e.defaultValue),C=Y(e,"value"),b=gt(C,d),y=T(!1),p=T(""),I=Ln(e,["items","options"]),F=T([]),m=T([]),E=z(()=>m.value.concat(F.value).concat(I.value)),K=z(()=>{const{filter:t}=e;if(t)return t;const{labelField:c,valueField:x}=e;return(O,R)=>{if(!R)return!1;const S=R[c];if(typeof S=="string")return lt(O,S);const M=R[x];return typeof M=="string"?lt(O,M):typeof M=="number"?lt(O,String(M)):!1}}),P=z(()=>{if(e.remote)return I.value;{const{value:t}=E,{value:c}=p;return!c.length||!e.filterable?t:Jn(t,K.value,c,e.childrenField)}}),k=z(()=>{const{valueField:t,childrenField:c}=e,x=Yn(t,c);return Bn(P.value,x)}),V=z(()=>Qn(E.value,e.valueField,e.childrenField)),X=T(!1),j=gt(Y(e,"show"),X),D=T(null),ne=T(null),oe=T(null),{localeRef:fe}=zt("Select"),ge=z(()=>{var t;return(t=e.placeholder)!==null&&t!==void 0?t:fe.value.placeholder}),J=[],te=T(new Map),u=z(()=>{const{fallbackOption:t}=e;if(t===void 0){const{labelField:c,valueField:x}=e;return O=>({[c]:String(O),[x]:O})}return t===!1?!1:c=>Object.assign(t(c),{value:c})});function w(t){const c=e.remote,{value:x}=te,{value:O}=V,{value:R}=u,S=[];return t.forEach(M=>{if(O.has(M))S.push(O.get(M));else if(c&&x.has(M))S.push(x.get(M));else if(R){const Z=R(M);Z&&S.push(Z)}}),S}const _=z(()=>{if(e.multiple){const{value:t}=b;return Array.isArray(t)?w(t):[]}return null}),$=z(()=>{const{value:t}=b;return!e.multiple&&!Array.isArray(t)?t===null?null:w([t])[0]||null:null}),A=yn(e,{mergedSize:t=>{var c,x;const{size:O}=e;if(O)return O;const{mergedSize:R}=t||{};if(R!=null&&R.value)return R.value;const S=(x=(c=f==null?void 0:f.value)===null||c===void 0?void 0:c.Select)===null||x===void 0?void 0:x.size;return S||"medium"}}),{mergedSizeRef:U,mergedDisabledRef:N,mergedStatusRef:W}=A;function H(t,c){const{onChange:x,"onUpdate:value":O,onUpdateValue:R}=e,{nTriggerFormChange:S,nTriggerFormInput:M}=A;x&&ce(x,t,c),R&&ce(R,t,c),O&&ce(O,t,c),d.value=t,S(),M()}function Q(t){const{onBlur:c}=e,{nTriggerFormBlur:x}=A;c&&ce(c,t),x()}function le(){const{onClear:t}=e;t&&ce(t)}function r(t){const{onFocus:c,showOnFocus:x}=e,{nTriggerFormFocus:O}=A;c&&ce(c,t),O(),x&&he()}function h(t){const{onSearch:c}=e;c&&ce(c,t)}function q(t){const{onScroll:c}=e;c&&ce(c,t)}function de(){var t;const{remote:c,multiple:x}=e;if(c){const{value:O}=te;if(x){const{valueField:R}=e;(t=_.value)===null||t===void 0||t.forEach(S=>{O.set(S[R],S)})}else{const R=$.value;R&&O.set(R[e.valueField],R)}}}function Re(t){const{onUpdateShow:c,"onUpdate:show":x}=e;c&&ce(c,t),x&&ce(x,t),X.value=t}function he(){N.value||(Re(!0),X.value=!0,e.filterable&&Ae())}function ie(){Re(!1)}function Se(){p.value="",m.value=J}const be=T(!1);function ze(){e.filterable&&(be.value=!0)}function Ie(){e.filterable&&(be.value=!1,j.value||Se())}function Me(){N.value||(j.value?e.filterable?Ae():ie():he())}function we(t){var c,x;!((x=(c=oe.value)===null||c===void 0?void 0:c.selfRef)===null||x===void 0)&&x.contains(t.relatedTarget)||(y.value=!1,Q(t),ie())}function ye(t){r(t),y.value=!0}function Pe(){y.value=!0}function ke(t){var c;!((c=D.value)===null||c===void 0)&&c.$el.contains(t.relatedTarget)||(y.value=!1,Q(t),ie())}function Be(){var t;(t=D.value)===null||t===void 0||t.focus(),ie()}function Fe(t){var c;j.value&&(!((c=D.value)===null||c===void 0)&&c.$el.contains(Cn(t))||ie())}function Oe(t){if(!Array.isArray(t))return[];if(u.value)return Array.from(t);{const{remote:c}=e,{value:x}=V;if(c){const{value:O}=te;return t.filter(R=>x.has(R)||O.has(R))}else return t.filter(O=>x.has(O))}}function ae(t){a(t.rawNode)}function a(t){if(N.value)return;const{tag:c,remote:x,clearFilterAfterSelect:O,valueField:R}=e;if(c&&!x){const{value:S}=m,M=S[0]||null;if(M){const Z=F.value;Z.length?Z.push(M):F.value=[M],m.value=J}}if(x&&te.value.set(t[R],t),e.multiple){const S=Oe(b.value),M=S.findIndex(Z=>Z===t[R]);if(~M){if(S.splice(M,1),c&&!x){const Z=g(t[R]);~Z&&(F.value.splice(Z,1),O&&(p.value=""))}}else S.push(t[R]),O&&(p.value="");H(S,w(S))}else{if(c&&!x){const S=g(t[R]);~S?F.value=[F.value[S]]:F.value=J}Ne(),ie(),H(t[R],t)}}function g(t){return F.value.findIndex(x=>x[e.valueField]===t)}function G(t){j.value||he();const{value:c}=t.target;p.value=c;const{tag:x,remote:O}=e;if(h(c),x&&!O){if(!c){m.value=J;return}const{onCreate:R}=e,S=R?R(c):{[e.labelField]:c,[e.valueField]:c},{valueField:M,labelField:Z}=e;I.value.some(ue=>ue[M]===S[M]||ue[Z]===S[Z])||F.value.some(ue=>ue[M]===S[M]||ue[Z]===S[Z])?m.value=J:m.value=[S]}}function Ge(t){t.stopPropagation();const{multiple:c,tag:x,remote:O,clearCreatedOptionsOnClear:R}=e;!c&&e.filterable&&ie(),x&&!O&&R&&(F.value=J),le(),c?H([],[]):H(null,null)}function Ze(t){!$e(t,"action")&&!$e(t,"empty")&&!$e(t,"header")&&t.preventDefault()}function Xe(t){q(t)}function Ee(t){var c,x,O,R,S;if(!e.keyboard){t.preventDefault();return}switch(t.key){case" ":if(e.filterable)break;t.preventDefault();case"Enter":if(!(!((c=D.value)===null||c===void 0)&&c.isComposing)){if(j.value){const M=(x=oe.value)===null||x===void 0?void 0:x.getPendingTmNode();M?ae(M):e.filterable||(ie(),Ne())}else if(he(),e.tag&&be.value){const M=m.value[0];if(M){const Z=M[e.valueField],{value:ue}=b;e.multiple&&Array.isArray(ue)&&ue.includes(Z)||a(M)}}}t.preventDefault();break;case"ArrowUp":if(t.preventDefault(),e.loading)return;j.value&&((O=oe.value)===null||O===void 0||O.prev());break;case"ArrowDown":if(t.preventDefault(),e.loading)return;j.value?(R=oe.value)===null||R===void 0||R.next():he();break;case"Escape":j.value&&(Rn(t),ie()),(S=D.value)===null||S===void 0||S.focus();break}}function Ne(){var t;(t=D.value)===null||t===void 0||t.focus()}function Ae(){var t;(t=D.value)===null||t===void 0||t.focusInput()}function Ye(){var t;j.value&&((t=ne.value)===null||t===void 0||t.syncPosition())}de(),Ce(Y(e,"options"),de);const Je={focus:()=>{var t;(t=D.value)===null||t===void 0||t.focus()},focusInput:()=>{var t;(t=D.value)===null||t===void 0||t.focusInput()},blur:()=>{var t;(t=D.value)===null||t===void 0||t.blur()},blurInput:()=>{var t;(t=D.value)===null||t===void 0||t.blurInput()}},De=z(()=>{const{self:{menuBoxShadow:t}}=v.value;return{"--n-menu-box-shadow":t}}),pe=s?qe("select",void 0,De,e):void 0;return Object.assign(Object.assign({},Je),{mergedStatus:W,mergedClsPrefix:n,mergedBordered:o,namespace:i,treeMate:k,isMounted:xn(),triggerRef:D,menuRef:oe,pattern:p,uncontrolledShow:X,mergedShow:j,adjustedTo:st(e),uncontrolledValue:d,mergedValue:b,followerRef:ne,localizedPlaceholder:ge,selectedOption:$,selectedOptions:_,mergedSize:U,mergedDisabled:N,focused:y,activeWithoutMenuOpen:be,inlineThemeDisabled:s,onTriggerInputFocus:ze,onTriggerInputBlur:Ie,handleTriggerOrMenuResize:Ye,handleMenuFocus:Pe,handleMenuBlur:ke,handleMenuTabOut:Be,handleTriggerClick:Me,handleToggle:ae,handleDeleteOption:a,handlePatternInput:G,handleClear:Ge,handleTriggerBlur:we,handleTriggerFocus:ye,handleKeydown:Ee,handleMenuAfterLeave:Se,handleMenuClickOutside:Fe,handleMenuScroll:Xe,handleMenuKeydown:Ee,handleMenuMousedown:Ze,mergedTheme:v,cssVars:s?void 0:De,themeClass:pe==null?void 0:pe.themeClass,onRender:pe==null?void 0:pe.onRender})},render(){return l("div",{class:`${this.mergedClsPrefix}-select`},l(Mn,null,{default:()=>[l(Pn,null,{default:()=>l(Xn,{ref:"triggerRef",inlineThemeDisabled:this.inlineThemeDisabled,status:this.mergedStatus,inputProps:this.inputProps,clsPrefix:this.mergedClsPrefix,showArrow:this.showArrow,maxTagCount:this.maxTagCount,ellipsisTagPopoverProps:this.ellipsisTagPopoverProps,bordered:this.mergedBordered,active:this.activeWithoutMenuOpen||this.mergedShow,pattern:this.pattern,placeholder:this.localizedPlaceholder,selectedOption:this.selectedOption,selectedOptions:this.selectedOptions,multiple:this.multiple,renderTag:this.renderTag,renderLabel:this.renderLabel,filterable:this.filterable,clearable:this.clearable,disabled:this.mergedDisabled,size:this.mergedSize,theme:this.mergedTheme.peers.InternalSelection,labelField:this.labelField,valueField:this.valueField,themeOverrides:this.mergedTheme.peerOverrides.InternalSelection,loading:this.loading,focused:this.focused,onClick:this.handleTriggerClick,onDeleteOption:this.handleDeleteOption,onPatternInput:this.handlePatternInput,onClear:this.handleClear,onBlur:this.handleTriggerBlur,onFocus:this.handleTriggerFocus,onKeydown:this.handleKeydown,onPatternBlur:this.onTriggerInputBlur,onPatternFocus:this.onTriggerInputFocus,onResize:this.handleTriggerOrMenuResize,ignoreComposition:this.ignoreComposition},{arrow:()=>{var e,n;return[(n=(e=this.$slots).arrow)===null||n===void 0?void 0:n.call(e)]}})}),l(kn,{ref:"followerRef",show:this.mergedShow,to:this.adjustedTo,teleportDisabled:this.adjustedTo===st.tdkey,containerClass:this.namespace,width:this.consistentMenuWidth?"target":void 0,minWidth:"target",placement:this.placement},{default:()=>l(St,{name:"fade-in-scale-up-transition",appear:this.isMounted,onAfterLeave:this.handleMenuAfterLeave},{default:()=>{var e,n,o;return this.mergedShow||this.displayDirective==="show"?((e=this.onRender)===null||e===void 0||e.call(this),mn(l(Gn,Object.assign({},this.menuProps,{ref:"menuRef",onResize:this.handleTriggerOrMenuResize,inlineThemeDisabled:this.inlineThemeDisabled,virtualScroll:this.consistentMenuWidth&&this.virtualScroll,class:[`${this.mergedClsPrefix}-select-menu`,this.themeClass,(n=this.menuProps)===null||n===void 0?void 0:n.class],clsPrefix:this.mergedClsPrefix,focusable:!0,labelField:this.labelField,valueField:this.valueField,autoPending:!0,nodeProps:this.nodeProps,theme:this.mergedTheme.peers.InternalSelectMenu,themeOverrides:this.mergedTheme.peerOverrides.InternalSelectMenu,treeMate:this.treeMate,multiple:this.multiple,size:this.menuSize,renderOption:this.renderOption,renderLabel:this.renderLabel,value:this.mergedValue,style:[(o=this.menuProps)===null||o===void 0?void 0:o.style,this.cssVars],onToggle:this.handleToggle,onScroll:this.handleMenuScroll,onFocus:this.handleMenuFocus,onBlur:this.handleMenuBlur,onKeydown:this.handleMenuKeydown,onTabOut:this.handleMenuTabOut,onMousedown:this.handleMenuMousedown,show:this.mergedShow,showCheckmark:this.showCheckmark,resetMenuOnOptionsChange:this.resetMenuOnOptionsChange,scrollbarProps:this.scrollbarProps}),{empty:()=>{var i,s;return[(s=(i=this.$slots).empty)===null||s===void 0?void 0:s.call(i)]},header:()=>{var i,s;return[(s=(i=this.$slots).header)===null||s===void 0?void 0:s.call(i)]},action:()=>{var i,s;return[(s=(i=this.$slots).action)===null||s===void 0?void 0:s.call(i)]}}),this.displayDirective==="show"?[[wn,this.mergedShow],[ht,this.handleMenuClickOutside,void 0,{capture:!0}]]:[[ht,this.handleMenuClickOutside,void 0,{capture:!0}]])):null}})})]}))}});export{so as B,jn as F,Kn as N,An as V,ho as a,uo as b,fo as c,co as d,Gn as e,Yn as f,ot as m};
