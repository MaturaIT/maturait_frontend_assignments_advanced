import type { Product } from "@/types/common";
import { defineStore } from "pinia";


export const useCartStore = defineStore('cartStore', {
  state: () => {
    return {
      cart: [] as Array<Product>,
    }
  },
  actions: {
    addProduct(product: Product) {
      this.cart.push(product)
      window.localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    removeProduct(id: number) {
      this.cart = this.cart.filter((el: Product) => el.id !== id)
      window.localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    clearCart() {
      this.cart = []
      window.localStorage.clear()
    },
  }
})
