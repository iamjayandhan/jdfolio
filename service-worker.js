self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('portfolio-cache-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/js/main.js',
            ]).catch(error => {
                console.error('Failed to cache resources:', error);
                throw error;
            });
        })
    );
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open('portfolio-cache-v1').then(cache => {
            return cache.match(event.request).then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request).then(fetchResponse => {
                    if (!fetchResponse || fetchResponse.status !== 200) {
                        return fetchResponse;
                    }

                    return cache.put(event.request, fetchResponse.clone()).then(() => {
                        return fetchResponse;
                    });
                });
            });
        })
    );
});
