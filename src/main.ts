import { createApp } from 'vue'
import { createStore } from 'vuex'
import './index.css'

// Custom icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart)

import ProductList from './ProductList.vue'

interface CartItem {
  name: string
  price: number
}

// I'm going to use products page as the main page, to avoid adding unnecessary main page with no valuable content :)
const app = createApp(ProductList)

// vuex store, for storing number of items in cart and sharing it between components
const store = createStore({
  state: {
    cartItemsCount: 0,
    cartItems: [] as CartItem[]
  },
  mutations: {
    incrementCartItems(state) {
      state.cartItemsCount++
    },
    decrementCartItems(state) {
      state.cartItemsCount--
    },
    addCartItem(state, data: CartItem) {
      state.cartItems.push(data)
    }
  }
})

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.mount('#app')
