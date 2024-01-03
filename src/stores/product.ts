import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useProduct = defineStore('product', () => {
  // create new product in seller page
  const productName = ref<string>('')
  const category = ref<any>([])
  const level = reactive<any>({
    level1: '',
    level2: '',
    level3: '',
  })

  // search public product
  const productRequestID = ref()
  const shopRequestID = ref()

  return { productName, category, level, productRequestID, shopRequestID }
})
