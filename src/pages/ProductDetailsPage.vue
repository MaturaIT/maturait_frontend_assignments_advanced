<template>
  <div class="flex justify-center">
    <LoadingIcon v-if="isPending" />
    <div v-else-if="isSuccess" class="flex flex-col justify-center items-center gap-2">
      <img :src="data.image" alt="Product image" width="256" height="256">
      {{ data.title }}
      {{ data.price }}
      {{ data.category }}
      {{ data.description }}
      {{ data.rating }}
    </div>
  </div>
</template>

<!-- export type Product = {
  id: number,
  title: string,
  price: string,
  category: string,
  description: string,
  image: string,
  rating: number,
} -->

<script setup lang="ts">
import LoadingIcon from '@/icons/LoadingIcon.vue';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';


const { params } = useRoute()

const { isPending, isSuccess, data, error } = useQuery({
  queryKey: ['product'],
  queryFn: async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${params.id}`)
    if (!response.ok) {
      console.log(error)
      return
    }
    const product = await response.json()
    product.rating = Math.round((Math.random() * 4))
    return product
  }
})

</script>

<style lang="scss" scoped>

</style>