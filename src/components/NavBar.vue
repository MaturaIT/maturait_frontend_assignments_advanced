<script setup lang="ts">
import { fetchAllCategories } from '../fetch/useFetch'
import { useQuery } from 'vue-query'
import { type Categories } from '@/types/product'
import LoaderComponent from '@/components/reusable/LoaderComponent.vue'
import ErrorComponent from '@/components/reusable/ErrorComponent.vue'
import { useRouter } from 'vue-router'
import { createRef } from '@/utils/CreateRef'
import { updateQuery } from '@/utils/UpdateQuery'

const router = useRouter()

const sortOrderByCategory = createRef<Categories>('')

const { isLoading, isError, data } = useQuery<Categories[]>('categories', fetchAllCategories)

const sortByCategory = (category: Categories) => {
  sortOrderByCategory.value = category

  updateQuery(router, 'c', sortOrderByCategory)
}
</script>

<template>
  <nav class="bg-gray-800">
    <div class="container flex flex-col gap-2">
      <div class="flex flex-col-reverse sm:flex-row gap-4">
        <p
          class="border text-center flex rounded-md px-5 py-2 text-lg font-semibold w-full sm:w-max justify-center"
        >
          Categories
        </p>
        <p
          class="border text-center flex rounded-md px-5 py-2 text-lg font-semibold w-full sm:w-max justify-center"
        >
          <router-link :to="{ name: 'products' }">All products</router-link>
        </p>
      </div>
      <span v-if="isLoading">
        <LoaderComponent />
      </span>
      <span v-if="isError">
        <ErrorComponent />
      </span>
      <ul v-else class="flex flex-col sm:flex-row gap-0 sm:gap-2">
        <li
          v-for="category in data"
          :key="category"
          class="cursor-pointer flex rounded-md font-semibold px-2 py-1 justify-center hover:scale-110"
          @click.prevent="sortByCategory(category)"
        >
          {{ category }}
        </li>
      </ul>
    </div>
  </nav>
</template>
