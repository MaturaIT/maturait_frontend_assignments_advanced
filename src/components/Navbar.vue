
<script>
import Brand from '@/components/head/Brand.vue';
import MenuItem from '@/components/head/MenuItem.vue';
import Search from '@/components/head/Search.vue';
import CBList from '@/components/head/CBList.vue';

export default {
  components: {
    Brand,
    Search,
    MenuItem,
    CBList
  }
};
</script>

<template>
  <div class="head-container bg-gradient-to-b from-[#F53F2D] to-orange-400 relative">
    <div class="flex justify-around items-center h-28">
      <Brand class="item3" />
      <Search class="item5" />
      <CBList class="item4" />
    </div>
    <MenuItem />
  </div>
</template>

<style scoped>
span{
  animation: timeshow-animate 3.8s linear infinite;
  transform-origin: left;
}
.item6 {
  display: none;
}
@keyframes timeshow-animate {
  0%{
    width: 0;
  }
  100%{
    width: 100%;
  }
}
@media (max-width: 992px){
  .head-container {
    padding: 0.5rem;
    height: 10rem;
  }
  .item3 {
    grid-area: main;
    display: flex;
  }
  .item4 {
    grid-area: right;
    display: hidden;
  }
  .item5 {
    display: none;
  }
}
</style>
