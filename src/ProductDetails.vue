<template>
  <!-- Loading indicator -->
  <div
    v-if="sharedState.loading"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50"
  >
    <div class="loading-spinner"></div>
  </div>
  <div v-else class="text-center flex grid grid-cols-1 gap-4 top-20 absolute p-8">
    <img :src="test.image" :alt="test.name" class="w-full h-64 object-contain mb-4" />
    <h2 class="text-2xl font-bold mb-2">{{ test.name }}</h2>
    <p class="text-gray-700 text-base mb-4">{{ test.description }}</p>
    <div class="flex items-center mb-4 grid">
      <span class="text-gray-700 text-base mr-2">${{ test.price }}</span>
      <div class="flex items-center justify-center">
        <font-awesome-icon icon="star" class="text-yellow-500 text-lg" />
        <span class="text-yellow-400 text-xl mr-2"
          >{{ test.rating.rate }} ({{ test.rating.count }})</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useStore } from 'vuex'
import { type SharedState } from './App.vue'

const store = useStore()
const sharedState = inject('sharedState') as SharedState

const test = computed(() => sharedState.products.data[4])

function incrementCartItems() {
  store.commit('incrementCartItems')
}
</script>
