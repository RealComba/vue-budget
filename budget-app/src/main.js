import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import Home from './pages/Home.vue'
import { createWebHistory, createRouter } from 'vue-router'
import Goals from './pages/GoalsPage.vue'
import App from './App.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/goals', component: Goals },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
