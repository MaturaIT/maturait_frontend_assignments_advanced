<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, defineProps } from 'vue'
import type { Product } from '../utils/types'

const props = defineProps(['id', 'addToCart'])
const product = ref<Product | null>(null)

const fetchProduct = async () => {
  try {
    const { data } = await axios.get<Product>(`https://fakestoreapi.com/products/${props.id}`)
    product.value = data
  } catch (error) {
    console.error('Error', error)
  }
}

const handleAddToCart = () => {
  if (product.value) {
    props.addToCart(product.value)
  }
}

const oldPrice = (price: number): number => {
  const increasedPrice = price * 1.1
  return Math.round(increasedPrice * 100) / 100
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <div v-auto-animate>
    <div v-if="product" class="flex flex-col md:flex-row max-w-screen-xl mx-auto mt-8">
      <div class="flex-none w-1/2 pr-8">
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-auto rounded-lg object-contain"
          style="max-height: 400px"
        />
      </div>

      <div class="flex-grow md:w-full lg:w-1/2">
        <h2 class="text-3xl font-bold mb-4">{{ product.title }}</h2>
        <div class="flex flex-col text-xl font-bold mb-2">
          <p class="text-xl font-bold mb-2">Price:</p>
          <span class="line-through text-gray-500 mb-2 md:ml-2">
            {{ oldPrice(product.price) }}$</span
          >
          <span class="text-red-600 mb-2 md:ml-2"> {{ product.price }}$</span>
        </div>
        <div class="flex items-center mb-2">
          <p class="text-gray-500 font-bold mb-2">Rating: {{ product.rating.rate }}/5</p>
          <img src="/star.ico" alt="rating" class="w-4 h-4 mr-1 mb-2" />
        </div>
        <p class="text-gray-700 mb-4">{{ product.description }}</p>

        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-blue-900 transition-colors"
          @click="handleAddToCart"
        >
          Add to cart
        </button>
        <div class="flex"></div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 my-8">Loading...</div>
  </div>
</template>
