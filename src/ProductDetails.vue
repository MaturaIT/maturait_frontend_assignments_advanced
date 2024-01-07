<template>
  <!-- Loading indicator -->
  <div
    v-if="sharedState.loading"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50"
  >
    <div class="loading-spinner"></div>
  </div>
  <div v-else class="w-screen text-center flex grid grid-cols-1 gap-4 top-20 absolute p-8">
    <img :src="product.image" :alt="product.name" class="w-full h-64 object-contain mb-4" />
    <h2 class="text-2xl font-bold mb-2">{{ product.name }}</h2>
    <p class="text-gray-700 text-base mb-4">{{ product.description }}</p>
    <div class="flex items-center mb-4 grid">
      <span class="text-gray-700 text-base mr-2">${{ product.price }}</span>
      <div class="flex items-center justify-center">
        <font-awesome-icon icon="star" class="text-yellow-500 text-lg" />
        <span class="text-yellow-400 text-xl mr-2"
          >{{ product.rating.rate }} ({{ product.rating.count }})</span
        >
      </div>
    </div>
    <div class="left-1/2">
      <button
        @click="addToCart(product), $emit('item-added')"
        class="font-bold py-2 w-32 rounded bg-blue-500 hover:bg-blue-700 text-main-text"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { LocalStorage } from 'quasar'
import { type SharedState, type Product, type CartItem } from './App.vue'

const product = computed(() => sharedState.products.data[sharedState.productId])
const sharedState = inject('sharedState') as SharedState
const cartItemsCount = ref(sharedState.cartItemsCount)

function addToCart(item: Product) {
  const cartItems = LocalStorage.getItem('cartItems') as CartItem[]
  const existingItemCheck = cartItems
    ? cartItems.find((cartItem: CartItem) => cartItem.id === item.id)
    : null

  if (existingItemCheck) {
    existingItemCheck.quantity++
    LocalStorage.set('cartItems', cartItems)
  } else {
    cartItems.push({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    })
    LocalStorage.set('cartItems', cartItems)
  }

  cartItemsCount.value = sharedState.cartItemsCount
  cartItemsCount.value++
  sharedState.cartItemsCount = cartItemsCount.value
  sharedState.cartItems = cartItems
}
</script>
