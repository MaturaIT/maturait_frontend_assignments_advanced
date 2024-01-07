import { createRouter, createWebHistory } from 'vue-router'
import Products from './components/Products.vue'
import ProductDetail from './components/ProductDetail.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Products },
    { path: '/product/:id', name: 'product-detail', component: ProductDetail, props: true }
  ]
})
