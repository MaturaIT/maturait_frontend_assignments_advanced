<script setup>
import FooterComponent from '../components/FooterComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import SearchBar from '../components/SearchBar.vue'
</script>
<template>
  <header class="flex flex-col gap-4 bg-gray-800 text-white p-4 md:px-8 lg:px-16">
    <HeaderComponent />
    <SearchBar />
  </header>
  <div class="container mx-auto flex">
    <router-view></router-view>
  </div>
  <FooterComponent />
</template>
<style scoped></style>
