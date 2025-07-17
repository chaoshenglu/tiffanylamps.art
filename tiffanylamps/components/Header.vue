<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <img class="logo-icon" src="/assets/logo.webp" />
      </div>
      <nav class="nav">
        <NuxtLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">Home</NuxtLink>
        <NuxtLink to="/products" class="nav-link" :class="{ active: $route.path === '/products' }">Products</NuxtLink>
        <NuxtLink to="/categories" class="nav-link" :class="{ active: $route.path === '/categories' }">Categories</NuxtLink>
        <NuxtLink to="/contact" class="nav-link" :class="{ active: $route.path === '/contact' }">Contact</NuxtLink>
      </nav>
      <div class="search">
        <input type="text" placeholder="Search Products..." class="search-input">
        <button class="search-btn">🔍</button>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: bold;
  color: #8B5CF6;
}

.logo-icon {
  height: 40px;
}

.nav {
  display: flex;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: #8B5CF6;
}

.search {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 25px;
  padding: 8px 15px;
  width: 300px;
}

.search-input {
  border: none;
  background: none;
  outline: none;
  flex: 1;
  padding: 5px;
  font-size: 14px;
}

.search-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
    height: 60px;
  }
  
  .logo {
    font-size: 20px;
  }
  
  .logo-icon {
    font-size: 24px;
  }
  
  .nav {
    display: none;
  }
  
  .search {
    width: 180px;
  }
  
  .search-input {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 10px;
  }
  
  .search {
    width: 150px;
  }
}
</style>