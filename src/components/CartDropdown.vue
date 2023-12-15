<template>
  <div class="absolute">
    <div v-for="product in cart.cart" :key="product.id">{{ product.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';


const cart = useCartStore()


</script>

<style lang="scss" scoped>

</style>