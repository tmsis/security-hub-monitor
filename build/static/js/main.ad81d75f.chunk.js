(this["webpackJsonppolicy-infraction-monitor"]=this["webpackJsonppolicy-infraction-monitor"]||[]).push([[0],{177:function(e,t){},193:function(e,t,a){e.exports=a(330)},200:function(e,t,a){},312:function(e,t){},313:function(e,t){},330:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(179),c=(a(200),a(9)),i=a(185),o=a(113),u=a(82),s=a.n(u),f=a(184);var m=function(){var e=Object(n.useState)([]),t=Object(c.a)(e,2),a=t[0],l=t[1],u=Object(n.useState)([]),m=Object(c.a)(u,2),d=m[0],b=m[1],v=Object(n.useState)([]),h=Object(c.a)(v,2),g=h[0],p=h[1],E=Object(n.useState)([]),S=Object(c.a)(E,2),O=S[0],j=S[1],y=Object(n.useState)([]),C=Object(c.a)(y,2),w=C[0],F=C[1],L=Object(n.useState)([]),N=Object(c.a)(L,2),A=N[0],I=N[1],R=Object(n.useState)([]),T=Object(c.a)(R,2),k=T[0],x=T[1],H=Object(n.useState)({}),M=Object(c.a)(H,2),D=M[0],W=M[1],B=Object(n.useState)({}),P=Object(c.a)(B,2),G=P[0],J=P[1],U=Object(n.useState)([]),$=Object(c.a)(U,2),_=$[0],q=$[1],z=Object(n.useState)({}),K=Object(c.a)(z,2),Q=K[0],V=K[1],X=function(e,t){var a=t?t.name:e.target.name,n=t?e:[e.target];Q[a]=n.map((function(e){return e.value})),G[a]=n,J(G),V(Q),Y()},Y=function(){for(var e=g,t=!1,a=function(a){for(var n=d[a],r=[],l=function(a){var l=Q[n][a].toLowerCase();if(!l)return"continue";t=!0;var c=e.filter((function(e){return e[n].toLowerCase().includes(l)}));r=r.concat(c)},c=0;c<Q[n].length;c++)l(c);t?(t=!1,e=r):e=e.concat(r)},n=0;n<d.length;n++)a(n);Z(e)},Z=function(e){var t=Q.Search[0].toLowerCase();if(t){for(var a=[],n=function(n){var r=d[n],l=e.filter((function(e){return e[r].toLowerCase().includes(t)}));a=a.concat(l)},r=0;r<d.length;r++)n(r);e=a}q(e);var l=Object.values(e.reduce((function(e,t){var a=t.Title;return e[a]?e[a].value+=1:e[a]={id:a,value:1},e}),{}));F(l);var c=Object.values(e.reduce((function(e,t){var a=t["Severity Label"];return e[a]?e[a].value+=1:e[a]={id:a,value:1},e}),{}));x(c)},ee=function(){return r.a.createElement(i.a,{data:k,innerRadius:.5,padAngle:.7,cornerRadius:3,colors:function(e){switch(e.id){case"LOW":return"#ffffcc";case"MEDIUM":return"#ffeda0";case"HIGH":return"#fed976";case"CRITICAL":return"#feb24c"}},borderWidth:1,borderColor:{from:"color",modifiers:[["darker",.2]]},enableArcLinkLabels:!1,className:"pie"})},te=function(){return r.a.createElement(s.a,{pagination:!0,highlightOnHover:!0,columns:O,data:w,defaultSortAsc:!1,defaultSortField:"value",className:"datatable",title:"Findings by title"})},ae=function(){return r.a.createElement(s.a,{pagination:!0,highlightOnHover:!0,columns:A,data:k,defaultSortAsc:!1,defaultSortField:"value",className:"datatable",title:"Findings by severity",conditionalRowStyles:ne})},ne=[{when:function(e){return"LOW"===e.id},style:{backgroundColor:"#ffffcc"}},{when:function(e){return"MEDIUM"===e.id},style:{backgroundColor:"#ffeda0"}},{when:function(e){return"HIGH"===e.id},style:{backgroundColor:"#fed976"}},{when:function(e){return"CRITICAL"===e.id},style:{backgroundColor:"#feb24c"}}],re=function(){return r.a.createElement(s.a,{pagination:!0,highlightOnHover:!0,columns:a,data:_,className:"datatable",title:"All findings"})},le=function(e){var t=e.name;return r.a.createElement("div",{className:"field"},r.a.createElement("label",{htmlFor:t},t,":"),r.a.createElement(f.a,{isMulti:!0,name:t,options:D[t],className:"basic-multi-select",classNamePrefix:"select",value:G[t],onChange:X}))};return r.a.createElement("div",null,r.a.createElement("form",{id:"form"},r.a.createElement("div",{className:"field"},r.a.createElement("label",{htmlFor:"File"},"File:"),r.a.createElement("input",{type:"file",accept:".csv,.xlsx,.xls",onChange:function(e){var t=e.target.files[0],a=new FileReader;a.onload=function(e){var t=e.target.result,a=o.read(t,{type:"binary"}),n=a.SheetNames[0],r=a.Sheets[n];!function(e){for(var t=e.split(/\r\n|\n/),a=t[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/),n=[],r=1;r<t.length;r++){var c=t[r].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);if(a&&c.length===a.length){for(var i={},o=0;o<a.length;o++){var u=c[o];u.length>0&&('"'===u[0]&&(u=u.substring(1,u.length-1)),'"'===u[u.length-1]&&(u=u.substring(u.length-2,1))),a[o]&&(i[a[o]]=u)}Object.values(i).filter((function(e){return e})).length>0&&n.push(i)}}for(var s={},f=function(e){var t=a[e];s[t]=Array.from(new Set(n.map((function(e){return e[t]})))),Q[t]=[""]},m=0;m<a.length;m++)f(m);Q.Search=[""];var d={};for(var v in s)d[v]=s[v].map((function(e){return{label:e,value:e}}));var h=a.map((function(e){return{name:e,selector:e}}));p(n),V(Q),b(a),l(h),j([{name:"Title",selector:"id",sortable:!0,width:"80%"},{name:"# resources affected",selector:"value",sortable:!0}]),I([{name:"Severity",selector:"id",sortable:!0},{name:"# resources affected",selector:"value",sortable:!0}]),W(d),Z(n)}(o.utils.sheet_to_csv(r,{header:1}))},a.readAsBinaryString(t)},required:!0,name:"File"})),r.a.createElement("div",{className:"field"},r.a.createElement("label",{htmlFor:"Search"},"Search:"),r.a.createElement("input",{type:"search",name:"Search",placeholder:"Type to filter all fields",onChange:X})),r.a.createElement(le,{name:"Team"}),r.a.createElement(le,{name:"AWS Account ID"}),r.a.createElement(le,{name:"Compliance Status"}),r.a.createElement(le,{name:"Severity Label"}),r.a.createElement(le,{name:"Resource Type"}),r.a.createElement(le,{name:"Record State"}),r.a.createElement("button",{type:"reset"},"Reset")),r.a.createElement("div",{className:"half"},r.a.createElement(te,null)),r.a.createElement("div",{className:"twosixths"},r.a.createElement(ae,null)),r.a.createElement("div",{className:"onesixth pie",style:{height:300}},r.a.createElement(ee,null)),r.a.createElement("div",{className:"full"},r.a.createElement(re,null)))},d=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,368)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,l=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),l(e),c(e)}))};Object(l.render)(r.a.createElement(m,null),document.getElementById("root")),d()}},[[193,1,2]]]);
//# sourceMappingURL=main.ad81d75f.chunk.js.map