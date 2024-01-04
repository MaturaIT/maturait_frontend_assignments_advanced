<script setup lang="ts">
import { ref } from 'vue'
import { topArrival } from '@/fetch/useFetch'
import { useQuery } from 'vue-query'
import { type Product } from '@/types/product'
import LoaderComponent from '@/components/reusable/LoaderComponent.vue'
import ErrorComponent from '@/components/reusable/ErrorComponent.vue'
import ProductCard from '../reusable/ProductCard.vue'

const numberOfItemsFetched = ref<number>(4)

const { isLoading, isError, data } = useQuery<Product[]>(['topArrival', numberOfItemsFetched], () =>
  topArrival(numberOfItemsFetched.value)
)
</script>
<template>
  <div class="container pb-16">
    <h2 class="text-2xl font-medium text-gray-800 dark:text-white uppercase mb-6 mt-2">
      top new arrival
    </h2>
    <span v-if="isLoading">
      <LoaderComponent />
    </span>
    <span v-if="isError">
      <ErrorComponent />
    </span>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div
        class="bg-white shadow rounded overflow-hidden group flex flex-col justify-between"
        v-for="product in data"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>
