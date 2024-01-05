<template>
  <div class="container pb-16 mb-6 mt-6">
    <div class="flex flex-col gap-8">
      <span v-if="isLoading">
        <LoaderComponent />
      </span>
      <span v-if="isError">
        <ErrorComponent />
      </span>
      <div v-if="!isLoading && !isError && data">
        <ProductDetails :singleproduct="data" />
      </div>
      <CommentSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { singleProduct } from '@/fetch/useFetch'
import { useQuery } from 'vue-query'
import { type Product } from '@/types/product'
import LoaderComponent from '@/components/reusable/LoaderComponent.vue'
import ErrorComponent from '@/components/reusable/ErrorComponent.vue'
import NotFoundProduct from '@/components/reusable/NotFoundProduct.vue'
import { useRouter } from 'vue-router'
import ProductDetails from '@/components/reusable/ProductDetails.vue'
import CommentSection from '@/components/ProductComponents/CommentSection.vue'

const router = useRouter()

const prodID = Number(router.currentRoute.value.params.id)

const { data, isLoading, isError } = useQuery<Product | undefined>(['singleProduct', prodID], () =>
  singleProduct(prodID)
)
</script>
