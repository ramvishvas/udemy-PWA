const swListener = self.addEventListener;

const STATIC_NAME = 'static-v1';
const DYNAMIC_NAME = 'dynamic-v1';

const STATIC_CACHED = [
    '/',
    '/index.html',
    '/src/css/app.css',
    '/src/css/main.css',
    '/src/css/dynamic.css',
    '/src/js/material.min.js',
    '/src/js/main.js'
];

swListener('install', event => {
    console.log('[Service Worker] Installing Service Worker ...');
    event.waitUntil(
        caches.open(STATIC_NAME).then(cache => {
            console.log('[Service Worker] Pre Caching App Shell');
            cache
                .addAll(STATIC_CACHED)
                .then(() => {
                    console.log('[Service Worker] Statis Items Cached!');
                })
                .catch(err => {
                    console.error(err);
                });
        })
    );
});

swListener('activate', event => {
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(
                keyList.map(function(key) {
                    if (key !== STATIC_NAME && key !== DYNAMIC_NAME) {
                        console.log('[Service Worker] Cached Removed: ', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    console.log('[Service Worker] Activating Service Worker ....', event);
    return self.clients.claim();
});

swListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            } else {
                return fetch(event.request)
                    .then(res => {
                        return caches.open(DYNAMIC_NAME).then(cache => {
                            cache.put(event.request.url, res.clone());
                            return res;
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        })
    );
});
