!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}({0:function(e,t){e.exports=function(){var e={},t=(window.location.host,window.location.href.replace(/(^\w+:|^)\/\//,"")),n=t.indexOf("/baseball")>-1,r=t.indexOf("/mens-basketball")>-1,o=t.indexOf("/soccer")>-1,a=t.indexOf("/womens-basketball")>-1,i=t.indexOf("/softball")>-1,c=t.indexOf("/volleyball")>-1,l=t.indexOf("/roster")>-1,u=t.indexOf("/schedule")>-1,d=t.indexOf("/stats")>-1,s="13cd6P3Ze7bBJugzlQ2Uk2dFWc677wE68ghL94JZcnmI",f="1odoxnNnm3ldZFpND9SDj6JhPXIct60FVJSFvcshX2aw",p="1CjI-KFAmasBUipURvXRtGuu6kWYbrNmo49VPeg7d6Os",b="1zBMYYFRJLLgUu9XKR8voz37o5Nz1dMVAdfy3cj3W_PI",v="1CR7waySsJVjNEq7OuWGA7y1-FXWnE4hsvybYUg9l8cw",m="1qZHyYT_fJE6jajEUjFJK8Z8yKYbu76YnJ9ec3Vzk-KM",h="1tzACDaWtF9Vohd20ooWsTxSyRaAxAKvpnvxmoO6biAI",y="1-RkDZ4YpX4XGFvOL7jgXuCm_rLD843NjzPoWJ-Otnf8";function g(e){l?x(f):u?x(s):d?n?x(p):r?x(b):o?x(v):a?x(y):i?x(m):c&&x(h):x(s)}function O(t){l||u?w(t):d?(w([]),e.includeGridData=!1):w(t+" Current")}function x(t){e.spreadsheetId=t}function w(t){e.range=t}function A(e){g(),O(e)}return A(n?"Baseball":r?"Mens Basketball":o?"Soccer":a?"Womens Basketball":i?"Softball":c?"Volleyball":"All"),e}},10:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);var a=function(e){var t,n=["Jan.","Feb.","Mar.","Apr.","May","June","July","Aug.","Sep.","Oct.","Nov.","Dec."],r=0,o=0,a=0,i=function(e){var t=document.createElement("table");return t.classList.add("display","table","table-striped","table-hover"),t.setAttribute("width","100%"),t.setAttribute("id","responsiveTable"),e.innerHTML="",e.appendChild(t),t}(document.getElementById("data")),c=function(e){var t=document.createElement("thead");return e.appendChild(t),t}(i),l=function(e){var t=document.createElement("tbody");return e.appendChild(t),t}(i),u=e.result.values,d=u.length,s=u[0],f=u.slice(1,d);s[9]="Record",function(e,t){var n=document.createElement("tr");e.appendChild(n);for(var r=0;r<t.length;r++)g(n,t[r])}(c,s);for(var p=0;p<f.length;p++){var b=function(e){var t=e.split(/\//),r=t[1],o=t[0]-1;return n[o]+" "+r},v=f[p],m=v[0],h=v[1],y="";h&&(y=" - "+b(h)),v[0]=b(m)+y,w(l,f[p])}function g(e,t){var n=document.createElement("th");return e.appendChild(n),t+=":",n.innerHTML=t,n}function O(e,t){var n=document.createElement("td");return e.appendChild(n),n.innerHTML=t,n}function x(e,t,n){var r,o=document.createElement("td"),a="Home"==n.trim();return e.appendChild(o),r=a?"#c61f48":"#0f3b63",o.setAttribute("align","center"),o.style.cssText="color:#ffffff;background-color:"+r+";",o.innerHTML=t,o}function w(e,n){var i,c=document.createElement("tr"),l=n[6].trim();"W"==l?r+=1:"L"==l?o+=1:"T"==l&&(a+=1),t=0===a?"":" - "+a,i=""==l?"":r+" - "+o+t,n[9]=i,e.appendChild(c);for(var u=0;u<n.length;u++){var d=n[5];n[u]===n[0]?x(c,n[u],d):O(c,n[u])}return c}};var i=function(){var e=o()();gapi.client.init({apiKey:"AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest"]}).then(function(){gapi.client.sheets.spreadsheets.values.get(e).then(function(e){new Promise(function(t,n){a(e),t()}).then(function(){new Promise(function(e,t){$("#responsiveTable").DataTable({responsive:!0,paging:!1,order:[[1,"asc"]],columnDefs:[{visible:!1,targets:[1,8]}]}),e()}).then(function(){document.querySelector('input[type="search"].form-control').setAttribute("placeholder","Schedule roster...")})})},function(e){console.error("Execute error",e)})})};document.addEventListener("DOMContentLoaded",function(){gapi.load("client",i)})}});