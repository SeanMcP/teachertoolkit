var CACHE_NAME = 'teacher-toolkit-v0';
var urlsToCache = [
    '/',
    '/assets/styles/main.css',
    '/easy-grader/index.html',
    '/easy-grader/main.js',
    '/easy-grader/styles.css'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});
