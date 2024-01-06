<template>
  <nav class="bg-main-background shadow">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-between h-16">
      <div class="flex-shrink-0 flex items-center">
        <!-- Title with the link to home page-->
        <a href="/" class="text-main-text font-mono text-lg font-bold">MaturaIT Shop</a>
      </div>
      <div class="ml-4 flex items-center md:ml-6 space-x-1 relative">
        <a class="border border-main-text rounded px-4 py-2 cursor-pointer text-main-text" @click="toggleCart">
          <!-- Display the number of products in the basket next to the icon, 
              to make it a little bit more clear only display the number if there are
              actually items in the cart -->
          {{ cartItemsCount > 0 ? cartItemsCount : "" }}
          <!-- Shopping cart icon -->
          <font-awesome-icon icon="shopping-cart" class="text-main-text text-lg" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue'
import { useStore } from 'vuex'

interface SharedState {
  showCart: boolean
}

const store = useStore()
const sharedState = inject('sharedState') as SharedState
const showCart = ref(false)
const cartItemsCount = computed(() => store.state.cartItemsCount)

function toggleCart() {
  showCart.value = !showCart.value
  sharedState.showCart = showCart.value
}
</script>
