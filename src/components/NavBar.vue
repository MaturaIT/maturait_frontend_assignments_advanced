<template>
  <div class="flex justify-evenly">
    <h1 class="text-3xl">MaturaIT Shop</h1>
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