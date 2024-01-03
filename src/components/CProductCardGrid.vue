<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import StarRating from 'vue-star-rating';
import { useLoading } from '@/stores/loading';
import { toast } from '@/stores/toast';
import { useSeller } from '@/stores/seller';
import { useProduct } from '@/stores/product';
import { handleDate } from '@/utils/date';
import { productStatus } from '@/utils/status';
import { sliceText } from '@/utils/textHandle';
import { getResources } from '@/utils/resources';
import ShopRequest from '@/services/shop-request';
import ProductRequest from '@/services/product-request';
import AccountRequest from '@/services/account-request';
import CartRequest from '@/services/cart-request';
import OrderRequest from '@/services/order-request';

const router = useRouter()
const useToast = toast()
const product = useProduct()

const props = defineProps({
  card: Object,
  mode: String,
})

const productPrice = ref()

// ------------------- VISIST PRODUCT DETAIL --------------
const onVisitProduct = (prod_id, shop_id) => {
  product.productRequestID = prod_id
  product.shopRequestID = shop_id
  router.push(`/products/${encodeURIComponent(prod_id)}`)
}

</script>

<template>
  <div v-if="props.mode === 'discount'" class="card-type flex justify-between absolute w-full p-2 z-1">
    <span class="bg-green-600 text-white font-bold capitalize text-xs rounded p-0.75">-10%</span>
    <span class="bg-orange-400 text-white font-bold capitalize text-xs rounded p-0.75">new</span>
  </div>
  <div class="split third rounded-lg z-0 my-auto mx-0 cover" @click="onVisitProduct(props.card.id, props.card.shop_id)">
    <img class="first-img rounded-t-lg w-full max-h-80" :src="`${props.card.image}`" alt="product_img">
  </div>
  <div class="product-description text-left p-2">
    <p class="card-title cursor-pointer duration-200 ease-linear hover:text-[#FF6600] dark:text-gray-300 text-sm" @click="onVisitProduct(props.card.id, props.card.shop_id)">
      {{ sliceText(props.card.title) }}...
    </p>
    <div class="flex items-center justify-between my-2">
      <h6 class="card-price font-bold tracking-tighter text-red-500">
        {{ productPrice }}
      </h6>
    </div>
    <div class="flex justify-between">
      <!-- <star-rating :rating="4.67" :round-start-rating="false"></star-rating> -->
      <div class="star-rating flex justify-start">
        Rate: {{ props.card.rating.rate }}
      </div>
      <h6 class="dark:text-gray-300">
        Price: {{ props.card.price }}
      </h6>
    </div>
  </div>
</template>

<style scoped>
.split.third {
    display: block;
    overflow: hidden;
    cursor: pointer;
}
.split.third img {
    width: 100%;
    height: auto;
    -webkit-transition: -webkit-transform 0.8s ease;
            transition: -webkit-transform 0.8s ease;
            transition: transform 0.8s ease;
            transition: transform 0.8s ease, -webkit-transform 1s ease;
}
.split.third:hover img {
    -webkit-transform: scale(1.15);
            transform: scale(1.15);
}
</style>
