import type { Product } from "@/types/common";
import { defineStore } from "pinia";


export const useCartStore = defineStore('cartStore', {
  state: () => {
    return {
      cart: window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')!) : [] as Array<Product>,
      count: window.localStorage.getItem('count') ? parseInt(window.localStorage.getItem('count')!) : 1,
    }
  },
  actions: {
    addProduct(product: Product) {

      const productToAdd = {
        ...product,
        shopId: this.count,
      }

      this.cart.push(productToAdd)
      window.localStorage.setItem('cart', JSON.stringify(this.cart))

      this.count++
      window.localStorage.setItem('count', this.count.toString())

    },
    removeProduct(id: number) {
      this.cart = this.cart.filter((el: Product) => el.shopId !== id)
      window.localStorage.setItem('cart', JSON.stringify(this.cart))
      this.count--
      window.localStorage.setItem('count', this.count.toString())
    },
    clearCart() {
      this.cart = []
      this.count = 1
      window.localStorage.clear()
    },
  }
})
