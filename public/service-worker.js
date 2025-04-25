// Cache name - update this to force refresh of cache
const CACHE_NAME = 'fishing-game-cache-v2';

// Basic URLs to always cache
const INITIAL_URLS = [
  '/',
  '/index.html',
  '/fish-icon.svg',
  '/vite.svg',
  // Add explicit route paths for the SPA
  '/leaderboard',
  '/market'
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing');

  // Skip waiting to activate immediately
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching initial files');
        return cache.addAll(INITIAL_URLS);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating');

  // Take control of all clients immediately
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              console.log('Service Worker: Clearing old cache', name);
              return caches.delete(name);
            }
          })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ])
  );
});

// Helper function to check if URL matches assets we want to cache
function shouldCache(url) {
  const assetRegex = /\.(js|css|svg|png|jpg|jpeg|gif|ico)$/;
  return url.startsWith('http') && (
    url.includes('/assets/') ||
    assetRegex.test(url) ||
    INITIAL_URLS.includes(new URL(url).pathname)
  );
}

// Helper to check if a request is a navigation request for a route in our SPA
function isSPARoute(request) {
  // If it's not a navigation request, it's not a SPA route
  if (request.mode !== 'navigate') {
    return false;
  }

  // Check if the URL path is one of our SPA routes
  const url = new URL(request.url);
  const path = url.pathname;

  // These are the routes in your Vue Router
  const spaRoutes = ['/', '/leaderboard', '/market'];

  return spaRoutes.includes(path);
}

// Fetch event - respond with cached content when offline
self.addEventListener('fetch', (event) => {
  // Skip non-HTTP(S) requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Handle SPA navigation routes specially to support client-side routing
  if (isSPARoute(event.request)) {
    event.respondWith(
      caches.match('/index.html')
        .then(response => {
          return response || fetch(event.request);
        })
        .catch(() => {
          return caches.match('/index.html');
        })
    );
    return;
  }

  // Cache-first strategy for assets - check cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          console.log('Service Worker: Serving from cache:', event.request.url);
          return response;
        }

        // Clone the request - request can only be used once
        const fetchRequest = event.request.clone();

        // Make network request and cache the response
        return fetch(fetchRequest)
          .then((response) => {
            // Don't cache responses with error status codes
            if (!response || response.status !== 200) {
              return response;
            }

            try {
              // Check if this is an asset we should cache
              if (shouldCache(event.request.url)) {
                // Clone the response - response can only be used once
                const responseToCache = response.clone();

                caches.open(CACHE_NAME)
                  .then((cache) => {
                    console.log('Service Worker: Caching asset:', event.request.url);
                    cache.put(event.request, responseToCache);
                  })
                  .catch(err => {
                    console.error('Cache put error:', err);
                  });
              }
            } catch (err) {
              console.error('Caching error:', err);
            }

            return response;
          })
          .catch((error) => {
            console.log('Service Worker: Fetch failed:', error);

            // For navigation requests, return the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }

            // For other failed requests, return a simple error response
            return new Response('Network error happened', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}); 