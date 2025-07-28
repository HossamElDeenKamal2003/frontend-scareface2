import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// import './assets/main.css' // Remove this line

createApp(App).use(router).mount('#app')