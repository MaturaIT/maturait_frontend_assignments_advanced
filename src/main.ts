// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createPinia } from 'pinia';

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import './styles/main.css'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.use(router);
app.use(store);
app.mount('#app');
