<script setup lang="ts">
import { useStore } from '@/store/Store'
import ProductCard from '@/components/reusable/ProductCard.vue'
import { watch, ref } from 'vue'
const store = useStore()

const wishlistData = ref(store.$state.wishlist)

watch(
  () => store.$state.wishlist,
  (newList) => {
    wishlistData.value = newList
  }
)
</script>

<template>
  <div class="mx-auto container px-4 md:px-6 2xl:px-0 py-12">
    <div class="flex flex-col gap-8">
      <h1
        class="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white"
      >
        Wishlist
      </h1>
      <p class="text-2xl tracking-tight leading-6 text-gray-600 dark:text-white">
        ({{ store.$state.wishlist.length }}) items
      </p>
      <div v-if="wishlistData.length === 0">
        <h3
          class="text-xl lg:text-2xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white"
        >
          You have no products in wishlist
        </h3>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div
          v-for="(item, index) in wishlistData"
          :key="index"
          class="bg-white shadow rounded overflow-hidden group flex flex-col justify-between"
        >
          <ProductCard :product="item" />
        </div>
      </div>
    </div>
  </div>
</template>
