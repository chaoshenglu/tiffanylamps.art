<template>
  <div>
    <!-- 轮播图部分 -->
    <section class="hero-section">
      <div class="container">
        <div class="carousel">
          <div v-for="(slide, index) in slides" :key="index" 
               class="carousel-item" 
               :class="{ active: currentSlide === index }">
            <NuxtImg :src="slide.image" :alt="slide.title" class="carousel-image" />
            <div class="carousel-caption">
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.description }}</p>
              <NuxtLink :to="localePath(slide.link)" class="btn">{{ slide.buttonText }}</NuxtLink>
            </div>
          </div>
          
          <div class="carousel-controls">
            <button @click="prevSlide" class="carousel-control prev">&lt;</button>
            <div class="carousel-indicators">
              <button v-for="(slide, index) in slides" :key="index" 
                      @click="goToSlide(index)" 
                      :class="{ active: currentSlide === index }" 
                      class="carousel-indicator"></button>
            </div>
            <button @click="nextSlide" class="carousel-control next">&gt;</button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 热卖榜单部分 -->
    <section class="hot-sales-section">
      <div class="container">
        <div class="section-header">
          <h2>{{ $t('home.hotSales') }}</h2>
          <NuxtLink :to="localePath('/hot')" class="view-all">{{ $t('article.more') }} &rarr;</NuxtLink>
        </div>
        
        <div class="hot-sales-grid">
          <div v-if="loading" class="loading">
            <div class="spinner"></div>
          </div>
          
          <div v-else-if="error" class="error-message">
            {{ error }}
          </div>
          
          <div v-else class="article-grid">
            <NuxtLink v-for="article in hotArticles" :key="article.id" 
                     :to="localePath(`/article/${article.id}`)" 
                     class="article-card card">
              <div class="article-image">
                <NuxtImg :src="article.cover_image" :alt="article.title" />
              </div>
              <div class="article-content">
                <h3>{{ article.title }}</h3>
                <p class="article-author">{{ $t('article.author') }}: {{ article.author }}</p>
                <p class="article-date">{{ formatDate(article.created_at) }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 装修案例精选部分 -->
    <section class="featured-cases-section">
      <div class="container">
        <div class="section-header">
          <h2>{{ $t('home.featuredCases') }}</h2>
          <NuxtLink :to="localePath('/cases')" class="view-all">{{ $t('article.more') }} &rarr;</NuxtLink>
        </div>
        
        <div class="featured-cases-grid">
          <div v-if="loading" class="loading">
            <div class="spinner"></div>
          </div>
          
          <div v-else-if="error" class="error-message">
            {{ error }}
          </div>
          
          <div v-else class="article-grid">
            <NuxtLink v-for="article in caseArticles" :key="article.id" 
                     :to="localePath(`/article/${article.id}`)" 
                     class="article-card card">
              <div class="article-image">
                <NuxtImg :src="article.cover_image" :alt="article.title" />
              </div>
              <div class="article-content">
                <h3>{{ article.title }}</h3>
                <p class="article-author">{{ $t('article.author') }}: {{ article.author }}</p>
                <p class="article-date">{{ formatDate(article.created_at) }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 历史文化和流行趋势入口 -->
    <section class="entry-section">
      <div class="container">
        <div class="entry-grid">
          <div class="entry-card culture-entry">
            <div class="entry-content">
              <h2>{{ $t('home.cultureEntry') }}</h2>
              <p>探索蒂凡尼灯的丰富历史与文化底蕴，了解这一艺术形式的起源与发展。</p>
              <NuxtLink :to="localePath('/culture')" class="btn">{{ $t('article.backToList') }}</NuxtLink>
            </div>
          </div>
          
          <div class="entry-card trends-entry">
            <div class="entry-content">
              <h2>{{ $t('home.trendsEntry') }}</h2>
              <p>了解蒂凡尼灯在现代家居装饰中的流行趋势与创新应用。</p>
              <NuxtLink :to="localePath('/trends')" class="btn btn-secondary">{{ $t('article.backToList') }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'

const localePath = useLocalePath()
const config = useRuntimeConfig()

// 创建 Supabase 客户端（服务端和客户端通用）
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)

// 在服务端渲染阶段获取热卖文章数据
const { data: hotArticles, error: hotError } = await useLazyAsyncData('hot-articles', async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('type', 'hot')
      .limit(3)
    if (error) {
      console.error('热卖文章查询错误:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '无法加载热卖榜单数据'
      })
    }
    return data || []
  } catch (err) {
    console.error('获取热卖文章时发生错误:', err)
    throw err
  }
})

