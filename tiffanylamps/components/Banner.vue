<template>
  <div class="w-full max-w-[1280px] h-[469px] relative overflow-hidden mx-auto">
    <div class="w-full h-full relative">
      <div 
        class="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500 ease-in-out" 
        :class="{ 'opacity-100': currentSlide === index }"
        v-for="(image, index) in bannerImages" 
        :key="index"
      >
        <img :src="image" :alt="`Banner ${index + 1}`" class="w-full h-full object-cover block" />
      </div>
      <div class="absolute bottom-5 md:bottom-3.75 sm:bottom-2.5 left-1/2 transform -translate-x-1/2 flex gap-2.5 md:gap-2.5 sm:gap-2">
        <span 
          v-for="(image, index) in bannerImages" 
          :key="index"
          class="w-3 h-3 md:w-2.5 md:h-2.5 sm:w-2 sm:h-2 rounded-full bg-white bg-opacity-50 cursor-pointer transition-colors duration-300"
          :class="{ 'bg-white bg-opacity-100': currentSlide === index }"
          @click="currentSlide = index"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const bannerImages = ['/assets/b1.webp', '/assets/b2.webp', '/assets/b3.webp']
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