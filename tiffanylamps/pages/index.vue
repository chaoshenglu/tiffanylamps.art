<template>
  <div class="whole-layout min-h-screen bg-black text-white font-sans">
    <!-- Header -->
    <AppHeader @toggle-side-menu="toggleSideMenu" @toggle-mobile-menu="toggleMobileMenu" />

    <!-- Main Content -->
    <main class="relative">
      <!-- Hero Slider -->
      <section class="relative h-screen overflow-hidden">
        <div class="absolute inset-0">
          <!-- Slider Container -->
          <div class="relative w-full h-full">
            <div 
               v-for="(slide, index) in slides" 
               :key="index"
               :class="[
                 'absolute inset-0 transition-all duration-1000 ease-in-out',
                 currentSlide === index ? 'opacity-100' : 'opacity-0'
               ]"
             >
               <div 
                  class="slider-image"
                  :style="{ 
                     backgroundImage: `url(${slide.image})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat',
                     width: 'calc(100% + 200px)',
                     height: 'calc(100% + 200px)',
                     position: 'absolute',
                     top: '-100px',
                     left: '-100px',
                     transform: currentSlide === index ? `translate(${slide.animationX}px, ${slide.animationY}px) scale(1.1)` : 'translate(0, 0) scale(1)',
                     transition: 'transform 7s ease-in-out'
                   }"
                >
              </div>
            </div>
          </div>

          <!-- Slider Navigation -->
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            <button 
              v-for="(slide, index) in slides" 
              :key="index"
              @click="goToSlide(index)"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300',
                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              ]"
            ></button>
          </div>

          <!-- Slider Arrows -->
          <button 
            @click="prevSlide" 
            class="absolute left-9 top-1/2 transform -translate-y-1/2"
          >
            <img src="/assets/chevron-left.svg" alt="Previous" class="w-40px h-40px" />
          </button>
          <button 
            @click="nextSlide" 
            class="absolute right-9 top-1/2 transform -translate-y-1/2"
          >
            <img src="/assets/chevron-right.svg" alt="Next" class="w-40px h-40px" />
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// SEO Meta
useHead({
  title: '蒂凡尼灯艺术 - 传承经典工艺，创新现代设计',
  meta: [
    { name: 'description', content: '专注于蒂凡尼灯艺术的创作与展示，传承经典工艺，创新现代设计。探索光影艺术的无限可能。' },
    { name: 'keywords', content: '蒂凡尼灯,艺术灯具,手工艺术,彩色玻璃,装饰灯,艺术品' },
    { property: 'og:title', content: '蒂凡尼灯艺术 - 传承经典工艺，创新现代设计' },
    { property: 'og:description', content: '专注于蒂凡尼灯艺术的创作与展示，传承经典工艺，创新现代设计。' },
    { property: 'og:type', content: 'website' }
  ]
})

const currentSlide = ref(0)
const autoplayInterval = ref(null)

// Generate random animation values for each slide
const generateRandomAnimation = () => {
  return {
    animationX: Math.random() * 200 - 100, // -100 to 100px
    animationY: Math.random() * 200 - 100  // -100 to 100px
  }
}

// Slides data
const slides = ref([
  {
    id: 1,
    title: '经典蒂凡尼艺术',
    description: '传承百年工艺，每一片玻璃都诉说着光影的故事',
    image: 'https://r2.tiffanylamps.art/poster/poster1.webp',
    ...generateRandomAnimation()
  },
  {
    id: 2,
    title: '现代创新设计',
    description: '融合当代美学，重新定义光影艺术的边界',
    image: 'https://r2.tiffanylamps.art/poster/poster2.webp',
    ...generateRandomAnimation()
  }
])

// Recent works data
const recentWorks = ref([
  { id: 1, title: '花园系列', thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop' },
  { id: 2, title: '海洋系列', thumbnail: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&h=300&fit=crop' },
  { id: 3, title: '森林系列', thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
  { id: 4, title: '星空系列', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop' },
  { id: 5, title: '抽象系列', thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop' },
  { id: 6, title: '几何系列', thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop' }
])

const toggleMobileMenu = () => {
  // Mobile menu logic
  console.log('Toggle mobile menu')
}

const goToSlide = (index) => {
  currentSlide.value = index
  // Regenerate random animation for the new slide
  slides.value[index] = { ...slides.value[index], ...generateRandomAnimation() }
  resetAutoplay()
}

const nextSlide = () => {
  const nextIndex = (currentSlide.value + 1) % slides.value.length
  currentSlide.value = nextIndex
  // Regenerate random animation for the new slide
  slides.value[nextIndex] = { ...slides.value[nextIndex], ...generateRandomAnimation() }
  resetAutoplay()
}

const prevSlide = () => {
  const prevIndex = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
  currentSlide.value = prevIndex
  // Regenerate random animation for the new slide
  slides.value[prevIndex] = { ...slides.value[prevIndex], ...generateRandomAnimation() }
  resetAutoplay()
}

const startAutoplay = () => {
  autoplayInterval.value = setInterval(() => {
    nextSlide()
  }, 7000)
}

const resetAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
  startAutoplay()
}

// Lifecycle
onMounted(() => {

  // Start autoplay
  startAutoplay()
})

onUnmounted(() => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
  }
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
/* Font Awesome Icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

/* Custom animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

.animation-delay-300 {
  animation-delay: 0.3s;
  animation-fill-mode: both;
}

.animation-delay-600 {
  animation-delay: 0.6s;
  animation-fill-mode: both;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}
</style>