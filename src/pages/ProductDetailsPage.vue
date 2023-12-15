<template>
  <div class="flex justify-center">
    <LoadingIcon v-if="isPending" />
    <div v-else-if="isSuccess" class="flex justify-center items-center gap-2">
      <img :src="data.image" alt="Product image" width="512" height="512"
        class="m-12 border rounded-lg h-[512px]"
      >
      <div class="flex flex-col justify-between items-center gap-2 p-12 h-[512px] border rounded-lg mr-4">
        <div class="flex justify-between w-full">
          <span class="text-gray-400">Category:<br />{{ data.category }}</span>
          <span class="after:content-['⭐']">{{ data.rating }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-xl"><b>{{ data.title }}</b></span>
          <span>{{ data.description }}</span>
        </div>
        <div class="flex justify-end gap-2 w-full items-center">
          <span class="after:content-['zł'] after:italic">{{ data.price }}</span>
          <button @click="addToCart" class="text-white bg-blue-600 rounded-3xl px-3 py-2">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingIcon from '@/icons/LoadingIcon.vue';
import { useCartStore } from '@/stores/cartStore';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';

const { params } = useRoute()
const cart = useCartStore()

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
    product.category = capitalizeFirstLetter(product.category)
    return product
  }
})

function capitalizeFirstLetter(string: string) { 
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const addToCart = () => {
  cart.addProduct(data.value)
}

</script>

<style lang="scss" scoped>

</style>