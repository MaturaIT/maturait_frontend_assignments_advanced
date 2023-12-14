<template>
  <div>
    {{ params.id }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';


const { params } = useRoute()

</script>

<style lang="scss" scoped>

</style>