<script setup lang="ts">
import DrawerHeader from './DrawerHeader.vue'
import CartItem from './CartItem.vue'
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['closeDrawer', 'removeFromCart', 'clearCart'])
const props = defineProps(['cartItems'])

const calculateTotal = (cartItems: { price: number }[]) => {
  return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)
}

const removeFromCart = (index: number) => {
  emit('removeFromCart', index)
}

const reloadPage = () => {
  window.location.reload()
}
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-80"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 overflow-y-auto">
    <DrawerHeader @close-drawer="emit('closeDrawer')" />

    <div v-if="props.cartItems.length > 0">
      <CartItem
        v-for="(item, index) in props.cartItems"
        :key="index"
        :item="item"
        @remove-from-cart="removeFromCart"
      />

      <div class="flex flex-col gap-5 my-6">
        <div class="flex gap-2">
          <span>Total:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ calculateTotal(props.cartItems) }}$</b>
        </div>

        <button
          class="mt-2 transition bg-blue-500 hover:bg-blue-600 active:bg-blue-700 w-full rounded-full py-3 disabled:bg-slate-400 text-white cursor-pointer"
          @click="
            () => {
              emit('clearCart')
              reloadPage()
            }
          "
        >
          Buy now
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 my-8">Cart is empty</div>
  </div>
</template>
