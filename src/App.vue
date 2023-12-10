<template>
  <nav-bar />
  <router-link :to="{ name: 'Home' }">Home</router-link>
  <router-view></router-view>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
