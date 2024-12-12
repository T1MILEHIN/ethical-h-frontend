import{c as r,r as a,j as t,a as i,a2 as l,B as c}from"./index-CLobNv0F.js";/**
 * @license @tabler/icons-react v3.20.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var u=r("outline","moon","IconMoon",[["path",{d:"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.20.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var m=r("outline","sun","IconSun",[["path",{d:"M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",key:"svg-0"}],["path",{d:"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7",key:"svg-1"}]]);const d=a.forwardRef(({className:e,type:n,...s},o)=>t.jsx("input",{type:n,className:i("flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),ref:o,...s}));d.displayName="Input";function h(){const{theme:e,setTheme:n}=l();return a.useEffect(()=>{const s=e==="dark"?"#020817":"#fff",o=document.querySelector("meta[name='theme-color']");o&&o.setAttribute("content",s)},[e]),t.jsx(c,{size:"icon",variant:"ghost",className:"rounded-full",onClick:()=>n(e==="light"?"dark":"light"),children:e==="light"?t.jsx(u,{size:20,color:"blue"}):t.jsx(m,{size:20,color:"gold"})})}export{d as I,h as T};
