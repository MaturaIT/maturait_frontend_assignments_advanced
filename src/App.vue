<template>
  <div>
    <NavigationBar :sharedState="sharedState" />
    <!-- Dropdown with the cart contents and checkout button, containing animation, 
        using reactive state with a boolean to get information about cart button being clicked
        from the NavigationBar component -->
    <CartItems v-if="sharedState.showCart" />
    <Transition name="fade">
      <ProductList />
    </Transition>
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
.fade-enter-active {
  transition: all 0.2s ease-out;
}

.fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.7, 0.9, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
