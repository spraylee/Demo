!function(e,t,n){"use strict";function i(e){var i=t.createElement("div"),r=t.createDocumentFragment();return i.innerHTML=e,n.each(i.children,function(e,t){r.appendChild(t.cloneNode(!0))}),r}n.util=n.util||{},n.util.img={},n.util.date={},n.util.deparam=function(e){if(!e)return!1;e=e.replace(/^[#\?]/,"");var t={};return e.split("&").forEach(function(e){e=e.split("="),t[e[0]]=e[1]}),t},e.Layzr&&(n.util.img.layzr=new Layzr,n.util.img.layzr.update().check().handlers(!0),t.body.addEventListener("error",function(t){var n=t.target;if("IMG"===n.nodeName){var i=+n.dataset.loadTimes||0;2>i?e.setTimeout(function(){n.src=n.src.split("?")[0]+"?"+Math.random()},600):3>i&&(n.src=n.dataset["default"]||"/Public/Common/img/default_cert.png"),n.dataset.loadTimes=i+1}},!0)),n.util.date.format=function(e,t){var n=e;if(!(e instanceof Date))var n=new Date(e||null);return n.setTime(n.getTime()-6e4*n.getTimezoneOffset()),t?n.toJSON().split(".")[0].replace("T"," "):n.toJSON().split("T")[0]},Date.prototype.format=function(e){var t={"(M+)":this.getMonth()+1,"(D+)":this.getDate(),"(h+)":this.getHours(),"(m+)":this.getMinutes(),"(s+)":this.getSeconds(),"(q+)":Math.floor((this.getMonth()+3)/3),"(ms)":this.getMilliseconds()};e=e||"YYYY-MM-DD",/(Y+)/.test(e)&&(e=e.replace(RegExp.$1,this.getFullYear().toString().substr(4-RegExp.$1.length)));for(var n in t)new RegExp(n).test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?t[n]:("00"+t[n]).substr(t[n].toString().length)));return e};var r=e.location.search.match(/.*[\?&]dcode=([^\?=&]+)|/)[1]||"";n.util.post=function(t,i,a,s,o){var l={dcode:r,param:JSON.stringify(i)},c=function(t){t.success?a&&a(t):s?s(t):e.alert(t.message||"提交失败")};return n.post(t,l,c,o)},n.util.postAS=function(t,i,r,a,s){var o=JSON.stringify({param:i,liveTime:0}),l=function(t){0===t.state?r&&r(t):a?a(t):e.alert(t.message||"提交失败")};return s=s||{},s.contentType="application/json;charset=utf-8",n.post(t,o,l,s)},n.util.render=function(t,r,a){var s=n(t)[0];if(s){a=Object.assign({container:"",append:!1,insert:!1,replace:!1},a);var o=a.container||s.dataset.container||t.replace("tmp-",""),l=n(o)[0]||s.parentNode,c=e.doT.compile(s.innerHTML)(r||null).replace(/(^\s+|\s+$)/,"");if(a.append){var u=i(c);l.appendChild(u)}else if(a.insert){var u=i(c);l.insertBefore(u,l.firstChild)}else a.replace?l.outerHTML=c:l.innerHTML=c}}}(window,document,window.$||(window.$={}));