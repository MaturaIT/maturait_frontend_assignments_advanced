<script setup>
import { ref, onMounted, watchEffect, reactive } from 'vue';
import { mapMutations } from 'vuex';
import { watchOnce } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useLoading } from '@/stores/loading'
import { toast } from '@/stores/toast'
import { useProduct } from '@/stores/product'
import { getResources } from '@/utils/resources'
import ProductRequest from '@/services/product-request'
import CartRequest from '@/services/cart-request'
import provinceNames from '@/utils/provinces'
import { fakestoreApi } from '@/api/fakestoreApi';

const loading = useLoading()
const router = useRouter()
const useToast = toast()
const product = useProduct()

const productResponseData = ref([])
const productStock = ref()
const productImg = ref('')

onMounted(async() => {
    loading.isLoading = true
    const productId = router.currentRoute.value.params.id;
    const productData = await fakestoreApi.getProductDetails(productId);
    productResponseData.value = productData
    productImg.value = productData.image
    loading.isLoading = false
})

// ---------------------------------------
const isAdd = ref(false)
const payloadCart = reactive({
  product_model_id: '',
  quantity: 1,
})

const handleAdd = async() => {
  await CartRequest.addCart(payloadCart)
  useToast.updateToast('success', 'You cart items has been updated!', true)
  isAdd.value = true
}

const handleOrder = () => {
  useToast.updateToast('success', 'You order has been created!', true)
}

</script>

