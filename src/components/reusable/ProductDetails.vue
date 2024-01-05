<script setup lang="ts">
const { singleproduct } = defineProps(['singleproduct'])
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-800 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row -mx-4">
        <div class="md:flex-1 px-4">
          <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
            <img
              class="object-cover w-full h-full"
              :src="singleproduct.image"
              alt="Product Image"
            />
          </div>
          <div class="flex -mx-2 mb-4">
            <div class="w-1/2 px-2">
              <button
                class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
              >
                Add to Cart
              </button>
            </div>
            <div class="w-1/2 px-2">
              <button
                class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
        <div class="md:flex-1 px-4">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {{ singleproduct.title }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-lg mb-4 font-semibold">
            {{ singleproduct.category }}
          </p>
          <div class="flex mb-4">
            <div class="mr-4">
              <span class="font-bold text-gray-700 dark:text-gray-300">Price:</span>
              <span class="text-gray-600 dark:text-gray-300 ml-1"
                >{{ singleproduct.price.toFixed(2) }}$</span
              >
            </div>
            <div>
              <span class="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
              <span class="text-gray-600 dark:text-gray-300 ml-1">In Stock</span>
            </div>
          </div>
          <div class="mb-4">
            <div class="flex flex-col gap-1 my-2">
              <div class="text-md text-gray-500 dark:text-gray-300 font-semibold">
                reviews: {{ singleproduct.rating.count }}
              </div>
              <div class="flex gap-1 text-md text-yellow-500 font-semibold">
                rating: {{ singleproduct.rating.rate }} / 5.0
              </div>
            </div>
          </div>

          <div>
            <span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
            <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
              {{ singleproduct.description }}
            </p>
          </div>
          <div class="my-2">
            <div class="inline-flex items-center mt-2">
              <button
                class="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <div
                class="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none"
              >
                2
              </div>
              <button
                class="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
