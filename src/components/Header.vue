<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <span class="logo-icon">🔮</span>
        <span class="logo-text">WooNust</span>
      </div>
      <nav class="nav">
        <a href="#" class="nav-link active">Home</a>
        <a href="#" class="nav-link">Products</a>
        <a href="#" class="nav-link">Categories</a>
        <a href="#" class="nav-link">Contact</a>
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
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
  font-size: 28px;
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
  }
  
  .nav {
    display: none;
  }
  
  .search {
    width: 200px;
  }
}
</style>