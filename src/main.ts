import { createApp } from 'vue'
import './index.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router).use(autoAnimatePlugin).mount('#app')
