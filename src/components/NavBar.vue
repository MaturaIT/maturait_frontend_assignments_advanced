<script setup lang="ts">
import { fetchAllCategories } from '../fetch/useFetch'
import { useQuery } from 'vue-query'
import { type Categories } from '@/types/product'
import LoaderComponent from '@/components/reusable/LoaderComponent.vue'
import ErrorComponent from '@/components/reusable/ErrorComponent.vue'

const { isLoading, isError, data } = useQuery<Categories[]>('categories', fetchAllCategories)

const EncodedUriC = (categoryname: string) => ({
  name: 'products',
  query: { c: encodeURIComponent(categoryname) }
})
</script>

<template>
  <nav class="bg-gray-800">
    <div class="container flex items-center flex-col gap-2">
      <p
        class="border text-center flex rouned-md px-5 py-2 text-lg font-semibold w-full sm:w-max justify-center"
      >
        Categories
      </p>
      <span v-if="isLoading">
        <LoaderComponent />
      </span>
      <span v-if="isError">
        <ErrorComponent />
      </span>
      <ul
        v-else
        class="flex flex-col w-full items-center gap-2 sm:flex-row sm:justify-center sm:gap-16"
      >
        <li
          v-for="category in data"
          :key="category"
          class="flex rounded-md font-semibold px-4 py-2 justify-center hover:scale-110"
        >
          <router-link :to="EncodedUriC(category)">{{ category }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
