import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'uno.css'
import App from './App.vue'

// Import route components
import Home from './pages/Home.vue'
import Leaderboard from './pages/Leaderboard.vue'
import Market from './pages/Market.vue'

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Configure routes
const routes = [
  { path: '/', component: Home },
  { path: '/leaderboard', component: Leaderboard },
  { path: '/market', component: Market }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create and mount the app
const app = createApp(App)
app.use(router)
app.mount('#app')
