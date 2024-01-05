import { type Product } from '@/types/product'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toast-notification'
import { useLocalStorage } from '@vueuse/core'

const $toast = useToast()
let instance

const wishlistRef = useLocalStorage<Product[]>('wishlist', [], {})
const cartRef = useLocalStorage<Product[]>('cart', [])

export const useStore = defineStore('store', {
  state: () => ({
    showCart: false,
    cartItems: cartRef.value ? cartRef.value : ([] as Product[]),
    totalPrice: 0,
    totalQuantities: 0,
    qty: 1,
    showMiniCart: false,
    wishlist: wishlistRef.value.length > 0 ? wishlistRef.value : ([] as Product[])
  }),

  actions: {
    onAdd(product: Product, quantity: number) {
      const ProductInCart = this.cartItems.find((item) => item.id === product.id)

      if (ProductInCart) {
        instance = $toast.info('Product already in cart', { duration: 3000 })
      } else {
        product.quantity = quantity
        this.totalPrice += product.price * quantity
        this.totalQuantities += quantity
        this.cartItems.push({ ...product })
        instance = $toast.success(`${this.qty} of ${product.title} added to the cart`, {
          duration: 3000
        })
      }
      this.qty = 1
    },

    onRemove(product: Product) {
      const ProductInCart = this.cartItems.find((item) => item.id === product.id)

      if (ProductInCart) {
        this.totalPrice -= ProductInCart.price * ProductInCart.quantity!
        this.totalQuantities -= ProductInCart.quantity!
        this.cartItems = this.cartItems.filter((item) => item.id !== product.id)
      }
    },

    toggleCartItemQuantity(id: number, value: string) {
      const ProductInCart = this.cartItems.find((item) => item.id === id)

      if (ProductInCart) {
        if (value === 'inc') {
          if (ProductInCart.quantity! < 10) {
            ProductInCart.quantity! += 1
            this.totalPrice += ProductInCart.price
            this.totalQuantities += 1
          } else {
            instance = $toast.error('You can not add more that 10 of the same item', {
              duration: 3000
            })
          }
        } else if (value === 'dec') {
          if (ProductInCart.quantity! > 1) {
            ProductInCart.quantity! -= 1
            this.totalPrice -= ProductInCart.price
            this.totalQuantities -= 1
          }
        }
      }
    },

    incQty() {
      this.qty = this.qty + 1 > 10 ? 10 : this.qty + 1
    },
    decQty() {
      this.qty = this.qty - 1 < 1 ? 1 : this.qty - 1
    },

    addToWishlist(product: Product) {
      const checkProductInWishlist = this.wishlist.find((item) => item.id === product.id)

      if (!checkProductInWishlist) {
        this.wishlist = [...this.wishlist, product]
        instance = $toast.success(`${product.title} Added to wishlist`, { duration: 3000 })
      } else {
        const updatedWishlist = this.wishlist.filter((item) => item.id !== product.id)
        this.wishlist = updatedWishlist
        instance = $toast.error(`${product.title} removed from wishlist`, { duration: 3000 })
      }

      wishlistRef.value = [...this.wishlist]
    },

    removeFromWishlist(product: Product) {
      const existingWishlist = wishlistRef.value

      if (existingWishlist.length > 0) {
        existingWishlist.filter((item) => item.id !== product.id)
        wishlistRef.value = [...existingWishlist]
      }

      this.wishlist = this.wishlist.filter((item) => item.id !== product.id)
    }
  }
})
