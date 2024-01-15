<script setup>
import { reactive, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import CartRequest from '@/services/cart-request'
import { useCart } from '@/stores/cart'
import { getResources } from '@/utils/resources'
import { floorNumber } from '@/utils/floorNumber'
import { removeItemByIndex } from '@/utils/arrayHandle'

const router = useRouter()
const cart = useCart()

const isBlurBgModal = ref(false)
const openNav = () => {
  document.getElementById('mySidenav').style.width = '25rem'
  const body = document.body
  body.style.overflowY = 'hidden'
  isBlurBgModal.value = true
}
const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0'
  const body = document.body
  body.style.overflowY = ''
  isBlurBgModal.value = false
}
// --------------------------------------------
watchEffect(async() => {
  const cartData = await CartRequest.getCart()
  cart.result = cartData[0]?.products
})
const handleDelete = async(id) => {
  removeItemByIndex(cart.result, id, 1)
  await CartRequest.deleteCart(id)
  // useToast.updateToast('success', 'You has been delete one cart items!', true)
}
// ---------------------------------------------------------------
const payloadOrder = reactive({
  address_id: '',
  orders: [{
    product_model_id: '',
    quantity: '',
  }],
})

const handleOrder = async() => {
  if (payloadOrder.address_id) {
    await cart.result.map(item => payloadOrder.orders.push({ product_model_id: item.product_model_id, quantity: item.quantity }))
    await OrderRequest.createOrders(payloadOrder)
    // useToast.updateToast('success', 'You order has been created!', true)
  }
  else {
    // useToast.updateToast('error', 'Please need fill your address information!', true)
    router.push({ path: '/checkout' })
  }
}
</script>

<template>
  <div class="flex justify-center items-center text-white dark:text-black">
    <div class="mr-5 flex items-end hover:text-[#adff2f] dark:text-[#adff2f] relative" style="filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.2));" @click="openNav">
      <span class="total-notifications absolute -top-2 left-5 bg-green-500 w-5 h-5 text-white rounded-full flex justify-center items-center pr-0.5 text-xs font-medium">{{ cart.result.length }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><circle cx="13.33" cy="29.75" r="2.25" class="clr-i-outline clr-i-outline-path-1" fill="currentColor" /><circle cx="27" cy="29.75" r="2.25" class="clr-i-outline clr-i-outline-path-2" fill="currentColor" /><path d="M33.08 5.37a1 1 0 0 0-.77-.37H11.49l.65 2H31l-2.67 12h-15L8.76 4.53a1 1 0 0 0-.66-.65L4 2.62a1 1 0 1 0-.59 1.92L7 5.64l4.59 14.5l-1.64 1.34l-.13.13A2.66 2.66 0 0 0 9.74 25A2.75 2.75 0 0 0 12 26h16.69a1 1 0 0 0 0-2H11.84a.67.67 0 0 1-.56-1l2.41-2h15.44a1 1 0 0 0 1-.78l3.17-14a1 1 0 0 0-.22-.85z" class="clr-i-outline clr-i-outline-path-3" fill="currentColor" /></svg>
      <h1 class="font-semibold ml-3">
        {{ floorNumber(cart.result.reduce((accum,item) => accum + item.quantity, 0)) }}
      </h1>
    </div>
    <div>
      <router-link to="#">
        <img v-if="avatarID" :src="getResources(avatarID)" alt="avatar_img" class="rounded-full w-10 min-w-10 max-w-10 h-10 min-h-10 max-h-10 border-2 border-blue-500" style="object-fit: cover;filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.2));">
        <img v-else class="w-10 min-w-10 max-w-10 h-10 min-h-10 max-h-10 rounded-full shadow-lg shadow-gray-500/50" src="/img/avatar_sample.png" alt="avatar_sample">
      </router-link>
    </div>
    <div v-if="isBlurBgModal" class="blur-bg w-screen h-screen absolute top-0 -left-10 bg-black bg-opacity-30 z-1" @click="closeNav" />
    <div id="mySidenav" class="sidenav w-0 h-screen fixed top-12 right-0 bg-white duration-500 z-2 overflow-x-hidden text-left text-black dark:(text-gray-200 bg-black) divide-light-700 divide-y border-1 border-dotted border-gray-700 shadow-2xl shadow-gray-500">
      <div class="flex justify-between items-center p-5">
        <p class="font-semibold capitalize">cart</p>
        <span class="cursor-pointer text-4xl" @click="closeNav">&times;</span>
      </div>
      <ul class="minicart-product-list divide-light-700 divide-y max-h-1/2 overflow-y-scroll">
        <li v-for="(item, index) in cart.result" :key="index" class="flex justify-between items-start p-5 inline-block">
          <div class="flex">
            <a>
              <!-- <img
                src="/img/product/1.png" alt="cart_product_img" class="max-w-25 max-h-25 border-light-600 border-solid border-1 rounded-md mr-3"
              > -->
              <img :src="item.product?.image" alt="cart_product_img" class="max-w-25 max-h-25 border-light-600 border-solid border-1 rounded-md mr-3"
              >
            </a>
            <div>
              <h5 class="title text-[#E14641] cursor-pointer">
                {{ item?.productId }}
              </h5>
              <span class="quantity-price">{{ item?.quantity }}</span>
            </div>
          </div>
          <span class="remove hover:text-red-500 cursor-pointer ml-2" @click="handleDelete(item?.productId)">×</span>
        </li>
      </ul>
      <div class="flex flex-wrap justify-between p-5">
        <strong>Sub total :</strong>
        <span class="amount font-semibold">{{ floorNumber(cart.result.reduce((accum,item) => accum + item?.quantity, 0)) }}</span>
      </div>
      <div class="flex justify-around items-center p-5">
        <button type="submit" value="submit" class="bg-black text-white font-semibold text-xs py-3 px-7 rounded-md hover:bg-[#E14641] duration-200 uppercase cursor-pointer" @click="handleOrder">Buy Now</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container > div:not(:last-child) {
    margin: 0 1rem;
    cursor: pointer;
}
.sidenav {
  font-family: "Lato", sans-serif;
}
.sidenav a {
  text-decoration: none;
  color: black;
  display: block;
  transition: 0.3s;
}
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
::-webkit-scrollbar-thumb {
  background: rgb(155, 155, 155);
}
@media (max-width:768px){
  .container > div:not(:last-child) {
    margin: 0 0.5rem;
}
}
</style>
