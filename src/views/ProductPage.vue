<template>
  <div class="container pb-16 mb-6 mt-2">
    <div class="flex flex-col gap-8">
      <div class="mx-2 min-w-max sm:max-w-xl">
        <SortByPrice />
      </div>
      <div>
        <span v-if="isLoading">
          <LoaderComponent />
        </span>
        <span v-if="isError">
          <ErrorComponent />
        </span>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div
            class="bg-white shadow rounded overflow-hidden group flex flex-col justify-between"
            v-for="product in sortedData"
            :key="product.id"
          >
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchAllProducts } from '@/fetch/useFetch'
import { useQuery } from 'vue-query'
import { type Product } from '@/types/product'
import LoaderComponent from '@/components/reusable/LoaderComponent.vue'
import ErrorComponent from '@/components/reusable/ErrorComponent.vue'
import ProductCard from '@/components/reusable/ProductCard.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import SortByPrice from '@/components/ProductComponents/SortByPrice.vue'

const router = useRouter()

const { data, isLoading, isError } = useQuery<Product[]>('AllProducts', fetchAllProducts)

const sortedData = computed(function () {
  if (data.value === undefined) return []

  let sorted = [...data.value]

  const query = router.currentRoute.value.query

  if (query.price === 'asc') {
    sorted = sorted.sort((a, b) => (a.price || 0) - (b.price || 0))
  } else if (query.price === 'desc') {
    sorted = sorted.sort((a, b) => (b.price || 0) - (a.price || 0))
  }

  return sorted
})
</script>
