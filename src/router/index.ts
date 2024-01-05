import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import MainVue from '@/views/MainVue.vue'
import SingleProduct from '@/views/SingleProduct.vue'
import WishList from '@/views/WishList.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    children: [
      { path: '', component: MainVue },
      {
        path: 'cart',
        component: CheckoutPage,
        name: 'cart'
      },
      { path: 'products', component: ProductPage, name: 'products' },
      { path: 'products/:id', component: SingleProduct, name: 'single product' },
      { path: 'wishlist', name: 'wishlist', component: WishList }
    ]
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory()
})

export default router
