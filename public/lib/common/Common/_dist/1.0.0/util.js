!function(e,t,n){"use strict";function a(e){var a=t.createElement("div"),i=t.createDocumentFragment();return a.innerHTML=e,n.each(a.children,function(e,t){i.appendChild(t.cloneNode(!0))}),i}n.util=n.util||{},n.util.img={},n.util.date={},n.util.deparam=function(e){if("string"!=typeof e)return!1;e=e.replace(/^[#\?]/,"");var t={};return e.split("&").forEach(function(e){e=e.split("="),t[e[0]]=e[1]}),t},e.Layzr&&(n.util.img.layzr=new Layzr,n.util.img.layzr.update().check().handlers(!0),t.body.addEventListener("error",function(t){var n=t.target;if("IMG"===n.nodeName){var a=+n.dataset.loadTimes||0;2>a?e.setTimeout(function(){n.src=n.src.split("?")[0]+"?"+Math.random()},600):3>a&&(n.src=n.dataset["default"]||"/Public/Common/_dist/1.0.0/default_cert.png"),n.dataset.loadTimes=a+1}},!0)),n.util.date.format=function(e,t){var n=e;if(!(e instanceof Date))var n=new Date(e||null);return n.setTime(n.getTime()-6e4*n.getTimezoneOffset()),t?n.toJSON().split(".")[0].replace("T"," ").replace(/z/i,""):n.toJSON().split("T")[0].replace(/z/i,"")};var i=e.location.search.match(/.*[\?&]dcode=([^\?=&]+)|/)[1]||"";n.util.post=function(t,a,r,o,c){var s={dcode:i,param:JSON.stringify(a)},l=function(t){t.success?r&&r(t):o?o(t):e.alert(t.message||"提交失败")};return n.post(t,s,l,c)},n.util.postAS=function(t,a,i,r,o){var c=JSON.stringify({param:a,liveTime:0}),s=function(t){0===t.state?i&&i(t):r?r(t):e.alert(t.message||"提交失败")};return o=o||{},o.contentType="application/json;charset=utf-8",n.post(t,c,s,o)},n.util.render=function(t,i,r){var o=n(t)[0];if(o){r=Object.assign({container:"",append:!1,insert:!1,replace:!1},r);var c=r.container||o.dataset.container||t.replace("tmp-",""),s=n(c)[0]||o.parentNode,l=e.doT.compile(o.innerHTML)(i||null).replace(/(^\s+|\s+$)/,"");if(r.append){var u=a(l);s.appendChild(u)}else if(r.insert){var u=a(l);s.insertBefore(u,s.firstChild)}else r.replace?s.outerHTML=l:s.innerHTML=l}}}(window,document,window.$||(window.$={}));