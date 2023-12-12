<template>
  <div>
    <div class="flex flex-col items-center justify-center p-2">
      <span class="text-4xl">Home page</span>
      <div>
        <label class="p-2">Search for a product:<input class="border" type="text" v-model="search"></label>
        <label>Sort by:
          <select v-model="sortOption">
            <option value="priceAsc">Price ascending</option>
            <option value="priceDesc">Price descending</option>
            <option value="ratingAsc">Rating ascending</option>
            <option value="ratingDesc">Rating descending</option>
          </select>
        </label>
      </div>
    </div>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 p-2">
      <div v-if="isPending" class="place-self-center"><LoadingIcon /></div>
      <ProductItem v-else-if="isSuccess" v-for="product in searchedProducts" :key="product.id" :name="product.title" :price="product.price" :image="product.image" :rating="product.rating" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductItem from '@/components/ProductItem.vue';
import LoadingIcon from '@/icons/LoadingIcon.vue'
import { useQuery } from '@tanstack/vue-query';
import { ref, computed } from 'vue';
import type { Product } from '@/types/common.d.ts'

const { isPending, isSuccess, data, error } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    if (!response.ok) {
      console.log(error)
      return
    }
    const productsList = await response.json()
    productsList.map((el: any) => {
      const rating = Math.round((Math.random() * 4))
      el.rating = rating
      return el
    })
    return productsList
  }
})

const sortOption = ref('')

const sortedProducts = computed(() => {
  
  switch(sortOption.value) {
    case 'priceAsc':
      return data.value.toSorted(sortByPriceAsc)
    case 'priceDesc':
      return data.value.toSorted(sortByPriceDesc)
    case 'ratingAsc':
      return data.value.toSorted(sortByRatingAsc)
    case 'ratingDesc':
      return data.value.toSorted(sortByRatingDesc)
    default:
      return data.value
  }

  function sortByPriceAsc(a: Product, b: Product) {
    if (a.price < b.price) return -1
    else if (a.price > b.price) return 1
    return 0
  }

  function sortByPriceDesc(a: Product, b: Product) {
    if (a.price < b.price) return 1
    else if (a.price > b.price) return -1
    return 0
  }

  function sortByRatingAsc(a: Product, b: Product) {
    if (a.rating < b.rating) return -1
    else if (a.price > b.price) return 1
    return 0
  }

  function sortByRatingDesc(a: Product, b: Product) {
    if (a.rating < b.rating) return 1
    else if (a.price > b.price) return -1
    return 0
  }

})

const search = ref('')

const searchedProducts = computed(() => {
  return sortedProducts.value.filter((element: Product) => element.title.toLowerCase().includes(search.value.toLowerCase()))
})

</script>

<style lang="scss" scoped>

</style>