<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { ref, onMounted } from 'vue'
import { type Comments } from '@/types/product'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/formatDate'

const router = useRouter()

const id = Number(router.currentRoute.value.params.id)

const commentsData = ref<Comments[]>([])
const commentText = ref('')

const commentsRef = useLocalStorage<Comments[]>(`productid_${id}`, [], {})

onMounted(() => {
  loadComments()
})

function addComment() {
  const newComment = {
    username: uniqueID(),
    text: commentText.value,
    timestamp: new Date().toISOString()
  }

  const existingComments = commentsRef.value
  commentsRef.value = [...existingComments, newComment]

  commentText.value = ''

  loadComments()
}

function uniqueID() {
  return Math.floor(Math.random() * Date.now())
}

function deleteComment(index: number) {
  const existingComments = commentsRef.value

  if (index >= 0 && index < existingComments.length) {
    existingComments.splice(index, 1)
    commentsRef.value = [...existingComments]
  }

  loadComments()
}

function loadComments() {
  commentsData.value = commentsRef.value
}
</script>

<template>
  <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
    <div class="max-w-2xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Discussion ({{ commentsData.length && commentsData.length }})
        </h2>
      </div>
      <form class="mb-6" @submit.prevent="addComment">
        <div
          class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <label for="comment" class="sr-only">Your comment</label>
          <textarea
            v-model="commentText"
            id="comment"
            rows="6"
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
        >
          Post comment
        </button>
      </form>
      <div
        v-if="commentsData.length === 0"
        class="text-white px-2 py-1 bg-blue-400 w-max rounded-md dark:bg-slate-600 dark:text-slate-100"
      >
        No comments found
      </div>
      <article
        v-else
        class="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
        v-for="(comment, index) in commentsData"
        :key="index"
      >
        <footer class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <p
              class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
            >
              User: {{ comment.username }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              <time pubdate :datetime="comment.timestamp" :title="comment.timestamp">{{
                formatDate(comment.timestamp)
              }}</time>
            </p>
            <button
              @click="deleteComment(index)"
              type="button"
              class="ml-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-md text-sm px-3 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Delete
            </button>
          </div>
          <button
            id="dropdownComment1Button"
            data-dropdown-toggle="dropdownComment1"
            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path
                d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
              />
            </svg>
            <span class="sr-only">Comment settings</span>
          </button>
          <!-- Dropdown menu -->
          <div
            id="dropdownComment1"
            class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Edit</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Remove</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Report</a
                >
              </li>
            </ul>
          </div>
        </footer>
        <p class="text-gray-500 dark:text-gray-400">
          {{ comment.text }}
        </p>
      </article>
    </div>
  </section>
</template>
