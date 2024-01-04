<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

const drawerOpen = ref(false)

function openDrawer() {
  drawerOpen.value = true
}
const closeDrawer = () => {
  drawerOpen.value = false
}
</script>

<template>
  <Drawer v-if="drawerOpen" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-10 container px-8 py-8">
    <Header @open-drawer="openDrawer" />
    <router-view></router-view>
  </div>
</template>
