<template>
  <div class="whole-layout min-h-screen bg-black text-white font-sans">
    <!-- Preloader -->
    <div v-if="isLoading" class="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div class="preload-content text-center">
        <div class="preloader-animation">
          <div class="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
        <button @click="skipPreloader" class="text-white hover:text-gray-300 transition-colors">
          <i class="fa fa-times"></i> Skip
        </button>
      </div>
    </div>

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
            class="absolute left-9 top-1/2 transform -translate-y-1/2 text-white transition-colors text-5xl"
          >
            <i class="fa fa-chevron-left"></i>
          </button>
          <button 
            @click="nextSlide" 
            class="absolute right-9 top-1/2 transform -translate-y-1/2 text-white transition-colors text-5xl"
          >
            <i class="fa fa-chevron-right"></i>
          </button>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo & Description -->
           <div class="md:col-span-1">
             <div class="h-12 mb-4 flex items-center">
               <span class="text-2xl font-bold text-white">蒂凡尼灯艺术</span>
             </div>
             <p class="text-gray-400 text-sm leading-relaxed">
               专注于蒂凡尼灯艺术的创作与展示，传承经典工艺，创新现代设计。
             </p>
           </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">联系方式</h3>
            <p class="text-gray-400 text-sm mb-2">
              <strong>管理部:</strong> +86 138 0013 8000
            </p>
            <p class="text-gray-400 text-sm">
              <strong>工作室:</strong> +86 138 0013 8001
            </p>
          </div>

          <!-- Address -->
          <div>
            <h3 class="text-lg font-semibold mb-4">工作室地址</h3>
            <p class="text-gray-400 text-sm">
              <strong>地址:</strong> 北京市朝阳区艺术区创意园
            </p>
          </div>

          <!-- Social Media -->
          <div>
            <h3 class="text-lg font-semibold mb-4">关注我们</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors text-xl">
                <i class="fab fa-weibo"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors text-xl">
                <i class="fab fa-wechat"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors text-xl">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors text-xl">
                <i class="fab fa-douyin"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-gray-800 mt-8 pt-8 text-center">
          <p class="text-gray-400 text-sm">
            © 2024 蒂凡尼灯艺术. 保留所有权利. | 网站由 
            <a href="#" class="text-blue-400 hover:text-blue-300 transition-colors">创意工作室</a> 设计制作
          </p>
        </div>
      </div>
    </footer>

    <!-- Side Menu -->
    <nav 
      :class="[
        'fixed top-0 right-0 h-full w-80 bg-gray-900 text-white transform transition-transform duration-300 z-50',
        sideMenuOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div class="p-6 h-full overflow-y-auto">
        <!-- Close Button -->
        <button 
          @click="toggleSideMenu" 
          class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors text-xl"
        >
          <i class="fa fa-times"></i>
        </button>

        <!-- Side Menu Content -->
         <div class="mt-12">
           <div class="w-full h-48 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg mb-6 flex items-center justify-center">
             <span class="text-white text-xl font-semibold">蒂凡尼灯艺术</span>
           </div>
          
          <h3 class="text-xl font-semibold mb-4">蒂凡尼灯艺术工作室</h3>
          <p class="text-gray-300 text-sm leading-relaxed mb-6">
            我们致力于传承和发扬蒂凡尼灯的经典工艺，结合现代设计理念，创作出独具特色的艺术作品。每一盏灯都承载着匠人的心血和对美的追求。
          </p>

          <!-- Social Links -->
          <div class="flex space-x-4 mb-8">
            <a href="#" class="text-gray-400 hover:text-white transition-colors text-xl">
              <i class="fab fa-weibo"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors text-xl">
              <i class="fab fa-wechat"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors text-xl">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors text-xl">
              <i class="fab fa-douyin"></i>
            </a>
          </div>

          <!-- Recent Works -->
          <h4 class="text-lg font-semibold mb-4">最新作品</h4>
          <div class="grid grid-cols-3 gap-2">
            <div v-for="work in recentWorks" :key="work.id" class="aspect-square">
              <img 
                :src="work.thumbnail" 
                :alt="work.title" 
                class="w-full h-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                @click="openLightbox(work)"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Overlay -->
    <div 
      v-if="sideMenuOpen" 
      @click="toggleSideMenu" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
    ></div>

    <!-- Back to Top -->
    <button 
      v-if="showBackToTop" 
      @click="scrollToTop" 
      class="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-30"
    >
      <i class="fa fa-angle-up text-xl"></i>
    </button>
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

// Reactive data
const isLoading = ref(true)
const sideMenuOpen = ref(false)
const currentSlide = ref(0)
const showBackToTop = ref(false)
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
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1920&h=1080&fit=crop',
    ...generateRandomAnimation()
  },
  {
    id: 2,
    title: '现代创新设计',
    description: '融合当代美学，重新定义光影艺术的边界',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1920&h=1080&fit=crop',
    ...generateRandomAnimation()
  },
  {
    id: 3,
    title: '手工精致工艺',
    description: '每一个细节都体现着匠人的专注与热爱',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop',
    ...generateRandomAnimation()
  },
  {
    id: 4,
    title: '色彩斑斓世界',
    description: '用色彩编织梦想，让光线舞动生命',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
    ...generateRandomAnimation()
  },
  {
    id: 5,
    title: '艺术生活美学',
    description: '将艺术融入生活，让美好触手可及',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop',
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

// Methods
const skipPreloader = () => {
  isLoading.value = false
}

const toggleSideMenu = () => {
  sideMenuOpen.value = !sideMenuOpen.value
}

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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const openLightbox = (work) => {
  // Lightbox logic
  console.log('Open lightbox for:', work.title)
}

// Lifecycle
onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false
  }, 2000)

  // Start autoplay
  startAutoplay()

  // Add scroll listener
  window.addEventListener('scroll', handleScroll)
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