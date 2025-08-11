<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">蒂凡尼灯的艺术世界</div>
      <nav>
        <div class="hamburger" @click="toggleMenu">
          <i class="fas fa-bars"></i>
        </div>
        <ul :class="{ active: isMenuOpen }">
          <li><NuxtLink to="/" @click="closeMenu">首页</NuxtLink></li>
          <li><NuxtLink to="/trends" @click="closeMenu">流行趋势</NuxtLink></li>
          <li><NuxtLink to="/hot" @click="closeMenu">热卖榜单</NuxtLink></li>
          <li><NuxtLink to="/history" @click="closeMenu">历史文化</NuxtLink></li>
          <li><NuxtLink to="/auction" @click="closeMenu">拍卖会</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 点击菜单后关闭移动端菜单
const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  const header = document.querySelector('.header')
  if (window.scrollY > 100) {
    header.style.padding = '10px 0'
  } else {
    header.style.padding = '20px 0'
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  font-family: var(--header-font);
  font-size: 1.8rem;
  font-weight: bold;
}

nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin-left: 30px;
}

nav ul li a,
nav ul li :deep(a),
nav ul li :deep(.router-link-active),
nav ul li :deep(.router-link-exact-active),
nav ul li :deep(.nuxt-link-active),
nav ul li :deep(.nuxt-link-exact-active),
nav ul li :deep(.router-link),
nav ul li :deep(.nuxt-link) {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
  position: relative;
}

nav ul li a::after,
nav ul li :deep(a)::after,
nav ul li :deep(.nuxt-link)::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  transition: width 0.3s;
}

nav ul li a:hover::after,
nav ul li :deep(a:hover)::after,
nav ul li :deep(.nuxt-link:hover)::after {
  width: 100%;
}

.hamburger {
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
}

@media screen and (max-width: 768px) {
  .hamburger {
    display: block;
  }
  
  nav ul {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: left 0.3s;
  }
  
  nav ul.active {
    left: 0;
  }
  
  nav ul li {
    margin: 20px 0;
  }
}
</style>