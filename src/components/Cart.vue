<!-- Cart.vue -->
<template>
  <div>
    <div v-for="item in cartItems" :key="item.id">
    </div>
    <div>Total Price: {{ total }}</div>
    <button @click="checkout">Pucharge Now</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: []
    };
  },
  computed: {
    total() {
    }
  },
  methods: {
    removeItem(id) {
    },
    checkout() {
    }
  }
};
</script>
