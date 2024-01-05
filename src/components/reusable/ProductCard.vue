<template>
  <div class="relative py-2">
    <router-link :to="{ name: 'single product', params: { id: product.id } }">
      <img :src="product.image" alt="product image" class="w-1/3 mx-auto" />
      <div
        class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition cursor-pointer"
      ></div>
    </router-link>
  </div>
  <div class="pt-4 pb-3 px-4">
    <h4 class="font-medium text-lg mb-2 text-gray-800 hover:text-primary transition">
      {{ product.title }}
    </h4>

    <div class="flex mb-1 justify-between">
      <p class="text-lg font-semibold">{{ product.price.toFixed(2) }}$</p>
      <span>
        <svg
          class="hover:border-b-2 border-black cursor-pointer"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"
          />
        </svg>
      </span>
    </div>
    <div class="flex flex-col gap-1">
      <div class="text-xs text-gray-500">reviews: {{ product.rating.count }}</div>
      <div class="flex gap-1 text-sm text-yellow-500 font-semibold">
        rating: {{ product.rating.rate }} / 5.0
      </div>
    </div>
  </div>
  <router-link
    :to="{ name: 'single product', params: { id: product.id } }"
    class="flex justify-center w-full py-1 text-center text-gray-700 bg-primary border border-primary rounded-b hover:bg-transparent transition"
    >Add to cart</router-link
  >
</template>

<script setup lang="ts">
const { product } = defineProps(['product'])
</script>
