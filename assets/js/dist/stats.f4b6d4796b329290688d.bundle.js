!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=12)}({0:function(e,n){e.exports=function(){console.log("SET SHEET PARAMETERS IS FIRED");var e={},n=(window.location.host,window.location.href.replace(/(^\w+:|^)\/\//,"")),t=n.indexOf("/baseball")>-1,o=n.indexOf("/mens-basketball")>-1,r=n.indexOf("/soccer")>-1,i=n.indexOf("/womens-basketball")>-1,l=n.indexOf("/softball")>-1,a=n.indexOf("/volleyball")>-1,s=n.indexOf("/roster")>-1,c=n.indexOf("/schedule")>-1,u=n.indexOf("/stats")>-1,f="13cd6P3Ze7bBJugzlQ2Uk2dFWc677wE68ghL94JZcnmI",d="14pczY6IjNEy3zdqyNRhCZFLfWLEP4Uv3EGwIp7uXrLo",b="1CjI-KFAmasBUipURvXRtGuu6kWYbrNmo49VPeg7d6Os",p="/1zBMYYFRJLLgUu9XKR8voz37o5Nz1dMVAdfy3cj3W_PI",v="1CR7waySsJVjNEq7OuWGA7y1-FXWnE4hsvybYUg9l8cw",y="1qZHyYT_fJE6jajEUjFJK8Z8yKYbu76YnJ9ec3Vzk-KM",O="1tzACDaWtF9Vohd20ooWsTxSyRaAxAKvpnvxmoO6biAI",g="1-RkDZ4YpX4XGFvOL7jgXuCm_rLD843NjzPoWJ-Otnf8";function x(e){s?m(d):c?m(f):u?t?m(b):o?m(p):r?m(v):i?m(g):l?m(y):a&&m(O):m(f)}function h(n){s||c?w(n):u?(w([]),e.includeGridData=!1):w(n+" Current")}function m(n){e.spreadsheetId=n}function w(n){e.range=n}function j(e){x(),h(e)}return j(t?"Baseball":o?"Mens Basketball":r?"Soccer":i?"Womens Basketball":l?"Softball":a?"Volleyball":"All"),console.log(e),e}},12:function(e,n,t){"use strict";t.r(n);var o=t(0),r=t.n(o);t(13);var i=function(){var e=r()();gapi.client.init({apiKey:"AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A",discoveryDocs:["https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest"]}).then(function(){gapi.client.sheets.spreadsheets.get(e).then(function(e){new Promise(function(n,t){for(var o=[],r=e.result.sheets,i=0;i<r.length;i++){var l=r[i].properties.title;o.push(l)}n()}).then(function(){new Promise(function(e,n){$("#responsiveTable").DataTable({responsive:!0,paging:!1,order:[[1,"asc"]]}),e()}).then(function(){document.querySelector('input[type="search"].form-control').setAttribute("placeholder","Search roster...")})})},function(e){console.error("Execute error",e)})})};document.addEventListener("DOMContentLoaded",function(){gapi.load("client",i)})},13:function(e,n){e.exports=function(e){var n={},t=(window.location.host,window.location.href.replace(/(^\w+:|^)\/\//,"")),o=t.indexOf("/baseball")>-1,r=t.indexOf("/mens-basketball")>-1,i=t.indexOf("/soccer")>-1,l=t.indexOf("/womens-basketball")>-1,a=t.indexOf("/softball")>-1,s=t.indexOf("/volleyball")>-1,c=(t.indexOf("/stats"),"1CjI-KFAmasBUipURvXRtGuu6kWYbrNmo49VPeg7d6Os"),u="/1zBMYYFRJLLgUu9XKR8voz37o5Nz1dMVAdfy3cj3W_PI",f="1CR7waySsJVjNEq7OuWGA7y1-FXWnE4hsvybYUg9l8cw",d="1qZHyYT_fJE6jajEUjFJK8Z8yKYbu76YnJ9ec3Vzk-KM",b="1tzACDaWtF9Vohd20ooWsTxSyRaAxAKvpnvxmoO6biAI",p="1-RkDZ4YpX4XGFvOL7jgXuCm_rLD843NjzPoWJ-Otnf8";function v(e){n.spreadsheetId=e}function y(e){n.range=e}function O(e,n){o?v(c):r?v(u):i?v(f):l?v(p):a?v(d):s&&v(b),y(n)}return o?O(0,e):r?O(0,e):i?O(0,e):l?O(0,e):a?O(0,e):s&&O(0,e),console.log(n),n}}});