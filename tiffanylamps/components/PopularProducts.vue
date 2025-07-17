<template>
  <section class="py-20 bg-white">
    <div class="max-w-[1800px] mx-auto px-5">
      <div class="flex justify-between items-center mx-auto max-w-[1250px]  md:gap-4  md:mb-5">
        <h2 class="text-[32px] font-bold text-gray-800 mb-[30px] md:text-[26px] md:mb-0 sm:text-[22px]">Popular Products</h2>
        <NuxtLink to="/products" class="text-violet-500 no-underline font-medium transition-colors duration-300 hover:text-violet-600">View All</NuxtLink>
      </div>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[30px] max-w-[1250px] mx-auto md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] md:gap-5 sm:grid-cols-2 sm:gap-[15px]">
        <div 
          v-for="(product, index) in products" 
          :key="index"
          class="bg-white rounded-[15px] overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer hover:-translate-y-[5px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
        >
          <div class="relative w-full h-[220px] overflow-hidden">
            <img :src="getProductImage(product.imageUrl)" :alt="product.name_zh" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div class="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button class="bg-violet-500 text-white border-none py-[10px] px-5 rounded-[25px] font-medium cursor-pointer transition-colors duration-300 hover:bg-violet-600 sm:py-2 sm:px-4 sm:text-[13px]">查看详情</button>
            </div>
          </div>
          <div class="p-5 text-center md:p-[15px] sm:p-3">
            <h3 class="text-[16px] font-medium text-gray-800 m-0 md:text-[15px] sm:text-[14px]">{{ product.name_zh }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const products = ref([
  {
    "name_zh": "产品",
    "name_en": "product",
    "imageUrl": "src/assets/product.webp"
  },
  {
    "name_zh": "产品",
    "name_en": "product",
    "imageUrl": "src/assets/product.webp"
  },
  {
    "name_zh": "产品",
    "name_en": "product",
    "imageUrl": "src/assets/product.webp"
  },
  {
    "name_zh": "产品",
    "name_en": "product",
    "imageUrl": "src/assets/product.webp"
  },
  {
    "name_zh": "产品",
    "name_en": "product",
    "imageUrl": "src/assets/product.webp"
  }
])

const getProductImage = (imageUrl) => {
  return '/assets/product.webp'
}
</script>