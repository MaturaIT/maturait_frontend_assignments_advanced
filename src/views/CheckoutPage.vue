<script setup lang="ts">
import { useStore } from '@/store/Store'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const cartData = ref(store.$state.cartItems)

watch(
  () => store.$state.cartItems,
  (newCart) => {
    cartData.value = newCart
  }
)

function toCheckout() {
  store.changeToCheckout()
  router.push({ path: '/checkout' })
}
</script>

<template>
  <div class="py-6">
    <h1 class="mb-10 text-center text-2xl font-bold dark:text-white">Cart Items</h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div class="rounded-lg md:w-2/3">
        <div
          v-if="cartData.length === 0"
          class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
        >
          <h1
            class="text-2xl lg:text-3xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white"
          >
            You have 0 products in cart
          </h1>
        </div>
        <div
          v-else
          v-for="(item, index) in cartData"
          :key="index"
          class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
        >
          <img
            :src="item.image"
            alt="product image"
            class="w-full rounded-md sm:w-40 object-contain h-40"
          />
          <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
              <h2 class="text-lg font-bold text-gray-900">{{ item.title.trim().slice(0, 20) }}</h2>
            </div>
            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div class="flex items-center border-gray-100">
                <button
                  @click="store.toggleCartItemQuantity(item.id, 'dec')"
                  class="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div
                  class="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none"
                >
                  {{ item.quantity }}
                </div>
                <button
                  @click="store.toggleCartItemQuantity(item.id, 'inc')"
                  class="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex items-center space-x-4">
                <p class="text-md">{{ item.price.toFixed(2) }}$</p>
                <svg
                  @click="store.onRemove(item)"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Sub total -->
      <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div class="mb-2 flex justify-between">
          <p class="text-gray-700">Subtotal</p>
          <p class="text-gray-700">{{ store.totalPrice.toFixed(2) }}$</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-700">Shipping</p>
          <p class="text-gray-700">4.99$</p>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mb-1 text-lg font-bold">{{ (store.totalPrice + 4.99).toFixed(2) }}$</p>
            <p class="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <button
          @click="toCheckout"
          class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>
