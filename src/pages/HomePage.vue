<template>
  <div>
    Home page
    <div v-if="isPending">Is pending</div>
    <div v-else-if="isSuccess" v-for="product in data" :key="product.id">{{ product.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const { isPending, isSuccess, data, error } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    if (!response.ok) {
      console.log(error)
      return
    }
    return response.json()
  }
})


</script>

<style lang="scss" scoped>

</style>