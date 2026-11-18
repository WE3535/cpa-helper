import{d as V,z as c,A as mo,C as ho,D as po,E as je,F as se,G as m,H as A,S as oo,I as ye,J as Z,K as to,L as xe,p,r as F,M as ne,O as v,P as T,Q as ro,R as X,T as q,U as be,V as ae,W as fo,X as re,Y as Me,Z as Te,_ as go,$ as Ie,a0 as bo,a1 as yo,a2 as Ke,a3 as xo,a4 as Co,a5 as zo,a6 as Ve,o as wo,i as Se,w as E,u as z,a7 as Io,x as So,a8 as ko,h as pe,a as L,t as oe,b as M,j as fe,B as te,k as Ue,a9 as Ro,c as To,aa as Po,ab as Ao,ac as No,ad as _o,ae as Mo,af as Ho,ag as Bo,ah as Eo,e as Oo,f as Lo}from"./index-Dfrjz4pj.js";import{l as De}from"./assets-Q9sAJY7I.js";import{C as $o,N as Pe,a as Fo,b as Y}from"./Dropdown-BcD70RJB.js";import{f as ke,u as Ae,_ as jo}from"./_plugin-vue_export-helper-DzwHZgiI.js";import{V as Ko,c as Re}from"./Popover-DTVg7lv7.js";import{u as Vo}from"./use-compitable-cb_Gb3bI.js";import{c as G}from"./createLucideIcon-cBP00-Pw.js";import{N as Uo,a as Do}from"./DrawerContent-CN_21akL.js";import{C as qe}from"./chart-column-BHt0KYYx.js";import{U as qo}from"./users-DZ-Eiu6s.js";import{A as Ge}from"./activity-CEZNN6fW.js";import{K as Go}from"./key-round-BZ247bdU.js";import{C as Wo}from"./cpu-B9rWhpr2.js";import{U as We}from"./user-round-bbK8VjCu.js";import{u as Yo}from"./use-message-DrJFD4H9.js";const Xo=V({name:"ChevronDownFilled",render(){return c("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},c("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}});function Zo(e){const{baseColor:t,textColor2:r,bodyColor:a,cardColor:l,dividerColor:i,actionColor:d,scrollbarColor:h,scrollbarColorHover:s,invertedColor:g}=e;return{textColor:r,textColorInverted:"#FFF",color:a,colorEmbedded:d,headerColor:l,headerColorInverted:g,footerColor:d,footerColorInverted:g,headerBorderColor:i,headerBorderColorInverted:g,footerBorderColor:i,footerBorderColorInverted:g,siderBorderColor:i,siderBorderColorInverted:g,siderColor:l,siderColorInverted:g,siderToggleButtonBorder:`1px solid ${i}`,siderToggleButtonColor:t,siderToggleButtonIconColor:r,siderToggleButtonIconColorInverted:r,siderToggleBarColor:je(a,h),siderToggleBarColorHover:je(a,s),__invertScrollbar:"true"}}const He=mo({name:"Layout",common:po,peers:{Scrollbar:ho},self:Zo}),no=se("n-layout-sider"),Be={type:String,default:"static"},Qo=m("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[m("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),A("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),Jo={embedded:Boolean,position:Be,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},io=se("n-layout");function lo(e){return V({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},Z.props),Jo),setup(t){const r=F(null),a=F(null),{mergedClsPrefixRef:l,inlineThemeDisabled:i}=ye(t),d=Z("Layout","-layout",Qo,He,t,l);function h(P,k){if(t.nativeScrollbar){const{value:R}=r;R&&(k===void 0?R.scrollTo(P):R.scrollTo(P,k))}else{const{value:R}=a;R&&R.scrollTo(P,k)}}ne(io,t);let s=0,g=0;const O=P=>{var k;const R=P.target;s=R.scrollLeft,g=R.scrollTop,(k=t.onScroll)===null||k===void 0||k.call(t,P)};to(()=>{if(t.nativeScrollbar){const P=r.value;P&&(P.scrollTop=g,P.scrollLeft=s)}});const H={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},b={scrollTo:h},B=p(()=>{const{common:{cubicBezierEaseInOut:P},self:k}=d.value;return{"--n-bezier":P,"--n-color":t.embedded?k.colorEmbedded:k.color,"--n-text-color":k.textColor}}),_=i?xe("layout",p(()=>t.embedded?"e":""),B,t):void 0;return Object.assign({mergedClsPrefix:l,scrollableElRef:r,scrollbarInstRef:a,hasSiderStyle:H,mergedTheme:d,handleNativeElScroll:O,cssVars:i?void 0:B,themeClass:_==null?void 0:_.themeClass,onRender:_==null?void 0:_.onRender},b)},render(){var t;const{mergedClsPrefix:r,hasSider:a}=this;(t=this.onRender)===null||t===void 0||t.call(this);const l=a?this.hasSiderStyle:void 0,i=[this.themeClass,e&&`${r}-layout-content`,`${r}-layout`,`${r}-layout--${this.position}-positioned`];return c("div",{class:i,style:this.cssVars},this.nativeScrollbar?c("div",{ref:"scrollableElRef",class:[`${r}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,l],onScroll:this.handleNativeElScroll},this.$slots):c(oo,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,l]}),this.$slots))}})}const Ye=lo(!1),et=lo(!0),ot=m("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[A("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),A("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),tt={position:Be,inverted:Boolean,bordered:{type:Boolean,default:!1}},rt=V({name:"LayoutHeader",props:Object.assign(Object.assign({},Z.props),tt),setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:r}=ye(e),a=Z("Layout","-layout-header",ot,He,e,t),l=p(()=>{const{common:{cubicBezierEaseInOut:d},self:h}=a.value,s={"--n-bezier":d};return e.inverted?(s["--n-color"]=h.headerColorInverted,s["--n-text-color"]=h.textColorInverted,s["--n-border-color"]=h.headerBorderColorInverted):(s["--n-color"]=h.headerColor,s["--n-text-color"]=h.textColor,s["--n-border-color"]=h.headerBorderColor),s}),i=r?xe("layout-header",p(()=>e.inverted?"a":"b"),l,e):void 0;return{mergedClsPrefix:t,cssVars:r?void 0:l,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){var e;const{mergedClsPrefix:t}=this;return(e=this.onRender)===null||e===void 0||e.call(this),c("div",{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),nt=m("layout-sider",`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[A("bordered",[v("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),v("left-placement",[A("bordered",[v("border",`
 right: 0;
 `)])]),A("right-placement",`
 justify-content: flex-start;
 `,[A("bordered",[v("border",`
 left: 0;
 `)]),A("collapsed",[m("layout-toggle-button",[m("base-icon",`
 transform: rotate(180deg);
 `)]),m("layout-toggle-bar",[T("&:hover",[v("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),v("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),m("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[m("base-icon",`
 transform: rotate(0);
 `)]),m("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[T("&:hover",[v("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),v("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),A("collapsed",[m("layout-toggle-bar",[T("&:hover",[v("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),v("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),m("layout-toggle-button",[m("base-icon",`
 transform: rotate(0);
 `)])]),m("layout-toggle-button",`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[m("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),m("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[v("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),v("bottom",`
 position: absolute;
 top: 34px;
 `),T("&:hover",[v("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),v("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),v("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),T("&:hover",[v("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),v("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),m("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),A("show-content",[m("layout-sider-scroll-container",{opacity:1})]),A("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),it=V({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return c("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},c("div",{class:`${e}-layout-toggle-bar__top`}),c("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),lt=V({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return c("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},c(ro,{clsPrefix:e},{default:()=>c($o,null)}))}}),at={position:Be,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},st=V({name:"LayoutSider",props:Object.assign(Object.assign({},Z.props),at),setup(e){const t=X(io),r=F(null),a=F(null),l=F(e.defaultCollapsed),i=Ae(be(e,"collapsed"),l),d=p(()=>ke(i.value?e.collapsedWidth:e.width)),h=p(()=>e.collapseMode!=="transform"?{}:{minWidth:ke(e.width)}),s=p(()=>t?t.siderPlacement:"left");function g(y,w){if(e.nativeScrollbar){const{value:I}=r;I&&(w===void 0?I.scrollTo(y):I.scrollTo(y,w))}else{const{value:I}=a;I&&I.scrollTo(y,w)}}function O(){const{"onUpdate:collapsed":y,onUpdateCollapsed:w,onExpand:I,onCollapse:U}=e,{value:K}=i;w&&q(w,!K),y&&q(y,!K),l.value=!K,K?I&&q(I):U&&q(U)}let H=0,b=0;const B=y=>{var w;const I=y.target;H=I.scrollLeft,b=I.scrollTop,(w=e.onScroll)===null||w===void 0||w.call(e,y)};to(()=>{if(e.nativeScrollbar){const y=r.value;y&&(y.scrollTop=b,y.scrollLeft=H)}}),ne(no,{collapsedRef:i,collapseModeRef:be(e,"collapseMode")});const{mergedClsPrefixRef:_,inlineThemeDisabled:P}=ye(e),k=Z("Layout","-layout-sider",nt,He,e,_);function R(y){var w,I;y.propertyName==="max-width"&&(i.value?(w=e.onAfterLeave)===null||w===void 0||w.call(e):(I=e.onAfterEnter)===null||I===void 0||I.call(e))}const W={scrollTo:g},D=p(()=>{const{common:{cubicBezierEaseInOut:y},self:w}=k.value,{siderToggleButtonColor:I,siderToggleButtonBorder:U,siderToggleBarColor:K,siderToggleBarColorHover:ee}=w,$={"--n-bezier":y,"--n-toggle-button-color":I,"--n-toggle-button-border":U,"--n-toggle-bar-color":K,"--n-toggle-bar-color-hover":ee};return e.inverted?($["--n-color"]=w.siderColorInverted,$["--n-text-color"]=w.textColorInverted,$["--n-border-color"]=w.siderBorderColorInverted,$["--n-toggle-button-icon-color"]=w.siderToggleButtonIconColorInverted,$.__invertScrollbar=w.__invertScrollbar):($["--n-color"]=w.siderColor,$["--n-text-color"]=w.textColor,$["--n-border-color"]=w.siderBorderColor,$["--n-toggle-button-icon-color"]=w.siderToggleButtonIconColor),$}),j=P?xe("layout-sider",p(()=>e.inverted?"a":"b"),D,e):void 0;return Object.assign({scrollableElRef:r,scrollbarInstRef:a,mergedClsPrefix:_,mergedTheme:k,styleMaxWidth:d,mergedCollapsed:i,scrollContainerStyle:h,siderPlacement:s,handleNativeElScroll:B,handleTransitionend:R,handleTriggerClick:O,inlineThemeDisabled:P,cssVars:D,themeClass:j==null?void 0:j.themeClass,onRender:j==null?void 0:j.onRender},W)},render(){var e;const{mergedClsPrefix:t,mergedCollapsed:r,showTrigger:a}=this;return(e=this.onRender)===null||e===void 0||e.call(this),c("aside",{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,r&&`${t}-layout-sider--collapsed`,(!r||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:ke(this.width)}]},this.nativeScrollbar?c("div",{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):c(oo,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),a?a==="bar"?c(it,{clsPrefix:t,class:r?this.collapsedTriggerClass:this.triggerClass,style:r?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):c(lt,{clsPrefix:t,class:r?this.collapsedTriggerClass:this.triggerClass,style:r?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?c("div",{class:`${t}-layout-sider__border`}):null)}}),ce=se("n-menu"),ao=se("n-submenu"),Ee=se("n-menu-item-group"),Xe=[T("&::before","background-color: var(--n-item-color-hover);"),v("arrow",`
 color: var(--n-arrow-color-hover);
 `),v("icon",`
 color: var(--n-item-icon-color-hover);
 `),m("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[T("a",`
 color: var(--n-item-text-color-hover);
 `),v("extra",`
 color: var(--n-item-text-color-hover);
 `)])],Ze=[v("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),m("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[T("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),v("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],ct=T([m("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[A("horizontal",`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[m("submenu","margin: 0;"),m("menu-item","margin: 0;"),m("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[T("&::before","display: none;"),A("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),m("menu-item-content",[A("selected",[v("icon","color: var(--n-item-icon-color-active-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[T("a","color: var(--n-item-text-color-active-horizontal);"),v("extra","color: var(--n-item-text-color-active-horizontal);")])]),A("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[T("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),v("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),v("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),ae("disabled",[ae("selected, child-active",[T("&:focus-within",Ze)]),A("selected",[J(null,[v("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[T("a","color: var(--n-item-text-color-active-hover-horizontal);"),v("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),A("child-active",[J(null,[v("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[T("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),v("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),J("border-bottom: 2px solid var(--n-border-color-horizontal);",Ze)]),m("menu-item-content-header",[T("a","color: var(--n-item-text-color-horizontal);")])])]),ae("responsive",[m("menu-item-content-header",`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),A("collapsed",[m("menu-item-content",[A("selected",[T("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),m("menu-item-content-header","opacity: 0;"),v("arrow","opacity: 0;"),v("icon","color: var(--n-item-icon-color-collapsed);")])]),m("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),m("menu-item-content",`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[T("> *","z-index: 1;"),T("&::before",`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),A("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),A("collapsed",[v("arrow","transform: rotate(0);")]),A("selected",[T("&::before","background-color: var(--n-item-color-active);"),v("arrow","color: var(--n-arrow-color-active);"),v("icon","color: var(--n-item-icon-color-active);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[T("a","color: var(--n-item-text-color-active);"),v("extra","color: var(--n-item-text-color-active);")])]),A("child-active",[m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[T("a",`
 color: var(--n-item-text-color-child-active);
 `),v("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),v("arrow",`
 color: var(--n-arrow-color-child-active);
 `),v("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),ae("disabled",[ae("selected, child-active",[T("&:focus-within",Xe)]),A("selected",[J(null,[v("arrow","color: var(--n-arrow-color-active-hover);"),v("icon","color: var(--n-item-icon-color-active-hover);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[T("a","color: var(--n-item-text-color-active-hover);"),v("extra","color: var(--n-item-text-color-active-hover);")])])]),A("child-active",[J(null,[v("arrow","color: var(--n-arrow-color-child-active-hover);"),v("icon","color: var(--n-item-icon-color-child-active-hover);"),m("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[T("a","color: var(--n-item-text-color-child-active-hover);"),v("extra","color: var(--n-item-text-color-child-active-hover);")])])]),A("selected",[J(null,[T("&::before","background-color: var(--n-item-color-active-hover);")])]),J(null,Xe)]),v("icon",`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),v("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),m("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[T("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[T("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),v("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),m("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[m("menu-item-content",`
 height: var(--n-item-height);
 `),m("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[fo({duration:".2s"})])]),m("menu-item-group",[m("menu-item-group-title",`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),m("menu-tooltip",[T("a",`
 color: inherit;
 text-decoration: none;
 `)]),m("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function J(e,t){return[A("hover",e,t),T("&:hover",e,t)]}const so=V({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:t}=X(ce);return{menuProps:t,style:p(()=>{const{paddingLeft:r}=e;return{paddingLeft:r&&`${r}px`}}),iconStyle:p(()=>{const{maxIconSize:r,activeIconSize:a,iconMarginRight:l}=e;return{width:`${r}px`,height:`${r}px`,fontSize:`${a}px`,marginRight:`${l}px`}})}},render(){const{clsPrefix:e,tmNode:t,menuProps:{renderIcon:r,renderLabel:a,renderExtra:l,expandIcon:i}}=this,d=r?r(t.rawNode):re(this.icon);return c("div",{onClick:h=>{var s;(s=this.onClick)===null||s===void 0||s.call(this,h)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},d&&c("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[d]),c("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:a?a(t.rawNode):re(this.title),this.extra||l?c("span",{class:`${e}-menu-item-content-header__extra`}," ",l?l(t.rawNode):re(this.extra)):null),this.showArrow?c(ro,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>i?i(t.rawNode):c(Xo,null)}):null)}}),ge=8;function Oe(e){const t=X(ce),{props:r,mergedCollapsedRef:a}=t,l=X(ao,null),i=X(Ee,null),d=p(()=>r.mode==="horizontal"),h=p(()=>d.value?r.dropdownPlacement:"tmNodes"in e?"right-start":"right"),s=p(()=>{var b;return Math.max((b=r.collapsedIconSize)!==null&&b!==void 0?b:r.iconSize,r.iconSize)}),g=p(()=>{var b;return!d.value&&e.root&&a.value&&(b=r.collapsedIconSize)!==null&&b!==void 0?b:r.iconSize}),O=p(()=>{if(d.value)return;const{collapsedWidth:b,indent:B,rootIndent:_}=r,{root:P,isGroup:k}=e,R=_===void 0?B:_;return P?a.value?b/2-s.value/2:R:i&&typeof i.paddingLeftRef.value=="number"?B/2+i.paddingLeftRef.value:l&&typeof l.paddingLeftRef.value=="number"?(k?B/2:B)+l.paddingLeftRef.value:0}),H=p(()=>{const{collapsedWidth:b,indent:B,rootIndent:_}=r,{value:P}=s,{root:k}=e;return d.value||!k||!a.value?ge:(_===void 0?B:_)+P+ge-(b+P)/2});return{dropdownPlacement:h,activeIconSize:g,maxIconSize:s,paddingLeft:O,iconMarginRight:H,NMenu:t,NSubmenu:l,NMenuOptionGroup:i}}const Le={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},dt=V({name:"MenuDivider",setup(){const e=X(ce),{mergedClsPrefixRef:t,isHorizontalRef:r}=e;return()=>r.value?null:c("div",{class:`${t.value}-menu-divider`})}}),co=Object.assign(Object.assign({},Le),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),ut=Me(co),vt=V({name:"MenuOption",props:co,setup(e){const t=Oe(e),{NSubmenu:r,NMenu:a,NMenuOptionGroup:l}=t,{props:i,mergedClsPrefixRef:d,mergedCollapsedRef:h}=a,s=r?r.mergedDisabledRef:l?l.mergedDisabledRef:{value:!1},g=p(()=>s.value||e.disabled);function O(b){const{onClick:B}=e;B&&B(b)}function H(b){g.value||(a.doSelect(e.internalKey,e.tmNode.rawNode),O(b))}return{mergedClsPrefix:d,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:a.mergedThemeRef,menuProps:i,dropdownEnabled:Te(()=>e.root&&h.value&&i.mode!=="horizontal"&&!g.value),selected:Te(()=>a.mergedValueRef.value===e.internalKey),mergedDisabled:g,handleClick:H}},render(){const{mergedClsPrefix:e,mergedTheme:t,tmNode:r,menuProps:{renderLabel:a,nodeProps:l}}=this,i=l==null?void 0:l(r.rawNode);return c("div",Object.assign({},i,{role:"menuitem",class:[`${e}-menu-item`,i==null?void 0:i.class]}),c(Pe,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>a?a(r.rawNode):re(this.title),trigger:()=>c(so,{tmNode:r,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),uo=Object.assign(Object.assign({},Le),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),mt=Me(uo),ht=V({name:"MenuOptionGroup",props:uo,setup(e){const t=Oe(e),{NSubmenu:r}=t,a=p(()=>r!=null&&r.mergedDisabledRef.value?!0:e.tmNode.disabled);ne(Ee,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:a});const{mergedClsPrefixRef:l,props:i}=X(ce);return function(){const{value:d}=l,h=t.paddingLeft.value,{nodeProps:s}=i,g=s==null?void 0:s(e.tmNode.rawNode);return c("div",{class:`${d}-menu-item-group`,role:"group"},c("div",Object.assign({},g,{class:[`${d}-menu-item-group-title`,g==null?void 0:g.class],style:[(g==null?void 0:g.style)||"",h!==void 0?`padding-left: ${h}px;`:""]}),re(e.title),e.extra?c(go,null," ",re(e.extra)):null),c("div",null,e.tmNodes.map(O=>$e(O,i))))}}});function Ne(e){return e.type==="divider"||e.type==="render"}function pt(e){return e.type==="divider"}function $e(e,t){const{rawNode:r}=e,{show:a}=r;if(a===!1)return null;if(Ne(r))return pt(r)?c(dt,Object.assign({key:e.key},r.props)):null;const{labelField:l}=t,{key:i,level:d,isGroup:h}=e,s=Object.assign(Object.assign({},r),{title:r.title||r[l],extra:r.titleExtra||r.extra,key:i,internalKey:i,level:d,root:d===0,isGroup:h});return e.children?e.isGroup?c(ht,Ie(s,mt,{tmNode:e,tmNodes:e.children,key:i})):c(_e,Ie(s,ft,{key:i,rawNodes:r[t.childrenField],tmNodes:e.children,tmNode:e})):c(vt,Ie(s,ut,{key:i,tmNode:e}))}const vo=Object.assign(Object.assign({},Le),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),ft=Me(vo),_e=V({name:"Submenu",props:vo,setup(e){const t=Oe(e),{NMenu:r,NSubmenu:a}=t,{props:l,mergedCollapsedRef:i,mergedThemeRef:d}=r,h=p(()=>{const{disabled:b}=e;return a!=null&&a.mergedDisabledRef.value||l.disabled?!0:b}),s=F(!1);ne(ao,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:h}),ne(Ee,null);function g(){const{onClick:b}=e;b&&b()}function O(){h.value||(i.value||r.toggleExpand(e.internalKey),g())}function H(b){s.value=b}return{menuProps:l,mergedTheme:d,doSelect:r.doSelect,inverted:r.invertedRef,isHorizontal:r.isHorizontalRef,mergedClsPrefix:r.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:s,paddingLeft:t.paddingLeft,mergedDisabled:h,mergedValue:r.mergedValueRef,childActive:Te(()=>{var b;return(b=e.virtualChildActive)!==null&&b!==void 0?b:r.activePathRef.value.includes(e.internalKey)}),collapsed:p(()=>l.mode==="horizontal"?!1:i.value?!0:!r.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:p(()=>!h.value&&(l.mode==="horizontal"||i.value)),handlePopoverShowChange:H,handleClick:O}},render(){var e;const{mergedClsPrefix:t,menuProps:{renderIcon:r,renderLabel:a}}=this,l=()=>{const{isHorizontal:d,paddingLeft:h,collapsed:s,mergedDisabled:g,maxIconSize:O,activeIconSize:H,title:b,childActive:B,icon:_,handleClick:P,menuProps:{nodeProps:k},dropdownShow:R,iconMarginRight:W,tmNode:D,mergedClsPrefix:j,isEllipsisPlaceholder:y,extra:w}=this,I=k==null?void 0:k(D.rawNode);return c("div",Object.assign({},I,{class:[`${j}-menu-item`,I==null?void 0:I.class],role:"menuitem"}),c(so,{tmNode:D,paddingLeft:h,collapsed:s,disabled:g,iconMarginRight:W,maxIconSize:O,activeIconSize:H,title:b,extra:w,showArrow:!d,childActive:B,clsPrefix:j,icon:_,hover:R,onClick:P,isEllipsisPlaceholder:y}))},i=()=>c(bo,null,{default:()=>{const{tmNodes:d,collapsed:h}=this;return h?null:c("div",{class:`${t}-submenu-children`,role:"menu"},d.map(s=>$e(s,this.menuProps)))}});return this.root?c(Fo,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:r,renderLabel:a}),{default:()=>c("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},l(),this.isHorizontal?null:i())}):c("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},l(),i())}}),gt=Object.assign(Object.assign({},Z.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),Qe=V({name:"Menu",inheritAttrs:!1,props:gt,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:r}=ye(e),a=Z("Menu","-menu",ct,zo,e,t),l=X(no,null),i=p(()=>{var u;const{collapsed:x}=e;if(x!==void 0)return x;if(l){const{collapseModeRef:o,collapsedRef:f}=l;if(o.value==="width")return(u=f.value)!==null&&u!==void 0?u:!1}return!1}),d=p(()=>{const{keyField:u,childrenField:x,disabledField:o}=e;return Re(e.items||e.options,{getIgnored(f){return Ne(f)},getChildren(f){return f[x]},getDisabled(f){return f[o]},getKey(f){var N;return(N=f[u])!==null&&N!==void 0?N:f.name}})}),h=p(()=>new Set(d.value.treeNodes.map(u=>u.key))),{watchProps:s}=e,g=F(null);s!=null&&s.includes("defaultValue")?Ke(()=>{g.value=e.defaultValue}):g.value=e.defaultValue;const O=be(e,"value"),H=Ae(O,g),b=F([]),B=()=>{b.value=e.defaultExpandAll?d.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||d.value.getPath(H.value,{includeSelf:!1}).keyPath};s!=null&&s.includes("defaultExpandedKeys")?Ke(B):B();const _=Vo(e,["expandedNames","expandedKeys"]),P=Ae(_,b),k=p(()=>d.value.treeNodes),R=p(()=>d.value.getPath(H.value).keyPath);ne(ce,{props:e,mergedCollapsedRef:i,mergedThemeRef:a,mergedValueRef:H,mergedExpandedKeysRef:P,activePathRef:R,mergedClsPrefixRef:t,isHorizontalRef:p(()=>e.mode==="horizontal"),invertedRef:be(e,"inverted"),doSelect:W,toggleExpand:j});function W(u,x){const{"onUpdate:value":o,onUpdateValue:f,onSelect:N}=e;f&&q(f,u,x),o&&q(o,u,x),N&&q(N,u,x),g.value=u}function D(u){const{"onUpdate:expandedKeys":x,onUpdateExpandedKeys:o,onExpandedNamesChange:f,onOpenNamesChange:N}=e;x&&q(x,u),o&&q(o,u),f&&q(f,u),N&&q(N,u),b.value=u}function j(u){const x=Array.from(P.value),o=x.findIndex(f=>f===u);if(~o)x.splice(o,1);else{if(e.accordion&&h.value.has(u)){const f=x.findIndex(N=>h.value.has(N));f>-1&&x.splice(f,1)}x.push(u)}D(x)}const y=u=>{const x=d.value.getPath(u??H.value,{includeSelf:!1}).keyPath;if(!x.length)return;const o=Array.from(P.value),f=new Set([...o,...x]);e.accordion&&h.value.forEach(N=>{f.has(N)&&!x.includes(N)&&f.delete(N)}),D(Array.from(f))},w=p(()=>{const{inverted:u}=e,{common:{cubicBezierEaseInOut:x},self:o}=a.value,{borderRadius:f,borderColorHorizontal:N,fontSize:le,itemHeight:C,dividerColor:S}=o,n={"--n-divider-color":S,"--n-bezier":x,"--n-font-size":le,"--n-border-color-horizontal":N,"--n-border-radius":f,"--n-item-height":C};return u?(n["--n-group-text-color"]=o.groupTextColorInverted,n["--n-color"]=o.colorInverted,n["--n-item-text-color"]=o.itemTextColorInverted,n["--n-item-text-color-hover"]=o.itemTextColorHoverInverted,n["--n-item-text-color-active"]=o.itemTextColorActiveInverted,n["--n-item-text-color-child-active"]=o.itemTextColorChildActiveInverted,n["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveInverted,n["--n-item-text-color-active-hover"]=o.itemTextColorActiveHoverInverted,n["--n-item-icon-color"]=o.itemIconColorInverted,n["--n-item-icon-color-hover"]=o.itemIconColorHoverInverted,n["--n-item-icon-color-active"]=o.itemIconColorActiveInverted,n["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHoverInverted,n["--n-item-icon-color-child-active"]=o.itemIconColorChildActiveInverted,n["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHoverInverted,n["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsedInverted,n["--n-item-text-color-horizontal"]=o.itemTextColorHorizontalInverted,n["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontalInverted,n["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontalInverted,n["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontalInverted,n["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontalInverted,n["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontalInverted,n["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontalInverted,n["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontalInverted,n["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontalInverted,n["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontalInverted,n["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontalInverted,n["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontalInverted,n["--n-arrow-color"]=o.arrowColorInverted,n["--n-arrow-color-hover"]=o.arrowColorHoverInverted,n["--n-arrow-color-active"]=o.arrowColorActiveInverted,n["--n-arrow-color-active-hover"]=o.arrowColorActiveHoverInverted,n["--n-arrow-color-child-active"]=o.arrowColorChildActiveInverted,n["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHoverInverted,n["--n-item-color-hover"]=o.itemColorHoverInverted,n["--n-item-color-active"]=o.itemColorActiveInverted,n["--n-item-color-active-hover"]=o.itemColorActiveHoverInverted,n["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsedInverted):(n["--n-group-text-color"]=o.groupTextColor,n["--n-color"]=o.color,n["--n-item-text-color"]=o.itemTextColor,n["--n-item-text-color-hover"]=o.itemTextColorHover,n["--n-item-text-color-active"]=o.itemTextColorActive,n["--n-item-text-color-child-active"]=o.itemTextColorChildActive,n["--n-item-text-color-child-active-hover"]=o.itemTextColorChildActiveHover,n["--n-item-text-color-active-hover"]=o.itemTextColorActiveHover,n["--n-item-icon-color"]=o.itemIconColor,n["--n-item-icon-color-hover"]=o.itemIconColorHover,n["--n-item-icon-color-active"]=o.itemIconColorActive,n["--n-item-icon-color-active-hover"]=o.itemIconColorActiveHover,n["--n-item-icon-color-child-active"]=o.itemIconColorChildActive,n["--n-item-icon-color-child-active-hover"]=o.itemIconColorChildActiveHover,n["--n-item-icon-color-collapsed"]=o.itemIconColorCollapsed,n["--n-item-text-color-horizontal"]=o.itemTextColorHorizontal,n["--n-item-text-color-hover-horizontal"]=o.itemTextColorHoverHorizontal,n["--n-item-text-color-active-horizontal"]=o.itemTextColorActiveHorizontal,n["--n-item-text-color-child-active-horizontal"]=o.itemTextColorChildActiveHorizontal,n["--n-item-text-color-child-active-hover-horizontal"]=o.itemTextColorChildActiveHoverHorizontal,n["--n-item-text-color-active-hover-horizontal"]=o.itemTextColorActiveHoverHorizontal,n["--n-item-icon-color-horizontal"]=o.itemIconColorHorizontal,n["--n-item-icon-color-hover-horizontal"]=o.itemIconColorHoverHorizontal,n["--n-item-icon-color-active-horizontal"]=o.itemIconColorActiveHorizontal,n["--n-item-icon-color-active-hover-horizontal"]=o.itemIconColorActiveHoverHorizontal,n["--n-item-icon-color-child-active-horizontal"]=o.itemIconColorChildActiveHorizontal,n["--n-item-icon-color-child-active-hover-horizontal"]=o.itemIconColorChildActiveHoverHorizontal,n["--n-arrow-color"]=o.arrowColor,n["--n-arrow-color-hover"]=o.arrowColorHover,n["--n-arrow-color-active"]=o.arrowColorActive,n["--n-arrow-color-active-hover"]=o.arrowColorActiveHover,n["--n-arrow-color-child-active"]=o.arrowColorChildActive,n["--n-arrow-color-child-active-hover"]=o.arrowColorChildActiveHover,n["--n-item-color-hover"]=o.itemColorHover,n["--n-item-color-active"]=o.itemColorActive,n["--n-item-color-active-hover"]=o.itemColorActiveHover,n["--n-item-color-active-collapsed"]=o.itemColorActiveCollapsed),n}),I=r?xe("menu",p(()=>e.inverted?"a":"b"),w,e):void 0,U=xo(),K=F(null),ee=F(null);let $=!0;const de=()=>{var u;$?$=!1:(u=K.value)===null||u===void 0||u.sync({showAllItemsBeforeCalculate:!0})};function ie(){return document.getElementById(U)}const Q=F(-1);function Ce(u){Q.value=e.options.length-u}function ue(u){u||(Q.value=-1)}const ve=p(()=>{const u=Q.value;return{children:u===-1?[]:e.options.slice(u)}}),me=p(()=>{const{childrenField:u,disabledField:x,keyField:o}=e;return Re([ve.value],{getIgnored(f){return Ne(f)},getChildren(f){return f[u]},getDisabled(f){return f[x]},getKey(f){var N;return(N=f[o])!==null&&N!==void 0?N:f.name}})}),ze=p(()=>Re([{}]).treeNodes[0]);function we(){var u;if(Q.value===-1)return c(_e,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:ze.value,domId:U,isEllipsisPlaceholder:!0});const x=me.value.treeNodes[0],o=R.value,f=!!(!((u=x.children)===null||u===void 0)&&u.some(N=>o.includes(N.key)));return c(_e,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:f,tmNode:x,domId:U,rawNodes:x.rawNode.children||[],tmNodes:x.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:t,controlledExpandedKeys:_,uncontrolledExpanededKeys:b,mergedExpandedKeys:P,uncontrolledValue:g,mergedValue:H,activePath:R,tmNodes:k,mergedTheme:a,mergedCollapsed:i,cssVars:r?void 0:w,themeClass:I==null?void 0:I.themeClass,overflowRef:K,counterRef:ee,updateCounter:()=>{},onResize:de,onUpdateOverflow:ue,onUpdateCount:Ce,renderCounter:we,getCounter:ie,onRender:I==null?void 0:I.onRender,showOption:y,deriveResponsiveState:de}},render(){const{mergedClsPrefix:e,mode:t,themeClass:r,onRender:a}=this;a==null||a();const l=()=>this.tmNodes.map(s=>$e(s,this.$props)),d=t==="horizontal"&&this.responsive,h=()=>c("div",Co(this.$attrs,{role:t==="horizontal"?"menubar":"menu",class:[`${e}-menu`,r,`${e}-menu--${t}`,d&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),d?c(Ko,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:l,counter:this.renderCounter}):l());return d?c(yo,{onResize:this.onResize},{default:h}):h()}});/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=G("DollarSignIcon",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=G("GithubIcon",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xt=G("ListChecksIcon",[["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}],["path",{d:"M13 6h8",key:"15sg57"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 18h8",key:"oe0vm4"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=G("ListIcon",[["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 18h.01",key:"1tta3j"}],["path",{d:"M3 6h.01",key:"1rqtza"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 18h13",key:"1lx6n3"}],["path",{d:"M8 6h13",key:"ik3vkj"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eo=G("LogOutIcon",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=G("MenuIcon",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=G("MonitorIcon",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=G("MoonIcon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=G("SettingsIcon",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=G("ShieldIcon",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=G("SunIcon",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]),Rt={class:"brand"},Tt={class:"brand-mark"},Pt=["src"],At={class:"brand-copy"},Nt={class:"sider-footer"},_t={class:"sider-version-text"},Mt={class:"sider-actions"},Ht={class:"mobile-brand","aria-label":"CPA-Helper 账号信息"},Bt=["src"],Et={class:"mobile-brand-copy"},Ot={class:"mobile-title-row"},Lt={class:"mobile-version-badge"},$t={key:0,class:"route-progress","aria-hidden":"true"},Ft={class:"drawer-actions"},jt="https://github.com/walkingddd/CPA-Helper",Kt=V({__name:"AppShell",setup(e){const t=Oo(),r=Lo(),a=Yo(),l=window.matchMedia("(max-width: 860px)"),i=F(l.matches),d=F(!1),h=F(null),s=F(!1),{currentUser:g,setCurrentUser:O}=Io(),H=F(g.value!==null),{isDark:b,preference:B,setThemePreference:_,toggleTheme:P}=No();let k,R;function W(C){i.value=C.matches,C.matches||(d.value=!1)}l.addEventListener("change",W),Ve(()=>{l.removeEventListener("change",W),k!==void 0&&window.clearTimeout(k),R!==void 0&&window.clearTimeout(R)});async function D(){try{O(await So())}catch{O(null)}finally{H.value=!0}}wo(()=>{D()});function j(C){const S=C.detail;if(ko(S)){O(S),H.value=!0;return}D()}window.addEventListener("cpa:account-updated",j),Ve(()=>{window.removeEventListener("cpa:account-updated",j)});function y(C){return()=>c(Y,{size:18},{default:()=>c(C)})}const w=[{label:"历史用量",key:"/admin/usage",icon:y(qe)},{label:"请求明细",key:"/admin/records",icon:y(Je)},{label:"用户管理",key:"/admin/users",icon:y(qo)},{label:"模型价格",key:"/admin/pricing",icon:y(bt)},{label:"系统设置",key:"/admin/settings",icon:y(It)}],I=[{label:"巡检设置",key:"/admin/account-inspection",icon:y(Ge)},{label:"账号状态",key:"/admin/account-status",icon:y(xt)}],U=[{label:"我的用量",key:"/account/usage",icon:y(qe)},{label:"我的明细",key:"/account/records",icon:y(Je)},{label:"API 密钥",key:"/account/keys",icon:y(Go)},{label:"可用模型",key:"/account/models",icon:y(Wo)},{label:"账户设置",key:"/account/settings",icon:y(We)}],K=p(()=>g.value?g.value.is_admin:H.value?!1:t.path.startsWith("/admin")),ee=p(()=>K.value?"管理员":"普通用户"),$=p(()=>{var C;return((C=g.value)==null?void 0:C.username)||"当前账号"});function de(C){const S=C==null?void 0:C.trim();return S?S==="latest"||S==="dev"||S.startsWith("v")?S:`v${S}`:"dev"}const ie=de("0.3.15"),Q=p(()=>{const C=[];return K.value&&(C.push({type:"group",label:"统计中心",key:"admin-group",icon:y(St),children:w}),C.push({type:"group",label:"账号巡检",key:"account-inspection-group",icon:y(Ge),children:I})),C.push({type:"group",label:"我的账户",key:"account-group",icon:y(We),children:U}),C}),Ce=p(()=>K.value?[...w,...I,...U]:U),ue=p(()=>{const C=Ce.value.find(S=>t.path.startsWith(String(S.key)));return C?String(C.key):K.value?"/admin/usage":"/account/usage"}),ve=p(()=>h.value!==null),me=["/admin/records","/account/records"],ze=p(()=>me.some(C=>t.path===C)||h.value!==null&&me.some(C=>h.value===C));function we(C){k!==void 0&&window.clearTimeout(k),k=window.setTimeout(()=>{h.value===C&&(h.value=null)},180)}function u(){R!==void 0&&(window.clearTimeout(R),R=void 0),s.value=!0}function x(){R!==void 0&&window.clearTimeout(R),R=window.setTimeout(()=>{s.value=!1,R=void 0},60)}async function o(C){if(d.value=!1,C==="/account/keys"){window.location.assign(C);return}if(C!==t.path){h.value=C,await _o();try{const S=await r.push(C);Mo(S,Ho.cancelled)&&t.path!==C&&await r.push(C)}finally{we(C)}}}async function f(){await Bo(),O(null),H.value=!0,a.success("已退出登录"),await r.push("/login")}function N(){if(B.value==="system"){_("light");return}if(B.value==="light"){_("dark");return}_("system")}const le=p(()=>B.value==="system"?zt:b.value?wt:kt);return(C,S)=>{const n=Eo("RouterView");return pe(),Se(z(Ye),{class:"app-shell","has-sider":""},{default:E(()=>[i.value?Ue("",!0):(pe(),Se(z(st),{key:0,class:"app-sider",bordered:"",width:228,"collapse-mode":"width"},{default:E(()=>[L("div",Rt,[L("div",Tt,[L("img",{src:z(De),alt:""},null,8,Pt)]),L("div",At,[S[2]||(S[2]=L("strong",null,"CPA-Helper",-1)),L("span",null,oe($.value)+" · "+oe(ee.value),1)])]),M(z(Qe),{class:"sider-menu",value:ue.value,options:Q.value,"root-indent":18,indent:12,"onUpdate:value":o},null,8,["value","options"]),L("div",Nt,[L("a",{class:"sider-version-link",href:jt,target:"_blank",rel:"noreferrer","aria-label":"在 GitHub 查看 CPA-Helper"},[M(z(Y),{component:z(yt),size:20},null,8,["component"]),L("span",_t,oe(z(ie)),1)]),L("div",Mt,[M(z(Pe),{trigger:"hover"},{trigger:E(()=>[M(z(te),{quaternary:"",circle:"","aria-label":"切换主题",onClick:N},{icon:E(()=>[M(z(Y),{component:le.value},null,8,["component"])]),_:1})]),default:E(()=>[S[3]||(S[3]=fe(" 主题 ",-1))]),_:1}),M(z(Pe),{trigger:"hover"},{trigger:E(()=>[M(z(te),{quaternary:"",circle:"","aria-label":"退出登录",onClick:f},{icon:E(()=>[M(z(Y),{component:z(eo)},null,8,["component"])]),_:1})]),default:E(()=>[S[4]||(S[4]=fe(" 退出 ",-1))]),_:1})])])]),_:1})),M(z(Ye),{class:"app-main"},{default:E(()=>[M(z(rt),{class:"mobile-header",bordered:""},{default:E(()=>[M(z(te),{quaternary:"",circle:"","aria-label":"打开导航",onClick:S[0]||(S[0]=he=>d.value=!0)},{icon:E(()=>[M(z(Y),{component:z(Ct)},null,8,["component"])]),_:1}),L("div",Ht,[L("img",{class:"mobile-brand-logo",src:z(De),alt:"","aria-hidden":"true"},null,8,Bt),L("div",Et,[L("div",Ot,[S[5]||(S[5]=L("strong",null,"CPA-Helper",-1)),L("span",Lt,oe(z(ie)),1)]),L("span",null,oe($.value)+" · "+oe(ee.value),1)])]),M(z(te),{quaternary:"",circle:"","aria-label":"切换主题",onClick:z(P)},{icon:E(()=>[M(z(Y),{component:le.value},null,8,["component"])]),_:1},8,["onClick"])]),_:1}),M(z(et),{class:Ro(["content",{"is-route-pending":ve.value,"is-route-transitioning":s.value,"is-records-scroll-mode":ze.value}])},{default:E(()=>[ve.value?(pe(),To("div",$t)):Ue("",!0),M(n,null,{default:E(({Component:he,route:Fe})=>[M(Po,{name:"route-fade",mode:"out-in",appear:"",onBeforeEnter:u,onAfterEnter:x,onEnterCancelled:x,onBeforeLeave:u,onAfterLeave:x,onLeaveCancelled:x},{default:E(()=>[(pe(),Se(Ao(he),{key:Fe.name??Fe.path}))]),_:2},1024)]),_:1})]),_:1},8,["class"])]),_:1}),M(z(Do),{show:d.value,"onUpdate:show":S[1]||(S[1]=he=>d.value=he),placement:"left",width:248},{default:E(()=>[M(z(Uo),{title:`CPA-Helper · ${z(ie)}`,"body-content-style":"padding: 0;"},{default:E(()=>[M(z(Qe),{value:ue.value,options:Q.value,"onUpdate:value":o},null,8,["value","options"]),L("div",Ft,[M(z(te),{secondary:"",onClick:N},{icon:E(()=>[M(z(Y),{component:le.value},null,8,["component"])]),default:E(()=>[S[6]||(S[6]=fe(" 主题 ",-1))]),_:1}),M(z(te),{secondary:"",onClick:f},{icon:E(()=>[M(z(Y),{component:z(eo)},null,8,["component"])]),default:E(()=>[S[7]||(S[7]=fe(" 退出 ",-1))]),_:1})])]),_:1},8,["title"])]),_:1},8,["show"])]),_:1})}}}),nr=jo(Kt,[["__scopeId","data-v-86fee392"]]);export{nr as default};
