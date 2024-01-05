import {
  createRouter,
  createWebHistory,
  type NavigationGuard,
  type RouteRecordRaw
} from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CheckoutPage from '@/views/CheckoutPage.vue'
import ProductPage from '@/views/ProductPage.vue'
import MainVue from '@/views/MainVue.vue'
import SingleProduct from '@/views/SingleProduct.vue'
import WishList from '@/views/WishList.vue'
import ReadyToBuy from '@/views/ReadyToBuy.vue'
import { useStore } from '@/store/Store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    children: [
      { path: '', component: MainVue, name: 'home' },
      {
        path: 'cart',
        component: CheckoutPage,
        name: 'cart'
      },
      { path: 'products', component: ProductPage, name: 'products' },
      { path: 'products/:id', component: SingleProduct, name: 'single product' },
      { path: 'wishlist', name: 'wishlist', component: WishList },
      {
        path: 'checkout',
        name: 'checkout',
        component: ReadyToBuy,
        beforeEnter(to, from, next) {
          const store = useStore()

          if (store.$state.readyToCheckout) {
            next()
          } else {
            next({ name: 'home' })
          }
        }
      }
    ]
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory()
})

export default router
