<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import type { Product } from './utils/types'

const drawerOpen = ref(false)
const cartItems = ref(JSON.parse(localStorage.getItem('cartItems') || '[]'))

function openDrawer() {
  drawerOpen.value = true
}
const closeDrawer = () => {
  drawerOpen.value = false
}

const addToCart = (product: Product) => {
  cartItems.value.push(product)

  localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
}

const removeFromCart = (index: number) => {
  cartItems.value.splice(index, 1)

  localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
}

const clearCart = () => {
  cartItems.value = []

  localStorage.removeItem('cartItems')
}

onMounted(() => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
  if (storedCartItems) {
    cartItems.value = storedCartItems
  }
})
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    @close-drawer="closeDrawer"
    :cartItems="cartItems"
    @remove-from-cart="removeFromCart"
    @clear-cart="clearCart"
  />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-10 container px-8 py-8">
    <Header @open-drawer="openDrawer" :cartItemsCount="cartItems.length" />
    <router-view :addToCart="addToCart"></router-view>
  </div>
</template>
