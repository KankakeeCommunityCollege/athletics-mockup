!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}({0:function(e,t){e.exports=function(){var e={},t=(window.location.host,window.location.href.replace(/(^\w+:|^)\/\//,"")),n=t.indexOf("/baseball")>-1,r=t.indexOf("/mens-basketball")>-1,a=t.indexOf("/soccer")>-1,o=t.indexOf("/womens-basketball")>-1,d=t.indexOf("/softball")>-1,i=t.indexOf("/volleyball")>-1,l=t.indexOf("/roster")>-1,c=t.indexOf("/schedule")>-1,s=t.indexOf("/stats")>-1,u="13cd6P3Ze7bBJugzlQ2Uk2dFWc677wE68ghL94JZcnmI",p="1odoxnNnm3ldZFpND9SDj6JhPXIct60FVJSFvcshX2aw",m="1CjI-KFAmasBUipURvXRtGuu6kWYbrNmo49VPeg7d6Os",f="1zBMYYFRJLLgUu9XKR8voz37o5Nz1dMVAdfy3cj3W_PI",b="1CR7waySsJVjNEq7OuWGA7y1-FXWnE4hsvybYUg9l8cw",v="1qZHyYT_fJE6jajEUjFJK8Z8yKYbu76YnJ9ec3Vzk-KM",h="1tzACDaWtF9Vohd20ooWsTxSyRaAxAKvpnvxmoO6biAI",g="1-RkDZ4YpX4XGFvOL7jgXuCm_rLD843NjzPoWJ-Otnf8";function y(e){l?L(p):c?L(u):s?n?L(m):r?L(f):a?L(b):o?L(g):d?L(v):i&&L(h):L(u)}function E(t){l||c?C(t):s?(C([]),e.includeGridData=!1):C(t+" Current")}function L(t){e.spreadsheetId=t}function C(t){e.range=t}function A(e){y(),E(e)}return A(n?"Baseball":r?"Mens Basketball":a?"Soccer":o?"Womens Basketball":d?"Softball":i?"Volleyball":"All"),e}},11:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(3),d=n.n(o);var i=function(e){function t(e,t){var n=document.createElement("th");return e.appendChild(n),"Image"===t||"Bio"===t||"Intended Major"===t||"High School Coach"===t||"Parents"===t||"Siblings"===t?n.classList.add("none"):("Jersey"===t||"player"===t)&&n.classList.add("all"),t+=":",n.innerHTML=t,n}function n(e,t,n){var a=document.createElement("tr");e.appendChild(a);for(var o=0;o<t.length;o++)r(a,t[o]);return a}function r(e,t,n){var r=document.createElement("td");return"_no-data_"===t&&(t=" "),e.appendChild(r),r.innerHTML=t,r}var a=function(e){var t=document.createElement("table");return t.classList.add("display","table","table-striped","table-hover"),t.setAttribute("width","100%"),t.setAttribute("id","responsiveTable"),e.innerHTML="",e.appendChild(t),t}(document.getElementById("data")),o=function(e){var t=document.createElement("thead");return e.appendChild(t),t}(a),i=function(e){var t=document.createElement("tbody");return e.appendChild(t),t}(a),l=e.result.values,c=l.length,s=l[1],u=l.slice(2,c);d()(e),function(e,n){var r=document.createElement("tr");e.appendChild(r);for(var a=0;a<n.length;a++)t(r,n[a])}(o,s);for(var p=0;p<u.length;p++){var m=u[p],f=m[2],b=f.replace(/[\W_]+/g,""),v=b+"Modal";m[2]='<button type="button" class="btn btn-link buttons__roster--name" data-toggle="modal" data-target="#'+v+'" >'+f+"</button>",n(i,u[p],b)}};var l=function(){var e=a()();gapi.client.init({apiKey:"AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest"]}).then(function(){gapi.client.sheets.spreadsheets.values.get(e).then(function(e){new Promise(function(t,n){i(e),t()}).then(function(){new Promise(function(e,t){$("#responsiveTable").DataTable({responsive:!0,paging:!1,order:[[1,"asc"]]}),e()}).then(function(){document.querySelector('input[type="search"].form-control').setAttribute("placeholder","Search roster...")})})},function(e){console.error("Execute error",e)})})};document.addEventListener("DOMContentLoaded",function(){gapi.load("client",l)})},3:function(e,t){function n(e,t){var n=document.createElement("div"),r=t+"Modal";return n.classList.add("modal","fade"),n.setAttribute("role","dialog"),n.setAttribute("aria-hidden","true"),n.setAttribute("tabindex","-1"),n.setAttribute("aria-labelledby",t),n.setAttribute("id",r),e.appendChild(n),n}function r(e){var t=document.createElement("div");return t.classList.add("modal-dialog","modal-dialog-centered"),t.setAttribute("role","document"),e.appendChild(t),t}function a(e){var t=document.createElement("div");return t.classList.add("modal-content"),e.appendChild(t),t}function o(e){var t=document.createElement("div");return t.classList.add("modal-header"),e.appendChild(t),t}function d(e,t,n){var r=document.createElement("h5"),a=function(){var e=document.createElement("button"),t=document.createElement("span");return t.setAttribute("aria-hidden","true"),t.innerHTML="&times;",e.classList.add("close"),e.setAttribute("type","button"),e.setAttribute("data-dismiss","modal"),e.setAttribute("aria-label","close"),e.appendChild(t),e}();return r.classList.add("modal-title"),r.setAttribute("id",n),r.innerHTML=t+" Bio",e.appendChild(r),e.appendChild(a),r}function i(e,t,n){var r=document.createElement("div");return r.classList.add("modal-body"),r.innerHTML=n.join(""),e.appendChild(r),r}function l(e,t,n){var r=document.createElement("div"),a=document.createElement("img"),o="Photo of player "+e,d="../../uploads/roster-img/"+t+".jpg";return r.classList.add("text-center","float-md-left"),a.setAttribute("alt",o),a.setAttribute("src",d),a.classList.add("roster__img"),r.appendChild(a),n.appendChild(r),n}function c(e,t,n){var r=document.createElement("h6");return r.classList.add("roster__player"),r.innerHTML="#"+t+" "+e,n.appendChild(r),n}function s(e,t){var n=document.createElement("p");return" "==t||"_no-data_"===t?n.innerHTML="":function(e,t){var r=document.createElement("span"),a=document.createElement("strong");n.classList.add("mb-0"),a.innerHTML=e+":",n.appendChild(a),r.innerHTML="&nbsp"+t,n.appendChild(r)}(e,t),n}function u(e){var t=document.createElement("div"),n=document.createElement("button");return t.classList.add("modal-footer"),n.setAttribute("type","button"),n.setAttribute("data-dismiss","modal"),n.classList.add("btn","btn-secondary"),n.innerHTML="Close",t.appendChild(n),e.appendChild(t),e}e.exports=function(e){for(var t=document.getElementById("modalDiv"),p=e.result.values,m=p[1],f=p.length,b=p.slice(2,f),v=0;v<b.length;v++){for(var h=b[v],g=(m[v],h[0].trim()),y=h[1].trim(),E=h[2].trim(),L=E.replace(/[\W_]+/g,""),C=a(r(n(t,L))),A=(d(o(C),E,L),i(C,0,[])),x=(l(E,g,A),c(E,y,A),[]),M=2;M<h.length;M++){var O=h[M],_=s(m[M],O);x.push(_)}!function(e,t){for(var n=document.createElement("p"),r=0;r<e.length;r++){var a=e[r];n.appendChild(a)}t.appendChild(n)}(x,A),u(C)}}}});