<template>
  <div class="max-w-7xl mx-auto sm:px-5 lg:px-7 flex justify-between h-16">
    <div
      class="cart right-0 ml-auto mt-auto bg-main-background border border-main-text rounded shadow-md p-4 z-10"
    >
      <ul>
        <li v-for="item in cartItems" :key="item.id" class="mx-auto flex justify-between">
          <span class="text-main-text">{{ item.name }}</span>
          <span class="text-main-text">{{ item.price }}</span>
        </li>
      </ul>
      <button
        class="checkout bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const cartItems = computed(() => store.state.cartItems)
</script>
