import { createApp } from 'vue'
import './index.css'
import router from './router/index'
import { VueQueryPlugin } from 'vue-query'

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')
