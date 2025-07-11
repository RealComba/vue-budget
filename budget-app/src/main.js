import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import Home from './pages/Home.vue'
import { createWebHistory, createRouter } from 'vue-router'
import Goals from './pages/GoalsPage.vue'
import Transaction from './pages/TransactionPage.vue'
import App from './App.vue'
import Chart from './pages/Chart.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/goals', component: Goals },
  { path: '/transaction', component: Transaction },
  { path: '/chart', component: Chart },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('body')
