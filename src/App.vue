<template>
  <div>
    <NavigationBar />
    <CartItems v-if="sharedState.showCart && !sharedState.checkout" />
    <Transition name="fade">
      <ProductList v-if="sharedState.list" />
    </Transition>
    <ProductDetails @item-added="update" v-if="sharedState.details" />
    <CheckoutPage v-if="sharedState.checkout" />
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, ref, type Ref } from 'vue'
import { LocalStorage } from 'quasar'
import { useQuery } from 'vue-query'

import ProductDetails from './ProductDetails.vue'
import NavigationBar from './NavigationBar.vue'
import CheckoutPage from './CheckoutPage.vue'
import ProductList from './ProductList.vue'
import CartItems from './CartItems.vue'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: {
    rate: number
    count: number
  }
  description: string
}

export interface SharedState {
  showCart: boolean
  loading: boolean
  list: boolean
  details: boolean
  checkout: boolean
  productId: number
  products: {
    data: Product[]
  }
  cartItems: CartItem[]
  cartItemsCount: number
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

const cartItems = LocalStorage.getItem('cartItems') as CartItem[]

if (!cartItems) LocalStorage.set('cartItems', [])

const cartItemsCount = () => {
  if (cartItems.length > 0) {
    let items = 0
    for (const item of cartItems) {
      items += item.quantity
    }
    return items
  }
  return 0
}

const itemAdded: Ref<null | { updateCartItems: () => void }> = ref(null)
const loading = ref(false)

const sharedState = reactive({
  showCart: false,
  loading: loading,
  list: true,
  details: false,
  checkout: false,
  productId: 0,
  products: useQuery(
    'products',
    async () => {
      toggleLoading()
      const response = await fetch('https://fakestoreapi.com/products')
      const responseData = await response.json()
      let products = [] as Product[]
      for (const product of responseData) {
        products.push({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.image,
          rating: {
            rate: product.rating.rate,
            count: product.rating.count
          },
          description: product.description
        })
      }
      toggleLoading()
      return products
    },
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 24 * 60 * 60 * 1000
    }
  ),
  cartItems: cartItems,
  cartItemsCount: cartItemsCount(),
  totalCartPrice: 0
})

provide('sharedState', sharedState)
provide('itemAdded', itemAdded)

function toggleLoading() {
  loading.value = !loading.value
}

function update() {
  if (itemAdded.value) {
    itemAdded.value.updateCartItems()
  }
}
</script>

<style>
.fade-enter-active {
  transition: all 0.2s ease-out;
}

.fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.7, 0.9, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
