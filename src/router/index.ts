import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes: RouteRecordRaw[] = [{ path: '/', component: HomePage }]

const router = createRouter({
  routes: routes,
  history: createWebHistory()
})

export default router
