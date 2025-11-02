/*
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
*/



import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'  // Importar el router

const app = createApp(App)
app.use(router)  // Usar el router
app.mount('#app')