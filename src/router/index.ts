import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'
import ProductPage from '../views/ProductPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    children: [
      {
        path: 'cart',
        component: CheckoutPage
      },
      { path: 'products', component: ProductPage, name: 'products' }
    ]
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory()
})

export default router
