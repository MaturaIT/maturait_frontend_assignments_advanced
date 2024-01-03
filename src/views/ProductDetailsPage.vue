<!-- ProductDetailsPage.vue -->
<template>
  <div>
    <Navbar />
    <ProductDetails />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ProductDetails from '@/components/ProductDetails.vue';

export default {
  components: {
    Navbar,
    ProductDetails
  }
};
</script>
