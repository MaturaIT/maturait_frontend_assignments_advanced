<!-- ProductDetails.vue -->
<template>
  <div>
    <div v-if="loading">loading...</div>
    <div v-else>
      <h1>{{ product.title }}</h1>
      <p>{{ product.price }}</p>
      <img :src="product.image" alt="Product Image" />
      <button @click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { mapMutations } from 'vuex';
import { fakestoreApi } from '@/api/fakestoreApi';

export default {
  data() {
    return {
      loading: true,
      product: {},
    };
  },
  methods: {
    async fetchProductDetails() {
      try {
        this.loading = true;
        const productId = this.$route.params.id;
        this.product = await fakestoreApi.getProductDetails(productId);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    addToCart() {
      this.$store.commit('addToCart', this.product);
    },
  },
  mounted() {
    this.fetchProductDetails();
  },
};
</script>
