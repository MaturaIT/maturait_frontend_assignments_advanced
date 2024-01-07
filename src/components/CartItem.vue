<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['item'])
const emit = defineEmits(['removeFromCart'])

const removeFromCart = () => {
  emit('removeFromCart', props.item.index)
}
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4 mb-4">
    <img class="w-16 h-16" :src="item.image" :alt="item.title" />

    <div class="flex flex-col flex-1">
      <p>{{ props.item.title }}</p>

      <div class="flex justify-between mt-2">
        <b>Price: {{ props.item.price.toFixed(2) }}$</b>
        <img
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="close"
          @click="removeFromCart"
        />
      </div>
    </div>
  </div>
</template>
