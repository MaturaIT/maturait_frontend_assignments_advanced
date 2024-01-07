<template>
  <notifications position="bottom right" width="200" />
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
    <div class="flex grid place-items-center">
      <button
        @click="
          addToCart(product),
            $emit('item-added'),
            notify({
              type: 'success',
              title: 'Added item to cart!'
            })
        "
        class="font-bold py-2 w-32 rounded bg-blue-500 hover:bg-blue-700 text-main-text mb-4 transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        Add to cart
      </button>
      <font-awesome-icon
        @click="toggleFavorites(product.id), $emit('item-added')"
        icon="heart"
        class="text-5xl hover:text-red-500 transition duration-300 ease-in-out flex-row transform hover:-translate-y-1 cursor-pointer"
        :class="{
          'text-red-500': sharedState.favorites.includes(product.id),
          'text-gray-600': !sharedState.favorites.includes(product.id)
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type SharedState, type Product, type CartItem } from './App.vue'
import { notify } from '@kyvg/vue3-notification'
import { computed, inject, ref } from 'vue'
import { LocalStorage } from 'quasar'

const product = computed(() => sharedState.products.data[sharedState.productId])
const sharedState = inject('sharedState') as SharedState
const cartItemsCount = ref(sharedState.cartItemsCount)
const favoritesRef = ref(sharedState.favorites)

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

function toggleFavorites(id: number) {
  const favorites = LocalStorage.getItem('favorites') as number[]
  const index = favorites.indexOf(id)

  if (index !== -1) {
    favorites.splice(index, 1)
    notify({
      type: 'warn',
      title: 'Removed item from favorites!'
    })
  } else {
    favorites.push(id)
    notify({
      type: 'success',
      title: 'Added item to favorites!'
    })
  }

  LocalStorage.set('favorites', favorites)
  sharedState.favorites = favorites
  favoritesRef.value = favorites
}
</script>
