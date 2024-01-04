<template>
  <h1>Main View</h1>
</template>

<script setup lang="ts">
import { fetchAllProducts } from '../fetch/useFetch'
import { useQuery } from 'vue-query'
import { type Product } from '@/types/product'

const { data, isLoading } = useQuery<Product[]>('products', fetchAllProducts, {
  initialData: [],
  onSuccess: (data) => {
    console.log(data)
  },
  onError: (error) => console.error(error)
})
</script>
