<template>
  <div>
    <TheHeader />
    <section class="hero" id="home">
      <div class="hero-content">
        <h1>蒂凡尼灯的艺术世界</h1>
        <p>探索艺术与光的完美融合，领略百年不朽的经典魅力</p>
        <a href="#trends" class="btn">开始探索</a>
      </div>
    </section>
    <section id="trends" class="container">
      <h2 class="section-title">流行趋势</h2>
      <p class="ornament">❦</p>
      <p>蒂凡尼灯作为装饰艺术的重要代表，近年来在室内设计领域重新焕发光彩。从传统复古到现代简约，从单件展示到系列组合，蒂凡尼灯以其独特的艺术魅力和精湛工艺，成为高端住宅、精品酒店和艺术空间的首选照明装饰。</p>
      <div class="gallery">
        <div class="gallery-item" v-for="(item, idx) in trends" :key="idx">
          <img :src="item.src" :alt="item.alt" />
          <div class="gallery-caption">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <section id="history" class="container vintage-border">
      <h2 class="section-title">历史文化</h2>
      <p class="ornament">❦</p>
      <p>蒂凡尼灯由美国艺术家路易斯·康福特·蒂凡尼（Louis Comfort Tiffany）于19世纪末创造，是新艺术运动的杰出代表。蒂凡尼将彩色玻璃艺术与实用功能完美结合，创造出这些永恒的艺术珍品。</p>
      <div class="timeline">
        <div class="timeline-item" v-for="(node, i) in timeline" :key="i" :class="i % 2 === 0 ? 'left' : 'right'">
          <div class="timeline-content">
            <h3>{{ node.year }}</h3>
            <p>{{ node.text }}</p>
          </div>
        </div>
      </div>
    </section>
    <section id="hot" class="container">
      <h2 class="section-title">热卖榜单</h2>
      <p class="ornament">❦</p>
      <p>精选市场上最受欢迎的蒂凡尼灯款式，这些作品因其独特的设计和卓越的品质而备受青睐。</p>
      <div class="hot-list">
        <div class="hot-item" v-for="(item, i) in hotList" :key="i">
          <img :src="item.src" :alt="item.alt" />
          <div class="hot-item-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="price">{{ item.price }}</div>
          </div>
        </div>
      </div>
    </section>
    <section id="auction" class="container">
      <h2 class="section-title">拍卖会</h2>
      <p class="ornament">❦</p>
      <div class="auction-list">
        <div class="auction-item" v-for="(item, i) in auctions" :key="i">
          <img :src="item.src" :alt="item.alt" />
          <div class="auction-content">
            <span class="auction-date">{{ item.date }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

const trends = [
  { src: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15', alt: '现代客厅中的蒂凡尼灯', title: '现代简约风格', desc: '蒂凡尼灯在现代简约空间中的完美融合' },
  { src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', alt: '复古书房中的蒂凡尼灯', title: '复古书房搭配', desc: '传统书房空间中的经典蒂凡尼台灯' },
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', alt: '餐厅中的蒂凡尼吊灯', title: '餐厅艺术照明', desc: '蒂凡尼吊灯为餐厅增添艺术氛围' },
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace', alt: '卧室中的蒂凡尼灯', title: '卧室温馨照明', desc: '蒂凡尼床头灯营造温馨舒适的睡眠环境' },
  { src: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab', alt: '走廊中的蒂凡尼壁灯', title: '走廊艺术点缀', desc: '蒂凡尼壁灯为走廊增添艺术气息' },
  { src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0', alt: '工作室中的蒂凡尼灯', title: '创意工作空间', desc: '蒂凡尼灯为工作室带来灵感与创意' }
]

const timeline = [
  { year: '1890s', text: '蒂凡尼开始探索彩色玻璃工艺，创作出具有独特色彩和纹理的玻璃制品。' },
  { year: '1899', text: '蒂凡尼公司成立，推出第一批蒂凡尼风格灯具，迅速引起关注。' },
  { year: '1900-1910', text: '新艺术运动盛行，蒂凡尼灯以自然主义图案和手工工艺成为时代象征。' },
  { year: '1913', text: '蒂凡尼工艺达到顶峰，复杂的玻璃拼接与金属焊接工艺广受赞誉。' },
  { year: '1930s', text: '随着现代主义的兴起，蒂凡尼灯的流行度逐渐下降，但其艺术价值依然不减。' },
  { year: '1980s-至今', text: '蒂凡尼灯重新受到关注，成为收藏家和艺术爱好者追捧的对象，复刻品和受蒂凡尼风格启发的现代作品开始流行。' }
]

const hotList = [
  { src: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14', alt: '经典蜻蜓台灯', title: '经典蜻蜓台灯', desc: '蒂凡尼最具代表性的设计之一，蜻蜓图案栩栩如生，色彩绚丽。', price: '¥3,980' },
  { src: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7', alt: '睡莲台灯', title: '睡莲台灯', desc: '以水中睡莲为灵感，柔和的绿色和蓝色调，营造宁静祥和氛围。', price: '¥4,250' },
  { src: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14', alt: '紫藤吊灯', title: '紫藤吊灯', desc: '以紫藤花为主题的吊灯设计，流畅的线条与细腻的色彩诠释浪漫与优雅。', price: '¥6,380' },
  { src: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7', alt: '睡莲台灯', title: '睡莲台灯', desc: '以水中睡莲为灵感，柔和的绿色和蓝色调，营造宁静祥和氛围。', price: '¥4,250' }
]

const auctions = [
  { src: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744', alt: '拍卖会1', title: '纽约佳士得春季艺术品拍卖', date: '2025-05-12', desc: '精选19至20世纪装饰艺术，包含多款珍稀蒂凡尼灯作品。' },
  { src: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744', alt: '拍卖会2', title: '伦敦苏富比夏季精选拍卖', date: '2025-06-28', desc: '聚焦欧洲装饰艺术传统，蒂凡尼灯与新艺术风格作品成为亮点。' },
  { src: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744', alt: '拍卖会3', title: '香港保利艺术夜拍', date: '2025-09-03', desc: '亚洲艺术市场盛事，多款顶级蒂凡尼灯具有望刷新成交纪录。' }
]

onMounted(() => {

})

onUnmounted(() => {

})
</script>

<style scoped>
.hero {
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://images.unsplash.com/photo-1524634126442-357e0eac3c14') no-repeat center center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 0 20px;
  margin-top: 60px;
}

.hero-content {
  max-width: 800px;
}

.hero h1 {
  font-family: var(--header-font);
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 30px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  height: 300px;
  cursor: pointer;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.gallery-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(15, 76, 117, 0.8);
  color: white;
  padding: 15px;
  transform: translateY(100%);
  transition: transform 0.3s;
}

.gallery-item:hover .gallery-caption {
  transform: translateY(0);
}

.gallery-caption h3 {
  font-size: 1.3rem;
  margin-bottom: 5px;
}

.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: var(--primary-color);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

.timeline-item {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -17px;
  background-color: white;
  border: 4px solid var(--secondary-color);
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

.left {
  left: 0;
}

.right {
  left: 50%;
}

.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid var(--primary-color);
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent var(--primary-color);
}

.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid var(--primary-color);
  border-width: 10px 10px 10px 0;
  border-color: transparent var(--primary-color) transparent transparent;
}

.right::after {
  left: -16px;
}

.timeline-content {
  padding: 20px 30px;
  background-color: white;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.timeline-content h3 {
  font-family: var(--header-font);
  color: var(--primary-color);
  margin-bottom: 10px;
}

.hot-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.hot-item {
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.hot-item:hover {
  transform: translateY(-5px);
}

.hot-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.hot-item-content {
  padding: 20px;
}

.hot-item h3 {
  font-family: var(--header-font);
  color: var(--primary-color);
  margin-bottom: 10px;
}

.price {
  color: #e63946;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 10px 0;
}

.auction-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.auction-item {
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.auction-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.auction-content {
  padding: 20px;
}

.auction-date {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.auction-item h3 {
  font-family: var(--header-font);
  color: var(--primary-color);
  margin-bottom: 10px;
}

.case-slider {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
}

.case-slides {
  display: flex;
  transition: transform 0.5s ease;
}

.case-slide {
  min-width: 100%;
  position: relative;
}

.case-slide img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 5px;
}

.case-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
}

.slider-nav {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.slider-dot {
  width: 12px;
  height: 12px;
  background-color: #bbb;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.slider-dot.active {
  background-color: var(--primary-color);
}

@media screen and (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .timeline::after {
    left: 31px;
  }

  .timeline-item {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }

  .timeline-item::before {
    left: 60px;
    border: medium solid var(--primary-color);
    border-width: 10px 10px 10px 0;
    border-color: transparent var(--primary-color) transparent transparent;
  }

  .left::after,
  .right::after {
    left: 15px;
  }

  .right {
    left: 0%;
  }
}
</style>