<template>
  <div class="product-summary-container max-w-300 bg-white dark:bg-gray-800 rounded-xl shadow-md shadow-gray-400/50 p-3 mx-auto">
    <div v-cloak class="main-content flex gap-10">
      <div>
        <img :src="productImg" alt="product_img" class="max-w-112 max-h-112 rounded-2xl shadow-lg shadow-gray-400/50 dark:shadow-gray-700">
        <!-- <div class="grid grid-cols-5 max-w-112 mt-3 gap-2">
          <img :src="getResources(img)" alt="product_preview_img" class="rounded-md border-2 border-solid hover:border-[#EE4D2D] cursor-pointer">
        </div> -->
      </div>
      <div class="pr-5 grid content-between min-h-112">
        <h2 class="break-words text-xl font-medium">
          {{ productResponseData.title }}
        </h2>
        <div class="flex divide-1 divide-solid divide-x divide-gray-300">
          <div class="flex items-center gap-2 pr-3">
            <p class="border-b-1 border-b-solid border-b-[#EE4D2D] text-[#EE4D2D] font-medium">
              {{ productResponseData.rating?.rate }}
            </p>
          </div>
          <div class="flex item gap-2 px-3">
            <p class="font-medium">
              {{ productResponseData.rating?.count }}
            </p>
            <p class="text-gray-500">solded</p>
          </div>
        </div>
        <div class="py-3 px-5 bg-[#FAFAFA] dark:bg-gray-700 rounded-lg flex items-center gap-5">
          <div class="old-price flex items-start text-gray-500 line-through">
            <p>$</p>
            <h2 class="font-medium text-sm">
              218.000
            </h2>
          </div>
          <div class="current-price flex text-[#EE4D2D]">
            <p>$</p>
            <h2 class="font-medium text-3xl">
              {{ productResponseData.price }}
            </h2>
          </div>
        </div>
        <div class="infor">
          <label>weight</label>
          <p>10 gram</p>
          <p class="text-[#EE4D2D] bg-[#FFEEE8] px-1 text-sm ml-5">buy-with-deal</p>
        </div>
        <div class="infor">
          <label>shipping</label>
          <p class="text-sm flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.25em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 512"><path fill="currentColor" d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z" /></svg>
            transport
          </p>
          <div>
            <select name="province" class="cursor-pointer dark:bg-gray-700 rounded-md px-2 appearance-none border-1 border-dashed border-gray-300">
              <option value="" selected hidden disabled>
                Choose province
              </option>
              <option v-for="(province, i) in provinceNames" :key="i" :value="province" class="mt-5 bg-[#FFF5F1] dark:bg-gray-700">
                {{ province }}
              </option>
            </select>
          </div>
        </div>

        <div class="infor">
          <label>category</label>
          <div class="uppercase flex gap-2">
            <p class="box-type" >
              {{ productResponseData.category }}
            </p>
          </div>
        </div>

        <div class="infor">
          <label>quantities</label>
          <div class="uppercase flex items-center rounded-md border-1 border-solid border-gray-300 text-sm">
            <p class="px-2 cursor-pointer hover:bg-[#FAFAFA]" :class="{'pointer-events-none opacity-50': payloadCart.quantity<2}" @click="payloadCart.quantity--">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 12H4" /></svg>
            </p>
            <p class="border-l-1 border-l-solid border-l-gray-300 border-r-1 border-r-solid border-r-gray-300 font-medium px-5 py-1">
              {{ payloadCart.quantity }}
            </p>
            <p class="px-2 cursor-pointer hover:bg-[#FAFAFA]" :class="{'pointer-events-none': payloadCart.quantity >= productStock}" @click="payloadCart.quantity++">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 20v-8m0 0V4m0 8h8m-8 0H4" /></svg>
            </p>
          </div>
          <p class="lowercase text-gray-500">
            {{ productStock }}
          </p>
        </div>
        <div class="flex gap-3">
          <button class="px-5 py-3 rounded-md bg-[#FFEEE8] hover:bg-[#FFF5F1] border-1 border-solid border-[#EE4D2D] text-[#EE4D2D] capitalize flex items-center gap-1" @click="handleAdd">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.4em" height="1.4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M21.08 7a2 2 0 0 0-1.7-1H6.58L6 3.74A1 1 0 0 0 5 3H3a1 1 0 0 0 0 2h1.24L7 15.26A1 1 0 0 0 8 16h9a1 1 0 0 0 .89-.55l3.28-6.56A2 2 0 0 0 21.08 7Zm-4.7 7H8.76L7.13 8h12.25Z" /><circle cx="7.5" cy="19.5" r="1.5" fill="currentColor" /><circle cx="17.5" cy="19.5" r="1.5" fill="currentColor" /></svg>
            add to cart
          </button>
          <button class="px-5 py-3 rounded-md bg-[#EE4D2D] hover:bg-[#F05D40] border-1 border-solid border-[#EE4D2D] text-white capitalize" @click="handleOrder">
            order now
          </button>
          <button v-if="isAdd" class="px-5 py-3 rounded-md bg-[#FFEEE8] hover:bg-[#FFF5F1] border-1 border-solid border-[#EE4D2D] text-[#EE4D2D] capitalize flex items-center gap-1" @click="router.push('/cart')">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.4em" height="1.4em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M21.08 7a2 2 0 0 0-1.7-1H6.58L6 3.74A1 1 0 0 0 5 3H3a1 1 0 0 0 0 2h1.24L7 15.26A1 1 0 0 0 8 16h9a1 1 0 0 0 .89-.55l3.28-6.56A2 2 0 0 0 21.08 7Zm-4.7 7H8.76L7.13 8h12.25Z" /><circle cx="7.5" cy="19.5" r="1.5" fill="currentColor" /><circle cx="17.5" cy="19.5" r="1.5" fill="currentColor" /></svg>View cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.infor{
    display: flex;
    text-transform: capitalize;
    gap: 0.5rem;
}
.infor > label{
    width: 6.8rem;
    font-size: 0.9em;
    color: rgb(107, 114, 128);
    font-weight: 500;
}
.infor .box-type{
  border: 1px solid #e9e9e9;
  cursor: pointer;
  border-radius: 0.3rem;
  padding: 0 0.5rem;
}
.infor .box-type:hover,
.infor .box-type.active{
  color: #EE4D2D;
  border-color: #EE4D2D;
  background: #FFF5F1;
}
.shop-product-container span{
  color: #EE4D2D;
}
.product-details > div:not(:first-child):not(:last-child) {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  gap: 1rem;
}

.product-details label{
  min-width: 8.5rem;
  color: rgb(156, 163, 175);
}
.product-details > div:last-child > p:not(:last-child){
  margin: 0.5rem 0 0.5rem 1rem;
  font-size: 0.875rem;
}
.product-evalutions .customer-cmt p{
  margin: 0 0.5rem 0.5rem 0;
}
@media (max-width: 1000px){
  .main-content{
    flex-wrap: wrap;
  }
  .main-content > div:nth-child(2){
    margin-left: 0.75rem;
  }
}
</style>
