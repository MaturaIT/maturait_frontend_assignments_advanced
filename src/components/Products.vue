<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import type { Product } from '../utils/types'

const products = ref<Product[]>([])
const searchTerm = ref<String>('')

const fetchProducts = async () => {
  try {
    const { data } = await axios.get<Product[]>('https://fakestoreapi.com/products')

    products.value = data
  } catch (error) {
    console.error('Error', error)
  }
}

const filteredProducts = computed(() => {
  const term = searchTerm.value.toLowerCase()
  return products.value.filter((product) => product.title.toLowerCase().includes(term))
})

const oldPrice = (price: number): number => {
  const increasedPrice = price * 1.1
  return Math.round(increasedPrice * 100) / 100
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div>
    <div class="md:flex md:justify-between md:items-center">
      <h1 class="text-xl font-bold uppercase m-8">Our products</h1>

      <div class="relative md:ml-auto mb-4 md:mb-0">
        <input
          v-model="searchTerm"
          class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
          placeholder="search"
          type="text"
        />
      </div>
    </div>

    <div v-if="products.length === 0" class="text-center text-gray-500 my-8">Loading...</div>
    <div
      v-if="filteredProducts.length === 0 && products.length > 0"
      class="text-center text-gray-500 my-8"
    >
      No result.
    </div>

    <div v-auto-animate class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <router-link
        v-for="product in filteredProducts"
        :key="product.id"
        :to="{ name: 'product-detail', params: { id: product.id } }"
        class="bg-white p-4 border border-slate-300 rounded-lg cursor-pointer transform transition-transform hover:scale-105"
      >
        <div class="aspect-w-1 aspect-h-1 items-center">
          <img
            :src="product.image"
            :alt="product.title"
            class="object-cover rounded-md w-34 h-28 ml-auto mr-auto"
          />
        </div>
        <div class="mt-4 text-center">
          <h3 class="text-md font-semibold mb-2">{{ product.title }}</h3>
          <p class="text-gray-700">
            <span class="line-through text-gray-500">{{ oldPrice(product.price) }}$</span>
            <br />
            <span class="text-red-600">{{ product.price }}$</span>
          </p>
          <p class="text-sm text-gray-700">Rating: {{ product.rating.rate }}/5</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
