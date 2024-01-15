
<script>
  import { ref } from 'vue';
  import ProductRequest from '@/services/product-request'
  import CProductCardGrid from '@/components/CProductCardGrid.vue';
  import RProductCardGrid from '@/components/RProductCardGrid.vue';

  export default {
    components: {
      CProductCardGrid,
      RProductCardGrid
    },

    data() {
      return {
        loading: true,
        products: ref([]),
        searchQuery: "",
      };
    },
    computed: {
      filteredProducts() {
        return this.products.filter(product =>
          product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      async fetchProducts() {
        try {
          this.loading = true;
          this.products = await ProductRequest.searchProducts();
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      },
      addToCart(product) {
        this.$store.commit('addToCart', product);
      },
    },
    mounted() {
      this.fetchProducts();
    },
  };
</script>
<!-- ProductList.vue -->
<template>    
  <div class="hint-today-container my-10">
    <div class="flex flex-wrap gap-3 py-3">
      <div v-if="loading" class="grid-products-list flex justify-center flex-wrap gap-5 py-10">
        <RProductCardGrid v-for="index in 12" :key="index" />
      </div>
      <div v-else class="grid-products-list flex justify-center flex-wrap gap-5 py-10">
        <div v-for="(prod, index) in filteredProducts" :key="index" class="card duration-200 ease-linear relative rounded-lg w-60 shadow-md dark:bg-gray-700 hover:shadow-gray-400/50 pb-0 flex justify-between flex-col">
          <CProductCardGrid :card="prod" mode="feature" />
        </div>
      </div>
    </div>
  </div>
</template>

