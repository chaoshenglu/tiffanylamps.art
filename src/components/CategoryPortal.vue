<template>
  <section class="category-portal">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">CATEGORY PORTAL</h2>
        <p class="section-subtitle">分类入口</p>
        <p class="section-description">多样式灯具选择</p>
      </div>
      <div class="category-grid">
        <div 
          v-for="(category, index) in categories" 
          :key="index"
          class="category-item"
        >
          <div class="category-image">
            <img :src="getCategoryImage(category.imageUrl)" :alt="category.name_zh" />
          </div>
          <div class="category-info">
            <h3 class="category-name-zh">{{ category.name_zh }}</h3>
            <p class="category-name-en">{{ category.name_en }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import categoriesData from '../assets/cate.json'

// Import images
import nightLight from '../assets/Night Light.webp'
import tableLamp from '../assets/Table Lamp.webp'
import wallLamp from '../assets/Wall Lamp.webp'
import chandelier from '../assets/Chandelier.webp'
import ceilingLamp from '../assets/Ceiling Lamp.webp'
import floorLamp from '../assets/Floor Lamp.webp'

const categories = ref(categoriesData)

const imageMap = {
  'src/assets/Night Light.webp': nightLight,
  'src/assets/Table Lamp.webp': tableLamp,
  'src/assets/Wall Lamp.webp': wallLamp,
  'src/assets/Chandelier.webp': chandelier,
  'src/assets/Ceiling Lamp.webp': ceilingLamp,
  'src/assets/Floor Lamp.webp': floorLamp
}

const getCategoryImage = (imageUrl) => {
  return imageMap[imageUrl] || ''
}
</script>

<style scoped>
.category-portal {
  padding: 80px 0;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
  letter-spacing: 2px;
}

.section-subtitle {
  font-size: 18px;
  color: #666;
  margin: 0 0 5px 0;
}

.section-description {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.category-item {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.category-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.category-item:hover .category-image img {
  transform: scale(1.1);
}

.category-info {
  padding: 20px;
  text-align: center;
}

.category-name-zh {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 5px 0;
}

.category-name-en {
  font-size: 12px;
  color: #999;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .category-portal {
    padding: 50px 0;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .category-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
  }
  
  .category-image {
    height: 120px;
  }
  
  .category-info {
    padding: 15px;
  }
}
</style>