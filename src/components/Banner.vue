<template>
  <div class="banner">
    <div class="banner-container">
      <div 
        class="banner-slide" 
        v-for="(image, index) in bannerImages" 
        :key="index"
        :class="{ active: currentSlide === index }"
      >
        <img :src="image" :alt="`Banner ${index + 1}`" />
      </div>
      <div class="banner-indicators">
        <span 
          v-for="(image, index) in bannerImages" 
          :key="index"
          class="indicator"
          :class="{ active: currentSlide === index }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import b1 from '../assets/b1.webp'
import b2 from '../assets/b2.webp'
import b3 from '../assets/b3.webp'

const bannerImages = [b1, b2, b3]
const currentSlide = ref(0)
let slideInterval = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % bannerImages.length
}

const startAutoSlide = () => {
  slideInterval = setInterval(nextSlide, 3000)
}

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped>
.banner {
  width: 1280px;
  height: 469px;
  position: relative;
  overflow: hidden;
}

.banner-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.banner-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.banner-slide.active {
  opacity: 1;
}

.banner-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.3s;
}

.indicator.active {
  background: white;
}

@media (max-width: 768px) {
  .banner {
    height: 280px;
  }
  
  .banner-indicators {
    bottom: 15px;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .banner {
    height: 220px;
  }
  
  .banner-indicators {
    bottom: 10px;
    gap: 8px;
  }
  
  .indicator {
    width: 8px;
    height: 8px;
  }
}
</style>