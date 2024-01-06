<template>
  <div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()

function incrementCartItems() {
  store.commit('incrementCartItems')
}
</script>
