<template>
  <section class="py-20 bg-white">
    <div class="max-w-450 mx-auto px-5">
      <div class="text-center mb-15">
        <h2 class="text-9 font-bold text-gray-8 mb-2.5 tracking-0.5">CATEGORY PORTAL</h2>
        <p class="text-4.5 text-gray-6 mb-1.25">分类入口</p>
        <p class="text-3.5 text-gray-4 m-0">多样式灯具选择</p>
      </div>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-7.5 max-w-312.5 mx-auto md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:gap-5 sm:grid-cols-2 sm:gap-3.75">
        <div 
          v-for="(category, index) in categories" 
          :key="index"
          class="bg-white rounded-3.75 overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer hover:translate-y--1.25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
        >
          <div class="w-full h-[250px] overflow-hidden">
            <img :src="getCategoryImage(category.imageUrl)" :alt="category.name_zh" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div class="p-5 text-center md:p-3.75 sm:p-3">
            <h3 class="text-4.5 font-bold text-gray-8 mb-1.25 m-0 md:text-4 sm:text-3.5">{{ category.name_zh }}</h3>
            <p class="text-3 text-gray-4 m-0 uppercase tracking-0.25 sm:text-2.75">{{ category.name_en }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
  {
    "name_zh": "小夜灯",
    "name_en": "Night Light",
    "imageUrl": "src/assets/Night Light.webp"
  },
  {
    "name_zh": "台灯",
    "name_en": "Table Lamp",
    "imageUrl": "src/assets/Table Lamp.webp"
  },
  {
    "name_zh": "壁灯",
    "name_en": "Wall Lamp",
    "imageUrl": "src/assets/Wall Lamp.webp"
  },
  {
    "name_zh": "吊灯",
    "name_en": "Chandelier",
    "imageUrl": "src/assets/Chandelier.webp"
  },
  {
    "name_zh": "吸顶灯",
    "name_en": "Ceiling Lamp",
    "imageUrl": "src/assets/Ceiling Lamp.webp"
  },
  {
    "name_zh": "落地灯",
    "name_en": "Floor Lamp",
    "imageUrl": "src/assets/Floor Lamp.webp"
  }
])

const imageMap = {
  'src/assets/Night Light.webp': '/assets/Night Light.webp',
  'src/assets/Table Lamp.webp': '/assets/Table Lamp.webp',
  'src/assets/Wall Lamp.webp': '/assets/Wall Lamp.webp',
  'src/assets/Chandelier.webp': '/assets/Chandelier.webp',
  'src/assets/Ceiling Lamp.webp': '/assets/Ceiling Lamp.webp',
  'src/assets/Floor Lamp.webp': '/assets/Floor Lamp.webp'
}

const getCategoryImage = (imageUrl) => {
  return imageMap[imageUrl] || ''
}
</script>