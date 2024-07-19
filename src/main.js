import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.css' // Corregido a 'bootstrap'


createApp(App).use(store).use(router).mount('#app')


import 'bootstrap/dist/js/bootstrap' // Corregido a 'bootstrap'