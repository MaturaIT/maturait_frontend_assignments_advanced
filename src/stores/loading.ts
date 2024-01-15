import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoading = defineStore('loading', () => {
  const isLoading = ref(false)

  return { isLoading }
})
