<template>
  <section class="popular-products">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Popular Products</h2>
        <NuxtLink to="/products" class="view-all">View All</NuxtLink>
      </div>
      <div class="products-grid">
        <div 
          v-for="(product, index) in products" 
          :key="index"
          class="product-item"
        >
          <div class="product-image">
            <img :src="getProductImage(product.imageUrl)" :alt="product.name_zh" />
            <div class="product-overlay">
              <button class="btn-view">查看详情</button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name_zh }}</h3>
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

<style scoped>
.popular-products {
  padding: 80px 0;
  background: white;
}

.container {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.view-all {
  color: #8B5CF6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.view-all:hover {
  color: #7C3AED;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  max-width: 1250px;
}

.product-item {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.product-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.product-item:hover .product-overlay {
  opacity: 1;
}

.product-item:hover .product-image img {
  transform: scale(1.1);
}

.btn-view {
  background: #8B5CF6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-view:hover {
  background: #7C3AED;
}

.product-info {
  padding: 20px;
  text-align: center;
}

.product-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
}

@media (max-width: 768px) {
  .popular-products {
    padding: 50px 0;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .section-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
    margin-bottom: 40px;
  }
  
  .section-title {
    font-size: 26px;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
  }
  
  .product-image {
    height: 150px;
  }
  
  .product-info {
    padding: 15px;
  }
  
  .product-name {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 10px;
  }
  
  .section-title {
    font-size: 22px;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .product-image {
    height: 130px;
  }
  
  .product-info {
    padding: 12px;
  }
  
  .product-name {
    font-size: 14px;
  }
  
  .btn-view {
    padding: 8px 16px;
    font-size: 13px;
  }
}
</style>