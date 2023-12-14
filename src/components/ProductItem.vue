<template>
  <router-link :to="{ name: 'ProductDetails', params: { id } }" 
    class="grid grid-flow-col grid-rows-[0.6fr,0.4fr] place-content-center h-80 border hover:shadow-lg transition-shadow">
    <img class="place-self-center h-32 object-contain" :src="image" :alt="`Image for ${name}`" width="128" height="128">
    <div class="flex flex-col max-w-full justify-center items-center p-2 place-self-end">
      <span class="truncate text-center px-2">{{ shortenedName }}</span>
      <span class="after:content-['zł'] after:italic">{{ price }}</span>
      <span class="after:content-['⭐']">{{ rating.toPrecision(1) }}</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  id: number,
  name: string,
  price: number,
  image: string,
  rating: number,
}>()

const shortenedName = computed(() => {
  if (props.name.length >= 35) {
    return props.name.slice(0, 32).trim() + "..."
  }
  else return props.name
})

</script>

<style lang="scss" scoped>

</style>