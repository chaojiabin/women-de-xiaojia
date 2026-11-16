const CACHE='gold-shell-v2';
const SCOPE=new URL(self.registration.scope);
const ASSETS=['./','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>Promise.allSettled(ASSETS.map(path=>fetch(new URL(path,SCOPE),{cache:'reload'}).then(response=>{if(response.ok)return cache.put(new URL(path,SCOPE),response)})))));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('gold-shell-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==SCOPE.origin||!url.pathname.startsWith(SCOPE.pathname)||url.pathname.endsWith('/version.json'))return;
event.respondWith(fetch(request,{cache:'no-store'}).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)))}return response}).catch(async()=>await caches.match(request)|| (request.mode==='navigate'?await caches.match(new URL('./',SCOPE)):null)||Response.error()))});
