<script setup lang="ts">
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-8">
    <div class="flex items-center gap-4">
      <router-link to="/">
        <h2 class="text-xl font-bold uppercase">MaturaIT</h2>
        <p class="text-slate-500">e-commerce platform</p>
      </router-link>
    </div>
    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer text-slate-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>0</b>
      </li>
    </ul>
  </header>
</template>
