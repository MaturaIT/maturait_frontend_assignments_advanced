import { createApp } from 'vue'
import '@/index.css'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from '@/App.vue'
import { router } from '@/router'
import { createPinia } from 'pinia'

const app = createApp(App)
const piniaInstance = createPinia()

app.use(router)
app.use(VueQueryPlugin)
app.use(piniaInstance)

app.mount('#app')
