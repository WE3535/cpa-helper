import{N as pe,p as re,B as ke,a as Oe,b as Ie,h as ae,r as _e,u as Ke,c as $e}from"./Popover-DTVg7lv7.js";import{r as T,ai as fe,d as R,z as l,I as ie,J as H,p as b,bE as ze,F as de,X as q,R as B,G as x,H as S,P as z,aM as ve,a4 as le,bF as Te,L as he,aa as je,Z as W,aY as be,M as E,_ as De,bG as Fe,aZ as Ae,aX as Be,aG as Le,V as ue,O as $,$ as Me,T as ne,U as O,bH as Ee,aN as A}from"./index-Dfrjz4pj.js";import{f as He,u as Ue}from"./_plugin-vue_export-helper-DzwHZgiI.js";function Ge(e,n,d){const t=T(e.value);let r=null;return fe(e,o=>{r!==null&&window.clearTimeout(r),o===!0?d&&!d.value?t.value=!0:r=window.setTimeout(()=>{t.value=!0},n):t.value=!1}),t}function Ve(e){return n=>{n?e.value=n.$el:e.value=null}}const We=R({name:"ChevronRight",render(){return l("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l("path",{d:"M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",fill:"currentColor"}))}}),qe=Object.assign(Object.assign({},re),H.props),co=R({name:"Tooltip",props:qe,slots:Object,__popover__:!0,setup(e){const{mergedClsPrefixRef:n}=ie(e),d=H("Tooltip","-tooltip",void 0,ze,e,n),t=T(null);return Object.assign(Object.assign({},{syncPosition(){t.value.syncPosition()},setShow(o){t.value.setShow(o)}}),{popoverRef:t,mergedTheme:d,popoverThemeOverrides:b(()=>d.value.self)})},render(){const{mergedTheme:e,internalExtraClass:n}=this;return l(pe,Object.assign(Object.assign({},this.$props),{theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:n.concat("tooltip"),ref:"popoverRef"}),this.$slots)}}),se=de("n-dropdown-menu"),X=de("n-dropdown"),ce=de("n-dropdown-option"),me=R({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return l("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),Xe=R({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:n}=B(se),{renderLabelRef:d,labelFieldRef:t,nodePropsRef:r,renderOptionRef:o}=B(X);return{labelField:t,showIcon:e,hasSubmenu:n,renderLabel:d,nodeProps:r,renderOption:o}},render(){var e;const{clsPrefix:n,hasSubmenu:d,showIcon:t,nodeProps:r,renderLabel:o,renderOption:a}=this,{rawNode:p}=this.tmNode,v=l("div",Object.assign({class:`${n}-dropdown-option`},r==null?void 0:r(p)),l("div",{class:`${n}-dropdown-option-body ${n}-dropdown-option-body--group`},l("div",{"data-dropdown-option":!0,class:[`${n}-dropdown-option-body__prefix`,t&&`${n}-dropdown-option-body__prefix--show-icon`]},q(p.icon)),l("div",{class:`${n}-dropdown-option-body__label`,"data-dropdown-option":!0},o?o(p):q((e=p.title)!==null&&e!==void 0?e:p[this.labelField])),l("div",{class:[`${n}-dropdown-option-body__suffix`,d&&`${n}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return a?a({node:v,option:p}):v}}),Ze=x("icon",`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`,[S("color-transition",{transition:"color .3s var(--n-bezier)"}),S("depth",{color:"var(--n-color)"},[z("svg",{opacity:"var(--n-opacity)",transition:"opacity .3s var(--n-bezier)"})]),z("svg",{height:"1em",width:"1em"})]),Je=Object.assign(Object.assign({},H.props),{depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]}),Ye=R({_n_icon__:!0,name:"Icon",inheritAttrs:!1,props:Je,setup(e){const{mergedClsPrefixRef:n,inlineThemeDisabled:d}=ie(e),t=H("Icon","-icon",Ze,Te,e,n),r=b(()=>{const{depth:a}=e,{common:{cubicBezierEaseInOut:p},self:v}=t.value;if(a!==void 0){const{color:w,[`opacity${a}Depth`]:g}=v;return{"--n-bezier":p,"--n-color":w,"--n-opacity":g}}return{"--n-bezier":p,"--n-color":"","--n-opacity":""}}),o=d?he("icon",b(()=>`${e.depth||"d"}`),r,e):void 0;return{mergedClsPrefix:n,mergedStyle:b(()=>{const{size:a,color:p}=e;return{fontSize:He(a),color:p}}),cssVars:d?void 0:r,themeClass:o==null?void 0:o.themeClass,onRender:o==null?void 0:o.onRender}},render(){var e;const{$parent:n,depth:d,mergedClsPrefix:t,component:r,onRender:o,themeClass:a}=this;return!((e=n==null?void 0:n.$options)===null||e===void 0)&&e._n_icon__&&ve("icon","don't wrap `n-icon` inside `n-icon`"),o==null||o(),l("i",le(this.$attrs,{role:"img",class:[`${t}-icon`,a,{[`${t}-icon--depth`]:d,[`${t}-icon--color-transition`]:d!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?l(r):this.$slots)}});function te(e,n){return e.type==="submenu"||e.type===void 0&&e[n]!==void 0}function Qe(e){return e.type==="group"}function we(e){return e.type==="divider"}function eo(e){return e.type==="render"}const ge=R({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const n=B(X),{hoverKeyRef:d,keyboardKeyRef:t,lastToggledSubmenuKeyRef:r,pendingKeyPathRef:o,activeKeyPathRef:a,animatedRef:p,mergedShowRef:v,renderLabelRef:w,renderIconRef:g,labelFieldRef:P,childrenFieldRef:I,renderOptionRef:N,nodePropsRef:C,menuPropsRef:j}=n,y=B(ce,null),_=B(se),K=B(be),G=b(()=>e.tmNode.rawNode),U=b(()=>{const{value:i}=I;return te(e.tmNode.rawNode,i)}),Z=b(()=>{const{disabled:i}=e.tmNode;return i}),J=b(()=>{if(!U.value)return!1;const{key:i,disabled:c}=e.tmNode;if(c)return!1;const{value:m}=d,{value:D}=t,{value:oe}=r,{value:F}=o;return m!==null?F.includes(i):D!==null?F.includes(i)&&F[F.length-1]!==i:oe!==null?F.includes(i):!1}),Y=b(()=>t.value===null&&!p.value),Q=Ge(J,300,Y),ee=b(()=>!!(y!=null&&y.enteringSubmenuRef.value)),L=T(!1);E(ce,{enteringSubmenuRef:L});function M(){L.value=!0}function V(){L.value=!1}function k(){const{parentKey:i,tmNode:c}=e;c.disabled||v.value&&(r.value=i,t.value=null,d.value=c.key)}function s(){const{tmNode:i}=e;i.disabled||v.value&&d.value!==i.key&&k()}function u(i){if(e.tmNode.disabled||!v.value)return;const{relatedTarget:c}=i;c&&!ae({target:c},"dropdownOption")&&!ae({target:c},"scrollbarRail")&&(d.value=null)}function f(){const{value:i}=U,{tmNode:c}=e;v.value&&!i&&!c.disabled&&(n.doSelect(c.key,c.rawNode),n.doUpdateShow(!1))}return{labelField:P,renderLabel:w,renderIcon:g,siblingHasIcon:_.showIconRef,siblingHasSubmenu:_.hasSubmenuRef,menuProps:j,popoverBody:K,animated:p,mergedShowSubmenu:b(()=>Q.value&&!ee.value),rawNode:G,hasSubmenu:U,pending:W(()=>{const{value:i}=o,{key:c}=e.tmNode;return i.includes(c)}),childActive:W(()=>{const{value:i}=a,{key:c}=e.tmNode,m=i.findIndex(D=>c===D);return m===-1?!1:m<i.length-1}),active:W(()=>{const{value:i}=a,{key:c}=e.tmNode,m=i.findIndex(D=>c===D);return m===-1?!1:m===i.length-1}),mergedDisabled:Z,renderOption:N,nodeProps:C,handleClick:f,handleMouseMove:s,handleMouseEnter:k,handleMouseLeave:u,handleSubmenuBeforeEnter:M,handleSubmenuAfterEnter:V}},render(){var e,n;const{animated:d,rawNode:t,mergedShowSubmenu:r,clsPrefix:o,siblingHasIcon:a,siblingHasSubmenu:p,renderLabel:v,renderIcon:w,renderOption:g,nodeProps:P,props:I,scrollable:N}=this;let C=null;if(r){const K=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,t,t.children);C=l(ye,Object.assign({},K,{clsPrefix:o,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const j={class:[`${o}-dropdown-option-body`,this.pending&&`${o}-dropdown-option-body--pending`,this.active&&`${o}-dropdown-option-body--active`,this.childActive&&`${o}-dropdown-option-body--child-active`,this.mergedDisabled&&`${o}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},y=P==null?void 0:P(t),_=l("div",Object.assign({class:[`${o}-dropdown-option`,y==null?void 0:y.class],"data-dropdown-option":!0},y),l("div",le(j,I),[l("div",{class:[`${o}-dropdown-option-body__prefix`,a&&`${o}-dropdown-option-body__prefix--show-icon`]},[w?w(t):q(t.icon)]),l("div",{"data-dropdown-option":!0,class:`${o}-dropdown-option-body__label`},v?v(t):q((n=t[this.labelField])!==null&&n!==void 0?n:t.title)),l("div",{"data-dropdown-option":!0,class:[`${o}-dropdown-option-body__suffix`,p&&`${o}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?l(Ye,null,{default:()=>l(We,null)}):null)]),this.hasSubmenu?l(ke,null,{default:()=>[l(Oe,null,{default:()=>l("div",{class:`${o}-dropdown-offset-container`},l(Ie,{show:this.mergedShowSubmenu,placement:this.placement,to:N&&this.popoverBody||void 0,teleportDisabled:!N},{default:()=>l("div",{class:`${o}-dropdown-menu-wrapper`},d?l(je,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>C}):C)}))})]}):null);return g?g({node:_,option:t}):_}}),oo=R({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:n,clsPrefix:d}=this,{children:t}=e;return l(De,null,l(Xe,{clsPrefix:d,tmNode:e,key:e.key}),t==null?void 0:t.map(r=>{const{rawNode:o}=r;return o.show===!1?null:we(o)?l(me,{clsPrefix:d,key:r.key}):r.isGroup?(ve("dropdown","`group` node is not allowed to be put in `group` node."),null):l(ge,{clsPrefix:d,tmNode:r,parentKey:n,key:r.key})}))}}),no=R({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:n}}=this.tmNode;return l("div",n,[e==null?void 0:e()])}}),ye=R({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:n,childrenFieldRef:d}=B(X);E(se,{showIconRef:b(()=>{const r=n.value;return e.tmNodes.some(o=>{var a;if(o.isGroup)return(a=o.children)===null||a===void 0?void 0:a.some(({rawNode:v})=>r?r(v):v.icon);const{rawNode:p}=o;return r?r(p):p.icon})}),hasSubmenuRef:b(()=>{const{value:r}=d;return e.tmNodes.some(o=>{var a;if(o.isGroup)return(a=o.children)===null||a===void 0?void 0:a.some(({rawNode:v})=>te(v,r));const{rawNode:p}=o;return te(p,r)})})});const t=T(null);return E(Ae,null),E(Be,null),E(be,t),{bodyRef:t}},render(){const{parentKey:e,clsPrefix:n,scrollable:d}=this,t=this.tmNodes.map(r=>{const{rawNode:o}=r;return o.show===!1?null:eo(o)?l(no,{tmNode:r,key:r.key}):we(o)?l(me,{clsPrefix:n,key:r.key}):Qe(o)?l(oo,{clsPrefix:n,tmNode:r,parentKey:e,key:r.key}):l(ge,{clsPrefix:n,tmNode:r,parentKey:e,key:r.key,props:o.props,scrollable:d})});return l("div",{class:[`${n}-dropdown-menu`,d&&`${n}-dropdown-menu--scrollable`],ref:"bodyRef"},d?l(Fe,{contentClass:`${n}-dropdown-menu__content`},{default:()=>t}):t,this.showArrow?_e({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),to=x("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[Le(),x("dropdown-option",`
 position: relative;
 `,[z("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[z("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),x("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[z("&::before",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),ue("disabled",[S("pending",`
 color: var(--n-option-text-color-hover);
 `,[$("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),z("&::before","background-color: var(--n-option-color-hover);")]),S("active",`
 color: var(--n-option-text-color-active);
 `,[$("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),z("&::before","background-color: var(--n-option-color-active);")]),S("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[$("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),S("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),S("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[$("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[S("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),$("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[S("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),x("icon",`
 font-size: var(--n-option-icon-size);
 `)]),$("label",`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),$("suffix",`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[S("has-submenu",`
 width: var(--n-option-icon-suffix-width);
 `),x("icon",`
 font-size: var(--n-option-icon-size);
 `)]),x("dropdown-menu","pointer-events: all;")]),x("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),x("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),x("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),z(">",[x("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),ue("scrollable",`
 padding: var(--n-padding);
 `),S("scrollable",[$("content",`
 padding: var(--n-padding);
 `)])]),ro={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},io=Object.keys(re),lo=Object.assign(Object.assign(Object.assign({},re),ro),H.props),po=R({name:"Dropdown",inheritAttrs:!1,props:lo,setup(e){const n=T(!1),d=Ue(O(e,"show"),n),t=b(()=>{const{keyField:s,childrenField:u}=e;return $e(e.options,{getKey(f){return f[s]},getDisabled(f){return f.disabled===!0},getIgnored(f){return f.type==="divider"||f.type==="render"},getChildren(f){return f[u]}})}),r=b(()=>t.value.treeNodes),o=T(null),a=T(null),p=T(null),v=b(()=>{var s,u,f;return(f=(u=(s=o.value)!==null&&s!==void 0?s:a.value)!==null&&u!==void 0?u:p.value)!==null&&f!==void 0?f:null}),w=b(()=>t.value.getPath(v.value).keyPath),g=b(()=>t.value.getPath(e.value).keyPath),P=W(()=>e.keyboard&&d.value);Ke({keydown:{ArrowUp:{prevent:!0,handler:Y},ArrowRight:{prevent:!0,handler:J},ArrowDown:{prevent:!0,handler:Q},ArrowLeft:{prevent:!0,handler:Z},Enter:{prevent:!0,handler:ee},Escape:U}},P);const{mergedClsPrefixRef:I,inlineThemeDisabled:N,mergedComponentPropsRef:C}=ie(e),j=b(()=>{var s,u;return e.size||((u=(s=C==null?void 0:C.value)===null||s===void 0?void 0:s.Dropdown)===null||u===void 0?void 0:u.size)||"medium"}),y=H("Dropdown","-dropdown",to,Ee,e,I);E(X,{labelFieldRef:O(e,"labelField"),childrenFieldRef:O(e,"childrenField"),renderLabelRef:O(e,"renderLabel"),renderIconRef:O(e,"renderIcon"),hoverKeyRef:o,keyboardKeyRef:a,lastToggledSubmenuKeyRef:p,pendingKeyPathRef:w,activeKeyPathRef:g,animatedRef:O(e,"animated"),mergedShowRef:d,nodePropsRef:O(e,"nodeProps"),renderOptionRef:O(e,"renderOption"),menuPropsRef:O(e,"menuProps"),doSelect:_,doUpdateShow:K}),fe(d,s=>{!e.animated&&!s&&G()});function _(s,u){const{onSelect:f}=e;f&&ne(f,s,u)}function K(s){const{"onUpdate:show":u,onUpdateShow:f}=e;u&&ne(u,s),f&&ne(f,s),n.value=s}function G(){o.value=null,a.value=null,p.value=null}function U(){K(!1)}function Z(){M("left")}function J(){M("right")}function Y(){M("up")}function Q(){M("down")}function ee(){const s=L();s!=null&&s.isLeaf&&d.value&&(_(s.key,s.rawNode),K(!1))}function L(){var s;const{value:u}=t,{value:f}=v;return!u||f===null?null:(s=u.getNode(f))!==null&&s!==void 0?s:null}function M(s){const{value:u}=v,{value:{getFirstAvailableNode:f}}=t;let i=null;if(u===null){const c=f();c!==null&&(i=c.key)}else{const c=L();if(c){let m;switch(s){case"down":m=c.getNext();break;case"up":m=c.getPrev();break;case"right":m=c.getChild();break;case"left":m=c.getParent();break}m&&(i=m.key)}}i!==null&&(o.value=null,a.value=i)}const V=b(()=>{const{inverted:s}=e,u=j.value,{common:{cubicBezierEaseInOut:f},self:i}=y.value,{padding:c,dividerColor:m,borderRadius:D,optionOpacityDisabled:oe,[A("optionIconSuffixWidth",u)]:F,[A("optionSuffixWidth",u)]:xe,[A("optionIconPrefixWidth",u)]:Se,[A("optionPrefixWidth",u)]:Re,[A("fontSize",u)]:Pe,[A("optionHeight",u)]:Ne,[A("optionIconSize",u)]:Ce}=i,h={"--n-bezier":f,"--n-font-size":Pe,"--n-padding":c,"--n-border-radius":D,"--n-option-height":Ne,"--n-option-prefix-width":Re,"--n-option-icon-prefix-width":Se,"--n-option-suffix-width":xe,"--n-option-icon-suffix-width":F,"--n-option-icon-size":Ce,"--n-divider-color":m,"--n-option-opacity-disabled":oe};return s?(h["--n-color"]=i.colorInverted,h["--n-option-color-hover"]=i.optionColorHoverInverted,h["--n-option-color-active"]=i.optionColorActiveInverted,h["--n-option-text-color"]=i.optionTextColorInverted,h["--n-option-text-color-hover"]=i.optionTextColorHoverInverted,h["--n-option-text-color-active"]=i.optionTextColorActiveInverted,h["--n-option-text-color-child-active"]=i.optionTextColorChildActiveInverted,h["--n-prefix-color"]=i.prefixColorInverted,h["--n-suffix-color"]=i.suffixColorInverted,h["--n-group-header-text-color"]=i.groupHeaderTextColorInverted):(h["--n-color"]=i.color,h["--n-option-color-hover"]=i.optionColorHover,h["--n-option-color-active"]=i.optionColorActive,h["--n-option-text-color"]=i.optionTextColor,h["--n-option-text-color-hover"]=i.optionTextColorHover,h["--n-option-text-color-active"]=i.optionTextColorActive,h["--n-option-text-color-child-active"]=i.optionTextColorChildActive,h["--n-prefix-color"]=i.prefixColor,h["--n-suffix-color"]=i.suffixColor,h["--n-group-header-text-color"]=i.groupHeaderTextColor),h}),k=N?he("dropdown",b(()=>`${j.value[0]}${e.inverted?"i":""}`),V,e):void 0;return{mergedClsPrefix:I,mergedTheme:y,mergedSize:j,tmNodes:r,mergedShow:d,handleAfterLeave:()=>{e.animated&&G()},doUpdateShow:K,cssVars:N?void 0:V,themeClass:k==null?void 0:k.themeClass,onRender:k==null?void 0:k.onRender}},render(){const e=(t,r,o,a,p)=>{var v;const{mergedClsPrefix:w,menuProps:g}=this;(v=this.onRender)===null||v===void 0||v.call(this);const P=(g==null?void 0:g(void 0,this.tmNodes.map(N=>N.rawNode)))||{},I={ref:Ve(r),class:[t,`${w}-dropdown`,`${w}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:w,tmNodes:this.tmNodes,style:[...o,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:a,onMouseleave:p};return l(ye,le(this.$attrs,I,P))},{mergedTheme:n}=this,d={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return l(pe,Object.assign({},Me(this.$props,io),d),{trigger:()=>{var t,r;return(r=(t=this.$slots).default)===null||r===void 0?void 0:r.call(t)}})}});export{We as C,co as N,po as a,Ye as b,Ve as c};
