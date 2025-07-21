import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import Home from './pages/Home.vue'
import { createWebHistory, createRouter } from 'vue-router'
import Goals from './pages/GoalsPage.vue'
import Transaction from './pages/TransactionPage.vue'
import App from './App.vue'
import Chart from './pages/Chart.vue'
import Split from './pages/Split.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/goals', component: Goals },
  { path: '/transaction', component: Transaction },
  { path: '/chart', component: Chart },
  { path: '/split', component: Split}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(router).use(pinia).mount('body')
