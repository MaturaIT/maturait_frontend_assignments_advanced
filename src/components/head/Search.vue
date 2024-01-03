<script setup>
import { keyword } from '@/stores/keyword'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const useKeyword = keyword()
const key = ref(useKeyword.savedKeyword)

const router = useRouter()

const go = async() => {
  if (key.value) {
    await router.push(`/search/${encodeURIComponent(key.value)}`)
    await location.reload()
    key.value = ''
  }
}

</script>

<template>
  <div class="flex rounded-3xl shadow-lg shadow-gray-500/50 h-10">
    <div class="search-container w-md <lg:w-xl flex justify-center items-center overflow-hidden">
      <input v-model="key" type="text" placeholder="Search" aria-label="Search" class="outline-none w-full h-full text-md px-5 rounded-l-3xl" @keydown.enter="go">
      <button class="text-white flex items-center bg-black hover:bg-opacity-70 rounded-r-3xl h-full px-4" :disabled="!key" @click="go">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.7em" height="1.7em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396l1.414-1.414l-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8s3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6s-6-2.691-6-6s2.691-6 6-6z" /><path fill="currentColor" d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z" /></svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
  @media (max-width: 992px){
    .search-container{
      width: 100%;
    }
  }
</style>
