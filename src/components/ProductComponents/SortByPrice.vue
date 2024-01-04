<script setup lang="ts">
import { type PriceTypeOrder } from '@/types/product'
import { updateQuery } from '@/utils/UpdateQuery'
import { useRouter } from 'vue-router'

const router = useRouter()

const sortOrderByPrice = createRef<PriceTypeOrder>('asc')

const sortByPrice = () => {
  sortOrderByPrice.value = sortOrderByPrice.value === 'asc' ? 'desc' : 'asc'

  updateQuery(router, 'price', sortOrderByPrice)
}
</script>

<template>
  <button @click.prevent="sortByPrice">Sort by price</button>
</template>
