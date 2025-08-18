<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <h1>Tiffany Lamps Art</h1>
          </NuxtLink>
        </div>
        
        <div class="nav-links">
          <NuxtLink :to="localePath('/')" class="nav-link">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink :to="localePath('/cases')" class="nav-link">{{ $t('nav.cases') }}</NuxtLink>
          <NuxtLink :to="localePath('/trends')" class="nav-link">{{ $t('nav.trends') }}</NuxtLink>
          <NuxtLink :to="localePath('/hot')" class="nav-link">{{ $t('nav.hot') }}</NuxtLink>
          <NuxtLink :to="localePath('/auctions')" class="nav-link">{{ $t('nav.auctions') }}</NuxtLink>
          <NuxtLink :to="localePath('/culture')" class="nav-link">{{ $t('nav.culture') }}</NuxtLink>
        </div>
        
        <div class="nav-right">
          <div class="search-box">
            <input type="text" :placeholder="$t('nav.search')" class="search-input" />
            <button class="search-button">
              <span class="search-icon">🔍</span>
            </button>
          </div>
          
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { localePath } = useI18n()
</script>

<style scoped>
.navbar {
  padding: 1rem 0;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  text-decoration: none;
}

.logo h1 {
  font-size: 1.5rem;
  color: var(--tiffany-blue);
  margin: 0;
  font-weight: 400;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: var(--deep-brown);
  font-weight: 500;
  position: relative;
}

.nav-link:hover {
  color: var(--tiffany-blue);
}

.nav-link.router-link-active {
  color: var(--tiffany-blue);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--tiffany-blue);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0.25rem 0.5rem;
  background: var(--soft-gray);
}

.search-input {
  border: none;
  background: transparent;
  padding: 0.25rem;
  outline: none;
  width: 150px;
}

.search-button {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .nav-right {
    width: 100%;
    justify-content: center;
  }
}
</style>