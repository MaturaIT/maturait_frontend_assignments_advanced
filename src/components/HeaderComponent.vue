<script setup>
import ThemeToggler from './darkmode/ThemeToggler.vue'
import { ref } from 'vue'

const isDropdownOpen = ref(false)

const cartItems = []
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

    <!-- Cart Basket with Number Indicator and Dropdown -->
    <div class="relative cursor-pointer flex" @click="isDropdownOpen = !isDropdownOpen">
      <!-- Cart Icon -->

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
        class="absolute z-10 top-10 right-0 bg-white dark:bg-gray-400 shadow-md rounded-lg px-6 py-4 mt-2"
      >
        <div class="flex flex-col gap-2">
          <!-- Cart Items (replace with actual data) -->
          <div v-for="(item, index) in cartItems" :key="index" class="flex items-center space-x-2">
            <img :src="item.image" alt="Product" class="w-8 h-8 object-cover rounded" />
            <div>
              <p class="text-sm font-semibold">{{ item.name }}</p>
              <p class="text-xs text-gray-500">{{ item.price }}</p>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <button
              class="text-white bg-blue-600 hover:bg-slate-400 dark:text-white dark:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              <router-link to="/cart">Checkout</router-link>
            </button>
          </div>
        </div>
        <!-- <div v-else class="text-sm font-semibold text-gray-500">Your cart is empty</div> -->
      </div>
    </div>
  </div>
</template>
