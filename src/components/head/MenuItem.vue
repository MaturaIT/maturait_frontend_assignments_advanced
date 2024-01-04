<script setup>
import { onMounted, ref } from 'vue';
import ProductRequest from '@/services/product-request';

const lists = ref([])

onMounted(async() => {
    const categoriesData = await ProductRequest.getAllCategories();
    lists.value = categoriesData
})
</script>

<template>
  <div class="buyer-menu-item-container flex justify-center">
    <ul class="float-menu flex text-sm text-gray-500 overflow-x-scroll max-w-screen-xl whitespace-nowrap">
      <li v-for="(item, i) in lists" :key="i" class="cursor-pointer py-1 px-3 text-white dark:text-black border-1 border-solid border-transparent hover:border-white rounded-md duration-150 capitalize">
        <router-link :to="`/category/${item}`" :title="brand">
          {{ item }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
