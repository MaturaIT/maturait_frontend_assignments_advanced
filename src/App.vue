<template>
  <h1 className="text-3xl">Hello world!</h1>
  <router-link :to="{ name: 'Home' }">Home</router-link>
  <router-view></router-view>
</template>

<script setup lang="ts">
</script>

