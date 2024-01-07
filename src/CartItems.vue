<template>
  <div class="max-w-7xl mx-auto sm:px-5 lg:px-7 flex justify-between h-16">
    <div
      class="right-0 ml-auto mt-auto bg-main-background border border-main-text rounded shadow-md p-4 z-10"
    >
      <ul>
        <li
          v-for="item in cartItems"
          :key="item.id"
          class="mx-auto bg-gray-800 p-4 justify-between border rounded text-center"
        >
          <span class="text-main-text">{{ item.name }} ({{ item.quantity }})</span>
          <div class="pt-2 flex justify-between">
            <span class="text-main-text">${{ (item.price * item.quantity).toFixed(2) }}</span>
          <font-awesome-icon
            @click="removeFromCart(item)"
            icon="x"
            class="float-right pt-1 text-red-500 cursor-pointer"
          />
          </div>
        </li>
        <p v-if="cartItems.length === 0" class="text-main-text text-center">No items</p>
      </ul>
      <div class="px-2">
        <p class="absolute py-6 text-main-text float-left" v-if="totalPrice > 0">
          ${{ totalPrice.toFixed(2) }}
        </p>
        <button
          class="float-right font-bold py-2 px-4 mt-4 rounded"
          :class="{
            'bg-blue-500 hover:bg-blue-700 text-main-text': cartItems && cartItems.length > 0,
            'disabled bg-gray-800 text-gray-600 cursor-not-allowed':
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

const cartItems = ref(
  LocalStorage.getItem('cartItems') ? (LocalStorage.getItem('cartItems') as CartItem[]) : []
)

let totalPrice = ref(0)

itemAdded.value = {
  updateCartItems: () => {
    cartItems.value = sharedState.cartItems
    for (const item of cartItems.value) {
      totalPrice.value += item.price
    }
  }
}

if (cartItems.value.length > 0) {
  totalPrice.value = 0
  for (const item of cartItems.value) {
    totalPrice.value += item.price * item.quantity
  }
}

function removeFromCart(item: CartItem) {
  const cartItemsUpdated = LocalStorage.getItem('cartItems') as CartItem[]

  const index = cartItemsUpdated.findIndex((obj) => obj.id === item.id)

  if (index !== -1) {
    cartItemsUpdated.splice(index, 1)
  }

  LocalStorage.set('cartItems', cartItemsUpdated)
  cartItems.value = cartItemsUpdated
  totalPrice.value -= item.price * item.quantity
  sharedState.cartItemsCount -= item.quantity
  sharedState.cartItems = cartItemsUpdated
}
</script>
