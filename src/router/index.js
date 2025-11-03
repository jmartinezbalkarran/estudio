import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Add from '../components/Add.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'add',
    component: Add
  },
  // Ruta de redirección por defecto
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router