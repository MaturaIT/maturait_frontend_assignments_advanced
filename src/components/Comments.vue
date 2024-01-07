<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue'
import type { Comment } from '../utils/types'

const props = defineProps(['productId'])

const comments = ref<Comment[]>([])
const newCommentText = ref('')
const newCommentUser = ref('')

const getStorageKey = () => `comments_${props.productId}`

const loadComments = () => {
  const storedComments = localStorage.getItem(getStorageKey())
  if (storedComments) {
    comments.value = JSON.parse(storedComments)
  }
}

const saveComments = () => {
  localStorage.setItem(getStorageKey(), JSON.stringify(comments.value))
}

const addComment = () => {
  const newComment: Comment = {
    id: Date.now(),
    user: newCommentUser.value,
    text: newCommentText.value,
    date: new Date().toISOString()
  }

  comments.value.push(newComment)

  saveComments()
}

onMounted(loadComments)
onBeforeUnmount(saveComments)
</script>

<template>
  <div class="grid grid-cols-1 gap-4 ml-5">
    <h3 class="text-xl font-semibold mb-4">Comments:</h3>

    <ul>
      <li v-for="comment in comments" :key="comment.id" class="mb-4">
        <div class="border p-4 rounded-lg bg-gray-100">
          <p class="text-gray-800">
            <strong>{{ comment.user }}:</strong> {{ comment.text }}
          </p>
          <small class="text-gray-500">{{ new Date(comment.date).toLocaleString() }}</small>
        </div>
      </li>
    </ul>

    <div class="mt-4">
      <div class="flex flex-col md:flex-row gap-4">
        <input
          v-model="newCommentUser"
          id="userName"
          placeholder="Your name"
          type="text"
          maxlength="10"
          class="border rounded-md outline-none focus:border-gray-400 p-2 w-full md:w-1/3"
        />

        <textarea
          v-model="newCommentText"
          placeholder="Add a comment"
          class="border rounded-md outline-none focus:border-gray-400 p-2 w-full md:w-2/3"
          type="text"
          maxlength="20"
          style="resize: none"
        ></textarea>
      </div>

      <button
        @click="addComment"
        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-blue-900 transition-colors"
      >
        Add comment
      </button>
    </div>
  </div>
</template>
