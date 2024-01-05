import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import router from './router/index'
import { VueQueryPlugin } from 'vue-query'

import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(VueQueryPlugin)
app.use(ToastPlugin)
app.mount('#app')
