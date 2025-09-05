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
              <NuxtLink :to="localePath(slide.link)" class="btn" style="background-color: #FFFFFF26">{{ slide.buttonText }}</NuxtLink>
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
          
          <div v-else class="article-grid hot-sales-grid-layout">
            <NuxtLink v-for="p in products" :key="p.model" 
                     :to="localePath(`/product/${p.model}`)" 
                     class="article-card card">
              <div class="article-image hot-sales-image">
                <NuxtImg v-if="locale === 'zh-CN'" :src="p.main_images[0]" :alt="p.abb_zh" />
                <NuxtImg v-else :src="p.main_images[0]" :alt="p.abb_en" />
              </div>
              <div class="article-content">
                <h3 style="word-break: break-all;">{{ locale === 'zh-CN' ? p.abb_zh : p.abb_en }}</h3>
                <p class="article-author">{{ $t('product.price') }}: {{ locale === 'zh-CN' ? '￥' : '$' }}{{ locale === 'zh-CN' ? p.price_zh : p.price_en }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 精选案例部分 -->
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
          
          <div v-else class="article-grid featured-cases-grid-layout">
            <NuxtLink v-for="article in caseArticles" :key="article.id" 
                     :to="localePath(`/article/${article.id}`)" 
                     class="article-card card">
              <div class="article-image featured-cases-image">
                <NuxtImg :src="article.cover_image" :alt="article.title" />
              </div>
              <div class="article-content">
                <h3>{{ article.title }}</h3>
                <div style="display: flex;flex-direction: row;justify-content: space-between;margin-top:20px">
                  <p class="article-author">{{ $t('article.author') }}: Hauty</p>
                <p class="article-date">{{ formatDate(article.created_at) }}</p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 历史文化和蒂凡尼时刻入口 -->
    <section class="entry-section">
      <div class="container">
        <div class="entry-grid">
          <div class="entry-card culture-entry">
            <div class="entry-content">
              <h2>{{ $t('home.cultureEntry') }}</h2>
              <p>{{ $t('home.cultureDesc') }}</p>
              <NuxtLink :to="localePath('/culture')" class="btn" style="background-color: #00000080">{{ $t('home.learnMore') }}</NuxtLink>
            </div>
          </div>
          
          <div class="entry-card trends-entry">
            <div class="entry-content">
              <h2>{{ $t('home.moment') }}</h2>
              <p>{{ $t('home.momentDesc') }}</p>
              <NuxtLink :to="localePath('/your-tiffany-moment')" class="btn" style="background-color: #00000080">{{ $t('home.learnMore') }}</NuxtLink>
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
const { t, locale } = useI18n()
// 创建 Supabase 客户端（服务端和客户端通用）
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)

// 缓存配置
const HOT_ARTICLES_CACHE_KEY = 'hot-articles-cache'
const CASE_ARTICLES_CACHE_KEY = 'case-articles-cache'

// 缓存工具函数
const getCachedData = (key) => {
  if (process.client) {
    try {
      const cached = localStorage.getItem(key)
      if (cached) {
        const { data } = JSON.parse(cached)
        return data
      }
    } catch (error) {
      console.error('读取缓存失败:', error)
    }
  }
  return null
}

const setCachedData = (key, data) => {
  if (process.client) {
    try {
      localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
      }))
    } catch (error) {
      console.error('设置缓存失败:', error)
    }
  }
}

// 获取热卖产品的函数
const fetchProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('lamp')
      .select('*')
      .limit(4)
    if (error) {
      console.error('热卖产品查询错误:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '无法加载热卖榜单数据'
      })
    }
    return data || []
  } catch (err) {
    console.error('获取热卖产品时发生错误:', err)
    throw err
  }
}

// 获取案例文章的函数
const fetchCaseArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('type', 'case')
      .eq('language', locale.value || 'zh-CN')
      .limit(4)
    
    if (error) {
      console.error('案例文章查询错误:', error)
      throw createError({
        statusCode: 500,
        statusMessage: '无法加载精选案例数据'
      })
    }
    return data || []
  } catch (err) {
    console.error('获取案例文章时发生错误:', err)
    throw err
  }
}

// 数据本地化处理函数
const processProductData = (data) => {
  if (!data) return data
  return data.map(element => ({
    ...element,
    price: locale.value === 'zh-CN' ? `￥${element.price_zh}` : `$${element.price_en}`,
    title: locale.value === 'zh-CN' ? element.title_zh : element.title_en,
    html: locale.value === 'zh-CN' ? element.html_zh : element.html_en
  }))
}

