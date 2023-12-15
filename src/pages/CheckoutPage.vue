<template>
  <div class="grid grid-cols-2 w-full justify-items-center">
    <div>
      <div v-for="product in cartStore.cart" :key="product.id" class="border">
        <div class="flex justify-center items-center gap-2">
          <img :src="product.image" alt="Product image" width="96" height="96" class="m-12 border rounded-lg h-24">
          <div class="flex flex-col justify-between items-center gap-2 p-12 h-24 border rounded-lg mr-4">
            <div class="flex flex-col gap-2">
              <span><b>{{ product.title }}</b></span>
            </div>
            <div class="flex justify-end gap-2 w-full items-center">
              <span class="after:content-['zł'] after:italic">{{ product.price }}</span>
              <button @click="deleteFromCart(product.shopId)" class="text-white bg-blue-600 rounded-3xl px-3 py-2">Delete from cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="border max-w-xs">
      <span class="after:content-['zł'] after:italic">{{ summmedPrice }}</span>
      <button @click="fireConfetti" class="text-white bg-blue-600 rounded-3xl px-3 py-2">Buy now</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/types/common';
import { computed } from 'vue';
import confetti from 'canvas-confetti'


const cartStore = useCartStore()

const deleteFromCart = (id: number) => {
  cartStore.removeProduct(id)
}

const summmedPrice = computed(() => {
  const initialValue = 0
  return cartStore.cart.reduce((accumulator: number, currentProduct: Product) => accumulator + currentProduct.price, initialValue)
})

const fireConfetti = () => {
  
  var count = 200;
  var defaults = {
    origin: { y: 0.9 }
  };

  function fire(particleRatio: number, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });

  setTimeout(() => {
    fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
  }, 200)

}

</script>

<style lang="scss" scoped>

</style>