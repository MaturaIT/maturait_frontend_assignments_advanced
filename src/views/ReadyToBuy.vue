<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { useStore } from '@/store/Store'
import { useRouter } from 'vue-router'
import { type customerInformation } from '@/types/product'
import ConfettiExplosion from 'vue-confetti-explosion'

const store = useStore()
const router = useRouter()

const visible = ref(false)
const cartData = ref(store.$state.cartItems)
const clientInfo = ref<customerInformation>(store.$state.customerInformation)
// const saveCustomerInfo = ref(false)
const disableForm = ref(false)

watch(
  () => store.$state.cartItems,
  (newCart) => {
    cartData.value = newCart
  }
)

onMounted(() => {
  store.resetChangeToCheckout()
})

const explode = async () => {
  visible.value = false
  await nextTick()
  visible.value = true
}

function PurchaseHandler() {
  disableForm.value = true
  // if (saveForm === true) {
  //   store.AddCustomerInformation(clientInfo.value)
  // }
  store.AddCustomerInformation(clientInfo.value)
  console.log(store.customerInformation)
  explode()
  setTimeout(() => {
    store.ResetAfterPurchase()
    router.push({ name: 'home' })
  }, 1000)
  disableForm.value = false
}
</script>

<template>
  <ConfettiExplosion v-if="visible" />
  <div class="container p-12 mx-auto">
    <div class="flex flex-col w-full px-0 mx-auto md:flex-row">
      <div class="flex flex-col md:w-full">
        <h2 class="mb-4 font-bold md:text-xl text-heading dark:text-white">Shipping Address</h2>
        <form class="justify-center w-full mx-auto" @submit.prevent="PurchaseHandler">
          <div class="">
            <div class="space-x-0 lg:flex lg:space-x-4">
              <div class="w-full lg:w-1/2">
                <label
                  for="firstName"
                  class="block mb-3 text-sm font-semibold text-gray-500 dark:text-gray-300"
                  >First Name</label
                >
                <input
                  :disabled="disableForm"
                  required
                  v-model="clientInfo.FirstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div class="w-full lg:w-1/2">
                <label
                  for="Last Name"
                  class="block mb-3 text-sm font-semibold text-gray-500 dark:text-gray-300"
                  >Last Name</label
                >
                <input
                  :disabled="disableForm"
                  required
                  v-model="clientInfo.LastName"
                  name="Last Name"
                  type="text"
                  placeholder="Last Name"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div class="mt-4">
              <div class="w-full">
                <label
                  for="Email"
                  class="block mb-3 text-sm font-semibold text-gray-500 dark:text-gray-300"
                  >Email</label
                >
                <input
                  :disabled="disableForm"
                  required
                  v-model="clientInfo.Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div class="mt-4">
              <div class="w-full">
                <label
                  for="Address"
                  class="block mb-3 text-sm font-semibold text-gray-500 dark:text-gray-300"
                  >Address</label
                >
                <textarea
                  :disabled="disableForm"
                  required
                  v-model="clientInfo.Address"
                  class="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                  name="Address"
                  cols="20"
                  rows="4"
                  placeholder="Address"
                ></textarea>
              </div>
            </div>
            <div class="space-x-0 lg:flex lg:space-x-4">
              <div class="w-full lg:w-1/2">
                <label
                  for="city"
                  class="block mb-3 text-sm font-semibold text-gray-500 dark:text-gray-300"
                  >City</label
                >
                <input
                  :disabled="disableForm"
                  required
                  v-model="clientInfo.City"
                  name="city"
                  type="text"
                  placeholder="City"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div class="w-full lg:w-1/2">
                <label
                  for="postcode"
                  class="block mb-3 text-sm font-semibold text-gray-500 dark:text-gray-300"
                >
                  Postcode</label
                >
                <input
                  pattern="[0-9]{5}"
                  :disabled="disableForm"
                  required
                  v-model="clientInfo.Postcode"
                  name="postcode"
                  type="text"
                  placeholder="Post Code"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div class="mt-4">
              <button
                type="submit"
                class="w-full px-6 py-2 dark:text-white dark:bg-gray-700 dark:hover:bg-black dark:focus:ring-black text-gray-100 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg"
              >
                Process
              </button>
            </div>
          </div>
        </form>
        <div class="flex items-center mt-4">
          <p class="text-sm text-gray-500 dark:text-gray-300">
            Your information will be saved for next time
          </p>
        </div>
        <!-- <div class="flex items-center mt-4">
          <label class="flex items-center text-sm group text-heading">
            <input
              :disabled="disableForm"
              required
              type="checkbox"
              class="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
            />
            <span class="ml-2 dark:text-gray-300 text-gray-500"
              >Save this information for next time</span
            ></label
          >
        </div> -->
      </div>
      <div class="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5 sm:ml-6">
        <div class="pt-12 md:pt-0 2xl:ps-4">
          <h2 class="text-xl font-bold dark:text-gray-300">Order Summary</h2>
          <div class="mt-8">
            <div class="flex flex-col space-y-4">
              <!-- // cart items -->
              <div class="flex space-x-4" v-for="(item, index) in cartData" :key="index">
                <div>
                  <img :src="item.image" alt="product image" class="w-56 h-28 object-contain" />
                </div>
                <div class="flex flex-col items-start justify-center gap-2">
                  <h2 class="text-xl font-bold dark:text-gray-300">
                    {{ item.title.trim().slice(0, 20) }}...
                  </h2>
                  <div class="flex gap-1 dark:text-gray-300">
                    <span class="text-red-600 dark:text-red-800">Price</span>
                    {{ item.price.toFixed(2) }}$
                  </div>
                  <span class="text-md font-semibold dark:text-gray-300"
                    >quantity: {{ item.quantity }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="flex p-4 mt-4">
            <h2 class="text-xl font-bold dark:text-gray-300">ITEMS ({{ cartData.length }})</h2>
          </div>
          <div
            class="dark:text-gray-300 flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0"
          >
            Subtotal<span class="ml-2 dark:text-gray-300">{{ store.totalPrice.toFixed(2) }}$</span>
          </div>
          <div
            class="dark:text-gray-300 flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0"
          >
            Shipping Tax<span class="ml-2 dark:text-gray-300">4.99$</span>
          </div>
          <div
            class="dark:text-gray-300 flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0"
          >
            Total<span class="ml-2 dark:text-gray-300"
              >{{ (store.totalPrice + 4.99).toFixed(2) }}$</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
