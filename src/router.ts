// router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ProductListPage from '@/views/ProductListPage.vue';
import ProductDetailsPage from '@/views/ProductDetailsPage.vue';
import CheckoutPage from '@/views/CheckoutPage.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: ProductListPage },
  { path: '/products/:id', name: 'product-details', component: ProductDetailsPage, props: true },
  { path: '/category/:category', component: ProductListPage, props: true },
  { path: '/checkout', component: CheckoutPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
