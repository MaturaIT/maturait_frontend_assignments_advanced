<template>
  <div class="bg-gray-100 w-screen absolute top-16">
    <div class="max-w-7xl mx-auto py-6 px-6 lg:px-8">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody
                  v-for="item in cartItems"
                  :key="item.id"
                  class="bg-white divide-y divide-gray-200"
                >
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img class="h-10 w-10 full" :src="item.image" alt="" />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {{ item.name }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ item.quantity }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${{ (item.quantity * item.price).toFixed(2) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <font-awesome-icon
                        @click="removeFromCart(item)"
                        icon="x"
                        class="float-right pt-1 pr-2 text-red-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <div class="text-right">
          <p class="text-sm font-medium text-gray-900">Total: ${{ totalPrice.toFixed(2) }}</p>
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CartItem, type SharedState } from './App.vue'
import { inject, ref } from 'vue'
import { LocalStorage } from 'quasar'

const emit = defineEmits(['cart-empty'])

const sharedState = inject('sharedState') as SharedState

const cartItems = ref(
  LocalStorage.getItem('cartItems') ? (LocalStorage.getItem('cartItems') as CartItem[]) : []
)

let totalPrice = ref(0)

if (cartItems.value.length > 0) {
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

  if (cartItemsUpdated.length === 0) {
    sharedState.list = true
    sharedState.checkout = false
    sharedState.details = false
    emit('cart-empty')
  }
}
</script>
