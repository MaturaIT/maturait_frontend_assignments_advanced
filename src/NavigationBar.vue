<template>
  <nav class="bg-main-background shadow">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-between h-16">
      <div class="flex-shrink-0 flex items-center">
        <!-- Title with the link to home page-->
        <a href="/" class="text-main-text font-mono text-lg font-bold">MaturaIT Shop</a>
      </div>
      <div class="ml-4 flex items-center md:ml-6 space-x-1 relative">
        <a
          class="flex border border-main-text rounded cursor-pointer text-main-text"
          @click="toggleCart"
        >
          <!-- Display the number of products in the basket next to the icon, 
              to make it a little bit more clear only display the number if there are
              actually items in the cart -->
          <p v-if="sharedState.cartItemsCount > 0" class="pr-2 pl-4 py-3">
            {{ sharedState.cartItemsCount }}
          </p>
          <!-- Shopping cart icon -->
          <font-awesome-icon
            icon="shopping-cart"
            class="text-main-text text-lg pr-4 py-4"
            :class="{ 'pl-4': sharedState.cartItemsCount === 0 }"
          />
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { type SharedState } from './App.vue'

const sharedState = inject('sharedState') as SharedState
const cartItemsCount = ref(sharedState.cartItemsCount)
const showCart = ref(false)

function toggleCart() {
  showCart.value = !showCart.value
  cartItemsCount.value = sharedState.cartItemsCount
  sharedState.showCart = showCart.value
}
</script>
