import { createApp } from 'vue'
import { VueQueryPlugin } from 'vue-query'
import './index.css'

// Custom icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faStar, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faShoppingCart, faStar, faX)

import App from './App.vue'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueQueryPlugin)
app.mount('#app')
