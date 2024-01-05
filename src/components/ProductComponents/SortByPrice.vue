<script setup lang="ts">
import { type PriceTypeOrder } from '@/types/product'
import { updateQuery } from '@/utils/UpdateQuery'
import { useRouter } from 'vue-router'
import { createRef } from '@/utils/CreateRef'

const router = useRouter()

const sortOrderByPrice = createRef<PriceTypeOrder>('asc')

const sortByPrice = () => {
  sortOrderByPrice.value = sortOrderByPrice.value === 'asc' ? 'desc' : 'asc'

  updateQuery(router, 'price', sortOrderByPrice)
}
</script>

<template>
  <button
    @click.prevent="sortByPrice"
    class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
  >
    Sort by price
  </button>
</template>
