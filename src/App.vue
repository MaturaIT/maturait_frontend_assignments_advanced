<template>
  <div>
    <NavigationBar :sharedState="sharedState" />
    <!-- Dropdown with the cart contents and checkout button, containing animation, 
        using reactive state with a boolean to get information about cart button being clicked
        from the NavigationBar component -->
    <transition name="fade">
      <CartItems v-if="sharedState.showCart" />
    </transition>
    <ProductList />
  </div>
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue'
import { useStore } from 'vuex'
import NavigationBar from './NavigationBar.vue'
import CartItems from './CartItems.vue'
import ProductList from './ProductList.vue'

const store = useStore()

const sharedState = reactive({
  showCart: false
})

provide('sharedState', sharedState)

function incrementCartItems() {
  store.commit('incrementCartItems')
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-500 ease-out;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
