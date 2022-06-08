const cache_NAME = 'v1OsloBS';
const cache_FILES = [
    './index.html',
    './css/style.css',
    './js/app.js'
]
// install event
self.addEventListener('install', (e) => { // e = event
    console.log('service worker installed');
    e.waitUntil (
        caches
            .open(cache_NAME) // open stored file
            .then(cache => {
                console.log('SW is caching');
                cache.addAll(cache_FILES); // open all assets
            })
            .then(() => self.skipWaiting())
            .catch(err => console.log(err)) // err = error
    );
});

// ta ut cache filer om det ikke finnes nett
self.addEventListener('fetch', (e) => {
    e.respondWith(
        //neste linje failer om det ikke er nett
        // catcg fångar upp det
        fetch(e.request).catch(() => {
            return caches.match(e.request)
        })
    )
});
