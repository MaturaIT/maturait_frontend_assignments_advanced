<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import type { Product } from '../utils/types'

const products = ref<Product[]>([])

const fetchProducts = async () => {
  try {
    const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products')

    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold uppercase m-8">Our products</h1>

      <div class="relative">
        <img class="absolute right-4 top-3" src="/search.svg" />
        <input
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          placeholder="search"
          type="text"
        />
      </div>
    </div>
  </div>

  <div v-if="products.length === 0" class="text-center text-gray-500 my-8">Loading...</div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    <router-link
      v-for="product in products"
      :key="product.id"
      :to="{ name: 'product-detail', params: { id: product.id } }"
      class="bg-white p-4 border border-slate-300 rounded-lg cursor-pointer transform transition-transform hover:scale-105"
    >
      <div class="aspect-w-1 aspect-h-1">
        <img
          :src="product.image"
          :alt="product.title"
          class="object-cover rounded-md w-full h-full"
        />
      </div>
      <div class="mt-4">
        <h3 class="text-md font-semibold mb-2">{{ product.title }}</h3>
        <p class="text-gray-700">Price: {{ product.price }}$</p>
      </div>
    </router-link>
  </div>
</template>
