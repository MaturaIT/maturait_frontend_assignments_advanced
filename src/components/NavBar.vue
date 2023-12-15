<template>
  <div class="flex justify-evenly items-end py-4 px-2">
    <span class="flex -gap-1">
      <img src="../../favicon.ico" alt="MaturaIT Shop Logo">
      <h1 class="text-3xl">aturaIT Shop</h1>
    </span>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <div>
      <cart-icon @click="toggleShowCart" class="hover:bg-gray-500" />
      <span class="absolute">{{ cartStore.cart.length }}</span>
      <div v-if="ifShowCart" class="absolute border border-emerald-500 rounded-lg bg-slate-400">
        <div v-for="product in cartStore.cart" :key="product.id">
          <div>
            <img :src="product.image" alt="Product image" width="16" height="16">
            <span>{{ product.title }}</span>
          </div>
        </div>
        <div v-if="isCartEmpty">
          The cart is empty!
        </div>
        <div class="flex justify-between">
          <button @click="clearCart" class="bg-white">Clear</button>
          <router-link :to="{ name: 'Checkout' }" class="text-white bg-blue-600">Buy now</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartIcon from '@/icons/CartIcon.vue'
import { useCartStore } from '@/stores/cartStore';
import { computed, ref } from 'vue';

const cartStore = useCartStore()

const ifShowCart = ref(false)

const toggleShowCart = () => {
  ifShowCart.value = !ifShowCart.value
}

const clearCart = () => {
  cartStore.clearCart()
}

const isCartEmpty = computed(() => {
  return cartStore.cart.length === 0
})

</script>

<style scoped>

</style>