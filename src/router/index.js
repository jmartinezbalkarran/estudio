import { createRouter, createWebHistory } from 'vue-router'
import Estructura from '../components/Estructura.vue'
import HelloWorld from '../components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    name: 'Estructura',
    component: Estructura
  },
  {
    path: '/helloworld',
    name: 'HelloWorld',
    component: HelloWorld
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