// 在服务端渲染阶段获取案例文章数据
const { data: caseArticles, error: caseError } = await useLazyAsyncData('case-articles', async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('type', 'case')
      .limit(3)
    
    if (error) {
      console.error('案例文章查询错误:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '无法加载装修案例数据'
      })
    }
    return data || []
  } catch (err) {
    console.error('获取案例文章时发生错误:', err)
    throw err
  }
})

// 合并错误状态
const error = computed(() => {
  if (hotError.value) return '无法加载热卖榜单数据'
  if (caseError.value) return '无法加载装修案例数据'
  return null
})

// 加载状态
const loading = computed(() => {
  return !hotArticles.value && !caseArticles.value && !error.value
})

// 轮播图数据
const slides = ref([
  {
    image: 'https://r2.tiffanylamps.art/poster/b1.webp',
    title: '蒂凡尼灯的艺术世界',
    description: '探索经典与现代的完美融合',
    link: '/culture',
    buttonText: '了解更多'
  },
  {
    image: 'https://r2.tiffanylamps.art/poster/b2.webp',
    title: '蒂凡尼灯的艺术世界',
    description: '探索经典与现代的完美融合',
    link: '/culture',
    buttonText: '了解更多'
  }
])

const currentSlide = ref(0)
const slideInterval = ref(null)

// 轮播图控制
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('zh-CN').format(date)
}

// 自动轮播
onMounted(() => {
  startSlideShow()
})

onUnmounted(() => {
  stopSlideShow()
})

const startSlideShow = () => {
  slideInterval.value = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopSlideShow = () => {
  clearInterval(slideInterval.value)
}
</script>

<style scoped>
/* 轮播图样式 */
.hero-section {
  margin-bottom: 3rem;
}

.carousel {
  position: relative;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
  display: flex;
  align-items: center;
}

.carousel-item.active {
  opacity: 1;
  z-index: 1;
}

.carousel-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-caption {
  position: relative;
  z-index: 2;
  max-width: 600px;
  padding: 2rem;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin-left: 5%;
}

.carousel-caption h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
}

.carousel-caption p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.carousel-controls {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  z-index: 3;
}

.carousel-control {
  background: rgba(255, 255, 255, 0.5);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
}

.carousel-control:hover {
  background: rgba(255, 255, 255, 0.8);
}

.carousel-indicators {
  display: flex;
  gap: 0.5rem;
}

.carousel-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel-indicator.active {
  background: white;
}

/* 热卖榜单和装修案例部分 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.view-all {
  color: var(--tiffany-blue);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.view-all:hover {
  color: var(--deep-brown);
}

.hot-sales-section,
.featured-cases-section {
  margin-bottom: 4rem;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.article-card {
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.article-image img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.article-content {
  padding: 1.5rem;
}

.article-content h3 {
  margin-bottom: 0.5rem;
  color: var(--deep-brown);
  font-size: 1.2rem;
}

.article-author,
.article-date {
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

/* 入口部分 */
.entry-section {
  margin-bottom: 4rem;
}

.entry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.entry-card {
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
}

.entry-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
  transition: filter 0.3s ease, transform 0.3s ease;
  z-index: -1;
}

.entry-card:hover::before {
  filter: brightness(0.5);
  transform: scale(1.05);
}

.culture-entry::before {
  background-image: url('https://placehold.co/800x600/8b4513/ffffff?text=Culture');
}

.trends-entry::before {
  background-image: url('https://placehold.co/800x600/0abab5/ffffff?text=Trends');
}

.entry-content {
  position: relative;
  z-index: 1;
  max-width: 400px;
}

.entry-content h2 {
  color: white;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.entry-content p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .carousel {
    height: 400px;
  }
  
  .carousel-caption {
    max-width: 90%;
    margin: 0 auto;
    padding: 1.5rem;
  }
  
  .carousel-caption h2 {
    font-size: 1.8rem;
  }
  
  .entry-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .carousel {
    height: 300px;
  }
  
  .carousel-caption h2 {
    font-size: 1.5rem;
  }
  
  .carousel-caption p {
    font-size: 1rem;
  }
}
</style>