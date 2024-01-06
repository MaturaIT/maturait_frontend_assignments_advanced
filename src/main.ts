import { createApp } from 'vue'
import { createStore } from 'vuex'
import { VueQueryPlugin } from 'vue-query'
import './index.css'

// Custom icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart)

import App from './App.vue'

interface CartItem {
  name: string
  price: number
}

const app = createApp(App)

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
app.use(VueQueryPlugin);
app.mount('#app')
