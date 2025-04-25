// Cache name - update this to force refresh of cache
const CACHE_NAME = 'fishing-game-cache-v1';

// List of resources to cache for offline use
const CACHE_URLS = [
  '/',
  '/index.html',
  '/app.js',
  '/main.js',
  '/assets/css/main.css',
  '/assets/images/logo.png',
  // Add other important assets, routes, and resources
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Now controlling active clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - respond with cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request - request can only be used once
        const fetchRequest = event.request.clone();

        // Make network request and cache the response
        return fetch(fetchRequest)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response - response can only be used once
            const responseToCache = response.clone();

            // Add response to cache for future offline use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If network request fails and we don't have a cache match, 
            // return a fallback page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }

            // Could return a default offline image or other fallback here
            return new Response('Network error happened', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
}); 