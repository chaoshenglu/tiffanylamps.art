<template>
  <div id="app">
    <Header />
    <Banner />
    <CategoryPortal />
    <PopularProducts />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Banner from './components/Banner.vue'
import CategoryPortal from './components/CategoryPortal.vue'
import PopularProducts from './components/PopularProducts.vue'
import Footer from './components/Footer.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
