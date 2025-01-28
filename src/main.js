import { createApp } from 'vue'
import App from './App.vue'

import './style.css'

import router from './router/'

createApp(App).mount('#app')
App.use(router)
