import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import ProductDetailsPage from './pages/ProductDetailsPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetailsPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})