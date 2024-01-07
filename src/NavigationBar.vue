<template>
  <nav class="bg-main-background shadow">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between h-16">
      <div class="flex-shrink-0 flex items-center">
        <p @click="openMainPage" class="text-main-text font-mono text-lg font-bold cursor-pointer  transition duration-300 ease-in-out transform hover:scale-105">MaturaIT Shop</p>
      </div>
      <div class="ml-4 flex items-center md:ml-6 space-x-1 relative transition duration-300 ease-in-out transform hover:scale-105">
        <a
          class="flex border border-main-text rounded cursor-pointer text-main-text"
          @click="toggleCart"
          ref="cart"
        >
          <p v-if="sharedState.cartItemsCount > 0" class="pr-2 pl-4 py-3">
            {{ sharedState.cartItemsCount }}
          </p>
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
import { onClickOutside } from '@vueuse/core'

const sharedState = inject('sharedState') as SharedState
const cartItemsCount = ref(sharedState.cartItemsCount)

const cart = ref(null)

onClickOutside(cart, () => sharedState.showCart = false)

function toggleCart() {
  cartItemsCount.value = sharedState.cartItemsCount
  sharedState.showCart = !sharedState.showCart
}

function openMainPage() {
  sharedState.list = true
  sharedState.details = false
  sharedState.checkout = false
  sharedState.showCart = false
}
</script>
