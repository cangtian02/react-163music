"use strict";var precacheConfig=[["/index.html","392371254d4b04046b75c2070150bd94"],["/static/css/main.da246d30.css","fcdbfdc416699a1b96fbabec15c6def0"],["/static/js/0.8d4baa8b.chunk.js","f8e853160425c2fc378a5c60bf692c86"],["/static/js/1.c91f40c9.chunk.js","4889c608f14daa2cdc643676ac0017bd"],["/static/js/2.35fddcb2.chunk.js","cf259102bea0f96de96107f0935375d1"],["/static/js/3.08c1631c.chunk.js","449fa0b9a6655f4503f09303acac8f24"],["/static/js/4.41a6c018.chunk.js","f69bd5f77e69beb05fbd2eb844a697f1"],["/static/js/main.4f52e592.js","bfc4841b699d137a6baacfc62f6622d9"],["/static/media/disc.69796123.png","69796123ad7cfe95781ea38aac8f2d48"],["/static/media/disc_ani.996fc8a2.png","996fc8a2bc62e1ab3f51f135fc459577"],["/static/media/iconfont.2a5be09d.eot","2a5be09d85f5b02e60922038db412d26"],["/static/media/iconfont.3a8527eb.svg","3a8527eb08e50786275d1eff1d97bb6e"],["/static/media/iconfont.52648fdb.ttf","52648fdb6c02ddfcef113adbf85ba98d"],["/static/media/sub_nav.ff107eb6.png","ff107eb66379667d040a2ddb54c182d6"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});