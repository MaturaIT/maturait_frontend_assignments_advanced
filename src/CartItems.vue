<template>
  <div class="max-w-7xl mx-auto sm:px-5 lg:px-7 flex justify-between h-16">
    <div
      class="right-0 ml-auto mt-auto bg-main-background border border-main-text rounded shadow-md p-4 z-10"
    >
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="mx-auto grid flex bg-gray-800 p-4 justify-between border rounded">
          <span class="text-main-text">{{ item.name }} ({{ item.quantity }})</span>
          <span class="text-main-text">${{ (item.price * item.quantity).toFixed(2) }}</span>
        </li>
        <p v-if="cartItems.length === 0" class="text-main-text text-center">No items</p>
      </ul>
      <div class="px-2">
        <p class="absolute py-6 text-main-text float-left" v-if="totalPrice > 0">${{ totalPrice.toFixed(2) }}</p>
      <button
        :class=checkoutStyle
      >
        Checkout
      </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LocalStorage } from 'quasar'
import { type CartItem } from './App.vue'

const cartItems = computed(() => LocalStorage.getItem('cartItems') ? LocalStorage.getItem('cartItems') as CartItem[] : [])
let totalPrice = 0

if (cartItems.value.length > 0) {
  for (const item of cartItems.value) {
    totalPrice += item.price * item.quantity
  }
}

let checkoutStyle =
  'float-right font-bold py-2 px-4 mt-4 rounded '
checkoutStyle += cartItems.value && cartItems.value.length > 0 ? 'bg-blue-500 hover:bg-blue-700 text-main-text' : 'disabled bg-gray-800 text-gray-600 cursor-not-allowed'; 
</script>
