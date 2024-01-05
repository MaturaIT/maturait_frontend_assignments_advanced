<script setup lang="ts">
import ThemeToggler from './darkmode/ThemeToggler.vue'
import { useStore } from '@/store/Store'
import { type Product } from '@/types/product'
import { ref, watch } from 'vue'

const store = useStore()

const wishListData = ref<Product[]>(store.$state.wishlist)
const cartItems = ref<Product[]>(store.$state.cartItems)

watch(
  () => store.$state.wishlist,
  (newWishList) => {
    wishListData.value = newWishList
  }
)

watch(
  () => store.$state.cartItems,
  (newCartData) => {
    cartItems.value = newCartData
  }
)

const isDropdownOpen = ref(false)
</script>

<template>
  <div class="container mx-auto flex items-center justify-between">
    <!-- Website Title and Home Link -->
    <div class="text-2xl font-semibold">
      <router-link to="/">Your E-Commerce</router-link>
    </div>

    <div>
      <ThemeToggler />
    </div>
    <div class="relative cursor-pointer flex">
      <router-link to="/wishlist">
        <svg
          class="w-6 h-6 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 21 19"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
          />
        </svg>
      </router-link>
      <span class="text-sm font-semibold">{{ wishListData.length }}</span>
    </div>

    <div class="relative flex" @click="isDropdownOpen = !isDropdownOpen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-shopping-cart w-6 h-6 mt-2"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span class="text-sm font-semibold">{{ cartItems.length }}</span>

      <!-- Dropdown Content -->
      <div
        v-show="isDropdownOpen"
        class="absolute z-10 top-10 right-0 bg-white shadow-md rounded-lg px-6 py-4 mt-2 min-w-max"
      >
        <div class="flex flex-col gap-8">
          <!-- Cart Items (replace with actual data) -->
          <div v-if="cartItems.length === 0" class="text-sm font-semibold text-gray-500">
            Your cart is empty
          </div>
          <div
            v-else
            v-for="(item, index) in cartItems"
            :key="index"
            class="flex items-center justify-center gap-3 px-4"
          >
            <img :src="item.image" alt="Product" class="w-full h-20 rounded-md" />
            <div class="flex flex-col justify-between items-center">
              <div class="flex gap-2">
                <span class="text-md font-semibold text-yellow-500">
                  {{ item.rating.rate.toFixed(1) }}
                </span>
                <p class="text-gray-900">/</p>
                <span class="text-md font-semibold text-yellow-500">5.0</span>
              </div>
              <p class="text-md text-gray-900 font-semibold border rounded-md px-2 py-1">
                {{ item.price.toFixed(2) }}$
              </p>
            </div>
            <button
              @click="store.onRemove(item)"
              class="text-white bg-blue-600 hover:bg-blue-700 dark:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1"
            >
              Remove
            </button>
          </div>
          <div class="flex items-center justify-center">
            <button
              v-if="cartItems.length > 0"
              class="text-white bg-blue-600 hover:bg-blue-700 dark:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              <router-link to="/cart">Cart</router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
