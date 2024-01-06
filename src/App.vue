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
import { provide, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useQuery } from 'vue-query'
import NavigationBar from './NavigationBar.vue'
import ProductList from './ProductList.vue'
import CartItems from './CartItems.vue'

interface Product {
  name: string
  price: number
  image: string
  rating: number
}

const store = useStore()
const loading = ref(false)
const sharedState = reactive({
  showCart: false,
  loading: loading,
  products: useQuery('products', async () => {
    toggleLoading()
    const response = await fetch('https://fakestoreapi.com/products')
    const responseData = await response.json()
    let products = [] as Product[]
    for (const product of responseData) {
      products.push({
        name: product.title,
        price: product.price,
        image: product.image,
        rating: product.rating.rate
      })
    }
    toggleLoading()
    return products
  }, {
    staleTime: 5 * 60 * 1000,
    cacheTime: 24 * 60 * 60 * 1000
  })
})

provide('sharedState', sharedState)

function toggleLoading() {
  loading.value = !loading.value
}

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
