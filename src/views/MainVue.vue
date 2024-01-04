<template>
  <FeaturesComponent />
  <BestProducts />
</template>

<script setup lang="ts">
import BestProducts from '@/components/HomePageData/BestProducts.vue'
import FeaturesComponent from '@/components/FeaturesComponent.vue'
import { fetchAllProducts } from '@/fetch/useFetch'
import { useQuery } from 'vue-query'
import { type Product } from '@/types/product'

const { data, isLoading } = useQuery<Product[]>('products', fetchAllProducts, {
  initialData: [],
  onSuccess: (data) => {},
  onError: (error) => console.error(error)
})
</script>
