<template>
  <div>
    <div class="flex justify-center p-2">
      <span class="text-4xl">Home page</span>
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 p-2">
      <div v-if="isPending"><LoadingIcon /></div>
      <ProductItem v-else-if="isSuccess" v-for="product in data" :key="product.id" :name="product.title" :price="product.price" :image="product.image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import LoadingIcon from '@/icons/LoadingIcon.vue'
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