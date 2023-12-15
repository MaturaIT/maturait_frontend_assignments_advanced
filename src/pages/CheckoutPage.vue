<template>
  <div>
    <div v-for="product in cartStore.cart" :key="product.id">
      <div class="flex justify-center items-center gap-2">
      <img :src="product.image" alt="Product image" width="512" height="512"
        class="m-12 border rounded-lg h-[512px]"
      >
      <div class="flex flex-col justify-between items-center gap-2 p-12 h-[512px] border rounded-lg mr-4">
        <div class="flex justify-between w-full">
          <span class="text-gray-400">Category:<br />{{ product.category }}</span>
          <span class="after:content-['⭐']">{{ product.rating }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-xl"><b>{{ product.title }}</b></span>
          <span>{{ product.description }}</span>
        </div>
        <div class="flex justify-end gap-2 w-full items-center">
          <span class="after:content-['zł'] after:italic">{{ product.price }}</span>
          <button @click="deleteFromCart(product.shopId)" class="text-white bg-blue-600 rounded-3xl px-3 py-2">Delete from cart</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';


const cartStore = useCartStore()

const deleteFromCart = (id: number) => {
  cartStore.removeProduct(id)
}

</script>

<style lang="scss" scoped>

</style>