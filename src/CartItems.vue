<template>
  <div class="text-main-text text-center max-w-7xl mx-auto sm:px-5 lg:px-7 flex">
    <div class="ml-auto bg-main-background border border-main-text rounded shadow-md p-4 z-10">
      <ul>
        <li
          v-for="item in cartItems"
          :key="item.id"
          class="grid bg-gray-800 p-4 border border-gray-600 rounded"
        >
          <span>{{ item.name }} ({{ item.quantity }})</span>
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        </li>
        <p v-if="cartItems.length === 0">No items</p>
      </ul>
      <div>
        <p class="absolute py-6" v-if="cartItems && cartItems.length > 0">
          ${{ totalPrice.toFixed(2) }}
        </p>
        <button
          @click="openCheckoutPage"
          class="float-right font-bold py-2 px-4 mt-4 rounded"
          :class="{
            'bg-blue-500 hover:bg-blue-700': cartItems && cartItems.length > 0,
            'disabled bg-gray-700 text-gray-500 cursor-not-allowed':
              !cartItems || cartItems.length === 0
          }"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CartItem, type SharedState } from './App.vue'
import { inject, ref, type Ref } from 'vue'
import { LocalStorage } from 'quasar'

const sharedState = inject('sharedState') as SharedState
const itemAdded = inject('itemAdded') as Ref
const checkout = ref(false)
let totalPrice = ref(0)

const cartItems = ref(
  LocalStorage.getItem('cartItems') ? (LocalStorage.getItem('cartItems') as CartItem[]) : []
)

itemAdded.value = {
  updateCartItems: () => {
    cartItems.value = sharedState.cartItems
    for (const item of cartItems.value) {
      totalPrice.value += item.price
    }
  }
}

if (cartItems.value.length > 0) {
  for (const item of cartItems.value) {
    totalPrice.value += item.price * item.quantity
  }
}

function openCheckoutPage() {
  if (cartItems.value.length > 0) {
    sharedState.showCart = false
    checkout.value = true
    sharedState.list = false
    sharedState.details = false
    sharedState.checkout = checkout.value
  }
}
</script>
