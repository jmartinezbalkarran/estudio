    <!-- 
<script setup>
import Estructura from './components/Estructura.vue'
</script>

<template>

  <Estructura/>

</template>

<style scoped>

</style>
-->
<template>
  <div id="app">
  <!--  <nav>
      <router-link to="/">Estructura</router-link> | 
      <router-link to="/helloworld">Hello World</router-link>
    </nav>-->
    
    <!-- Aquí se renderizarán tus componentes -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 15px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

nav a:hover {
  background-color: #42b983;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}
</style>
