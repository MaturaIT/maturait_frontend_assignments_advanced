<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '@/store/Store'

const store = useStore()

onMounted(() => {
  store.resetChangeToCheckout()
})
</script>

<template>checkout</template>
