self.addEventListener('install', function(event){
    console.log('[Service Worker] installing service worker ...', event);
})

self.addEventListener('activate', function(event){
    console.log('[Service Worker] acivating service worker ...', event);
    return self.clients.claim();
})