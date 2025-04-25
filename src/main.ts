import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'uno.css'
import App from './App.vue'

// Import route components
import Home from './pages/Home.vue'
import Leaderboard from './pages/Leaderboard.vue'
import Market from './pages/Market.vue'

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
