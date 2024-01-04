// store.ts
import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: [],
  },
  mutations: {
    addToCart(state, product) {
      state.cart.push(product);
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
  },
  getters: {
    cartItemCount: state => state.cart.length,
  },
});
