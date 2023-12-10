import { createApp } from 'vue'
import VueRouter from 'vue-router'
import '@/index.css'

import App from '@/App.vue'
import HomePage from '@/pages/HomePage.vue'

const routes = [
  { path: '/', component: HomePage },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
