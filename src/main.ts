import { faShoppingCart, faStar, faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import Notifications from '@kyvg/vue3-notification'
import { VueQueryPlugin } from 'vue-query'
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)

library.add(faShoppingCart, faStar, faX, faHeart)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueQueryPlugin)
app.use(Notifications)
app.mount('#app')
