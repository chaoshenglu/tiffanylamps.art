<template>
  <div class="hot-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ $t('nav.hot') }}</h1>
        <p class="page-description">发现最受欢迎的蒂凡尼灯具，了解市场热门选择。</p>
      </div>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-else-if="products.length === 0" class="no-articles">
        暂无相关产品
      </div>

      <div v-else class="article-grid hot-sales-grid-layout">
        <NuxtLink v-for="p in products" :key="p.model" :to="localePath(`/product/${p.model}`)"
          class="article-card card">
          <div class="article-image hot-sales-image">
            <NuxtImg v-if="locale === 'zh-CN'" :src="p.main_images[0]" :alt="p.abb_zh" />
            <NuxtImg v-else :src="p.main_images[0]" :alt="p.abb_en" />
          </div>
          <div class="article-content">
            <h3 style="word-break: break-all;">{{ locale === 'zh-CN' ? p.abb_zh : p.abb_en }}</h3>
            <p class="article-author">{{ $t('product.price') }}: {{ locale === 'zh-CN' ? '￥' : '$' }}{{ locale ===
              'zh-CN' ? p.price_zh : p.price_en }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
const config = useRuntimeConfig()
const { t, locale } = useI18n()
const localePath = useLocalePath()
// 创建 Supabase 客户端（服务端和客户端通用）
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)
const products = ref([])
const loading = ref(true)
const error = ref(null)

// 设置页面元数据
useHead({
  title: '热卖榜单 - 蒂凡尼灯的艺术世界',
  meta: [
    { name: 'description', content: '发现最受欢迎的蒂凡尼灯具，了解市场热门选择。' }
  ]
})

// 热卖产品查询
async function fetchHotProducts() {
  try {
    loading.value = true
    error.value = null
    const { data, error: supabaseError } = await supabase
      .from('lamp')
      .select('*')
      .limit(4)
    if (supabaseError) {
      console.error('热卖产品查询错误:', supabaseError)
      error.value = '无法加载热卖榜单数据'
      throw createError({
        statusCode: 500,
        statusMessage: '无法加载热卖榜单数据'
      })
    }
    products.value = data || []
  } catch (err) {
    console.error('获取热卖产品时发生错误:', err)
    error.value = err.message || '获取产品数据失败'
    throw err
  } finally {
    loading.value = false
  }
}

// 监听语言变化，重新获取产品
watch(() => locale.value, () => {
  fetchHotProducts()
})

// 页面加载时获取产品
onMounted(() => {
  fetchHotProducts()
})
</script>

<style scoped>
.hot-page {
  padding: 2rem 0;
  min-height: 93vh;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 1rem;
}

.page-description {
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.article-card {
  height: 100%;
  position: relative;
}

.article-rank {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 50px;
  height: 50px;
  background: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.rank-number {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.article-link {
  display: block;
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
  display: flex;
  flex-direction: column;
}

.article-content h3 {
  font-size: 1.3rem;
  color: black;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  gap: 1rem;
  color: #777;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.article-excerpt {
  color: #555;
  line-height: 1.5;
  flex-grow: 1;
}

.no-articles {
  text-align: center;
  padding: 3rem;
  background: #f9f9f9;
  border-radius: 8px;
  color: #666;
  font-size: 1.2rem;
}

.error-message {
  padding: 2rem;
  background-color: #fff5f5;
  color: #e53e3e;
  border-radius: 8px;
  text-align: center;
  margin: 2rem 0;
}

/* 热卖榜单网格布局 */
.hot-sales-grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2rem;
}

/* 热卖榜单图片样式 - 保持正方形 */
.hot-sales-image img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

@media (max-width: 1200px) {
  .articles-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .page-description {
    font-size: 1rem;
  }

  .article-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .article-grid {
    grid-template-columns: 1fr;
  }

  .hot-sales-grid-layout {
    grid-template-columns: 1fr;
  }
}
</style>