// 使用useLazyAsyncData确保SSR和客户端数据一致性
const { data: products, error: hotError } = await useLazyAsyncData('hot-articles', async () => {
  // 在服务端直接获取数据
  if (process.server) {
    const data = await fetchProducts()
    return processProductData(data)
  }
  
  // 在客户端先尝试从缓存获取
  const cachedData = getCachedData(HOT_ARTICLES_CACHE_KEY)
  if (cachedData) {
    // 后台更新数据
    nextTick(async () => {
      try {
        const latestData = await fetchProducts()
        const processedData = processProductData(latestData)
        products.value = processedData
        setCachedData(HOT_ARTICLES_CACHE_KEY, latestData) // 缓存原始数据
      } catch (error) {
        console.error('后台更新热卖文章失败:', error)
      }
    })
    // 对缓存数据也进行本地化处理
    return processProductData(cachedData)
  }
  
  // 没有缓存时直接获取
  const data = await fetchProducts()
  setCachedData(HOT_ARTICLES_CACHE_KEY, data) // 缓存原始数据
  return processProductData(data)
})

const { data: caseArticles, error: caseError } = await useLazyAsyncData('case-articles', async () => {
  // 在服务端直接获取数据
  if (process.server) {
    return await fetchCaseArticles()
  }
  
  // 在客户端先尝试从缓存获取
  const cachedData = getCachedData(CASE_ARTICLES_CACHE_KEY)
  if (cachedData) {
    // 后台更新数据
    nextTick(async () => {
      try {
        const latestData = await fetchCaseArticles()
        caseArticles.value = latestData
        setCachedData(CASE_ARTICLES_CACHE_KEY, latestData)
      } catch (error) {
        console.error('后台更新案例文章失败:', error)
      }
    })
    return cachedData
  }
  
  // 没有缓存时直接获取
  const data = await fetchCaseArticles()
  setCachedData(CASE_ARTICLES_CACHE_KEY, data)
  return data
})

// 合并错误状态
const error = computed(() => {
  if (hotError.value) return '无法加载热卖榜单数据'
  if (caseError.value) return '无法加载精选案例数据'
  return null
})

// 加载状态
const loading = computed(() => {
  return !products.value && !caseArticles.value && !error.value
})

const slides = computed(() => {
  const slidesData = {
    'zh-CN': [
      {
        image: 'https://r2.tiffanylamps.art/poster/b0.webp',
        title: '蒂凡尼灯的艺术世界',
        description: '探索经典与现代的完美融合',
        link: '/product/TJ2282',
        buttonText: '了解更多'
      },
      {
        image: 'https://r2.tiffanylamps.art/poster/p5.webp',
        title: '蒂凡尼灯的艺术世界',
        description: '探索经典与现代的完美融合',
        link: '/product/TJ1242',
        buttonText: '了解更多'
      },
      {
        image: 'https://r2.tiffanylamps.art/poster/b4.webp',
        title: '蒂凡尼灯的艺术世界',
        description: '探索经典与现代的完美融合',
        link: '/product/TJ1632',
        buttonText: '了解更多'
      }
    ],
    'en': [
      {
        image: 'https://r2.tiffanylamps.art/poster/b0.webp',
        title: 'The Art of Tiffany Lamps',
        description: 'Discover the perfect fusion of classic and modern',
        link: '/product/TJ2282',
        buttonText: 'Learn More'
      },
      {
        image: 'https://r2.tiffanylamps.art/poster/p5.webp',
        title: 'The Art of Tiffany Lamps',
        description: 'Discover the perfect fusion of classic and modern',
        link: '/product/TJ1242',
        buttonText: 'Learn More'
      },
      {
        image: 'https://r2.tiffanylamps.art/poster/b4.webp',
        title: 'The Art of Tiffany Lamps',
        description: 'Discover the perfect fusion of classic and modern',
        link: '/product/TJ1632',
        buttonText: 'Learn More'
      }
    ]
  }
  
  return slidesData[locale.value] || slidesData['zh-CN']
})

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

/* 热卖榜单和精选案例部分 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view-all {
  color: black;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.view-all:hover {
  color: black;
}

.hot-sales-section,
.featured-cases-section {
  margin-bottom: 4rem;
}

/* 热卖榜单网格布局 */
.hot-sales-grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem;
}

/* 精选案例网格布局 */
.featured-cases-grid-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.article-card {
  text-decoration: none;
  color: inherit;
  height: 100%;
}

/* 热卖榜单图片样式 - 保持正方形 */
.hot-sales-image img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

/* 精选案例图片样式 - 矩形 */
.featured-cases-image img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.article-content {
  padding: 1.5rem;
}

.article-content h3 {
  margin-bottom: 0.5rem;
  color: black;
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
  background-image: url('https://r2.tiffanylamps.art/poster/p3.webp');
}

.trends-entry::before {
  background-image: url('https://r2.tiffanylamps.art/poster/p1.webp');
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
  
  .featured-cases-grid-layout {
    grid-template-columns: repeat(2, 1fr);
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
  
  .hot-sales-grid-layout,
  .featured-cases-grid-layout {
    grid-template-columns: 1fr;
  }
}

.hot-sales-grid {
  margin-top: -20px;
}

.featured-cases-grid {
  margin-top: -20px;
}
</style>