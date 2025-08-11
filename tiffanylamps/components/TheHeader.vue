<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">蒂凡尼灯的艺术世界</div>
      <nav>
        <div class="hamburger" @click="toggleMenu">
          <i class="fas fa-bars"></i>
        </div>
        <ul :class="{ active: isMenuOpen }">
          <li><a href="#home" @click="handleNavClick">首页</a></li>
          <li><a href="#trends" @click="handleNavClick">流行趋势</a></li>
          <li><a href="#hot" @click="handleNavClick">热卖榜单</a></li>
          <li><a href="#history" @click="handleNavClick">历史文化</a></li>
          <li><a href="#auction" @click="handleNavClick">拍卖会</a></li>
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

const handleNavClick = (e) => {
  e.preventDefault()
  const targetId = e.target.getAttribute('href')
  const targetElement = document.querySelector(targetId)
  
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 70,
      behavior: 'smooth'
    })
  }
  isMenuOpen.value = false
}

const handleScroll = () => {
  const header = document.querySelector('.header')
  if (window.scrollY > 100) {
    header.style.backgroundColor = 'rgba(15, 76, 117, 0.9)'
    header.style.padding = '10px 0'
  } else {
    header.style.backgroundColor = 'var(--primary-color)'
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
  background-color: var(--primary-color);
  color: white;
  padding: 20px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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

nav ul li a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
  position: relative;
}

nav ul li a:hover {
  color: var(--accent-color);
}

nav ul li a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: var(--accent-color);
  transition: width 0.3s;
}

nav ul li a:hover::after {
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
    background-color: var(--primary-color);
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