<template>
  <div class="flex justify-evenly items-end py-4 px-2">
    <span class="flex -gap-1">
      <img src="../../favicon.ico" alt="MaturaIT Shop Logo">
      <h1 class="text-3xl">aturaIT Shop</h1>
    </span>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <cart-icon />
  </div>
</template>

<script setup lang="ts">
import CartIcon from '@/icons/CartIcon.vue'
/*
 Include a title, link to the home page, and a basket icon.
 Display the number of products in the cart on the basket icon.
 Implement a dropdown on basket icon click showing cart contents and a checkout button.
*/
</script>

<style scoped>

</style>