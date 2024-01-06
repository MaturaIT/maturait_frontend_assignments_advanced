<template>
  <!-- Loading indicator -->
  <div v-if="loading" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div class="loading-spinner"></div>
  </div>
  <div v-else>
    <ul class="w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 top-20 absolute p-8">
      <div class="absolute left-1/4 w-1/2">
        <!-- Search bar for products -->
        <input
          class="shadow-md text-center bg-white rounded-lg w-full"
          type="text"
          v-model="search"
          placeholder="Search"
        />
      </div>
      <li
        v-for="product in filteredProducts"
        :key="product.name"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="h-64 transform scale-100 object-contain mx-auto p-4"
        />
        <div class="flex flex-col relative h-48">
          <div class="p-4 relative">
            <h2 class="text-sm font-semibold text-gray-900">{{ product.name }}</h2>
          </div>
          <div class="p-4 absolute bottom-0">
            <p class="mt-1 text-gray-700">${{ product.price }}</p>
            <div class="flex items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 12.585l-4.417 2.695 1.06-4.923L2.93 7.715l4.923-.426L10 2.93l2.147 4.358 4.923.426-3.713 3.642 1.06 4.923z"
                />
              </svg>
              <span class="ml-1 text-gray-700">{{ product.rating }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

interface Product {
  name: string
  price: number
  image: string
  rating: number
}

const store = useStore()

let products = ref([] as Product[])
let loading = ref(false)
const search = ref('')

function incrementCartItems() {
  store.commit('incrementCartItems')
}

function toggleLoading() {
  loading.value = !loading.value
}

async function fetchData() {
  toggleLoading()
  const response = await fetch('https://fakestoreapi.com/products')
  const responseData = await response.json()
  for (const product of responseData) {
    products.value.push({
      name: product.title,
      price: product.price,
      image: product.image,
      rating: product.rating.rate
    })
  }
  toggleLoading()
}

fetchData()

const filteredProducts = computed(() =>
  products.value.filter((item) =>
    item.name.toLocaleLowerCase().includes(search.value.toLowerCase())
  )
)
</script>

<style>
.loading-spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
