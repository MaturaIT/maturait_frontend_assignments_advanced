import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})