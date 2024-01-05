<script setup lang="ts">
import ThemeToggler from './darkmode/ThemeToggler.vue'
import { useStore } from '@/store/Store'
import { type Product } from '@/types/product'
import { ref, watch } from 'vue'
const store = useStore()

const wishListData = ref<Product[]>(store.$state.wishlist)

watch(
  () => store.$state.wishlist,
  (newWishList) => {
    wishListData.value = newWishList
  }
)

const isDropdownOpen = ref(false)
const isWishlistOpen = ref(false)

const cartItems: any = []
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
    <div class="relative cursor-pointer flex" @click="isWishlistOpen = !isWishlistOpen">
      <svg
        class="border-white cursor-pointer"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fill-rule="evenodd"
        clip-rule="evenodd"
      >
        <path
          d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
        />
      </svg>
      <span class="text-sm font-semibold">{{ wishListData.length }}</span>

      <!-- Dropdown Content -->
      <div
        v-show="isWishlistOpen"
        class="absolute z-10 top-10 right-0 bg-white dark:bg-gray-400 shadow-md rounded-lg px-6 py-4 mt-2"
      >
        <div class="flex flex-col gap-2">
          <!-- Cart Items (replace with actual data) -->
          <div
            v-for="(item, index) in wishListData"
            :key="index"
            class="flex items-center space-x-2"
          >
            <img :src="item.image" alt="Product" class="w-8 h-8 object-cover rounded" />
            <div>
              <p class="text-sm font-semibold">{{ item.price }}</p>
              <p class="text-xs text-gray-500">{{ item.price }}</p>
            </div>
          </div>
        </div>
        <!-- <div v-else class="text-sm font-semibold text-gray-500">Your cart is empty</div> -->
      </div>
    </div>

    <div class="relative cursor-pointer flex" @click="isDropdownOpen = !isDropdownOpen">
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
