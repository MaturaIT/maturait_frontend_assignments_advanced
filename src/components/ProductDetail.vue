<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, defineProps } from 'vue'
import type { Product } from '../utils/types'

const props = defineProps(['id'])
const product = ref<Product | null>(null)

const fetchProduct = async () => {
  try {
    const { data } = await axios.get<Product>(`https://fakestoreapi.com/products/${props.id}`)
    product.value = data
  } catch (error) {
    console.error('Error', error)
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <div v-if="product" class="flex max-w-screen-xl mx-auto mt-8">
    <div class="flex-none w-1/2 pr-8">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-auto rounded-lg object-contain"
        style="max-height: 400px"
      />
    </div>

    <div class="flex-grow">
      <h2 class="text-3xl font-bold mb-4">{{ product.title }}</h2>
      <p class="text-xl font-bold mb-2">Price: {{ product.price }}$</p>
      <p class="text-gray-700 mb-4">{{ product.description }}</p>

      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-blue-900 transition-colors"
      >
        Add to cart
      </button>
    </div>
  </div>
  <div v-else class="text-center text-gray-500 my-8">Loading...</div>
</template>
