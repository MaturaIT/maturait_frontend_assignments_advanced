import { createApp } from 'vue'
import { VueQueryPlugin } from 'vue-query'
import './index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faStar, faX, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifications from '@kyvg/vue3-notification';

library.add(faShoppingCart, faStar, faX, faHeart)

import App from './App.vue'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueQueryPlugin)
app.use(Notifications)
app.mount('#app')
