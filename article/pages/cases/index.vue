<template>
  <div class="cases-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ $t('nav.cases') }}</h1>
        <p class="page-description">欣赏精美的蒂凡尼灯装修案例，获取家居装饰灵感。</p>
      </div>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>
      
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div v-else-if="articles.length === 0" class="no-articles">
        暂无相关文章
      </div>
      
      <div v-else class="articles-grid">
        <div v-for="article in articles" :key="article.id" class="article-card card">
          <NuxtLink :to="localePath(`/article/${article.id}`)" class="article-link">
            <div class="article-image">
              <img :src="article.cover_image" :alt="article.title" />
              <div class="article-overlay">
                <span class="view-case">查看案例</span>
              </div>
            </div>
            <div class="article-content">
              <h3>{{ article.title }}</h3>
              <div class="article-meta">
                <span class="article-author">{{ $t('article.author') }}: {{ article.author }}</span>
                <span class="article-date">{{ formatDate(article.created_at) }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
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

const articles = ref([])
const loading = ref(true)
const error = ref(null)

// 设置页面元数据
useHead({
  title: '装修案例 - 蒂凡尼灯的艺术世界',
  meta: [
    { name: 'description', content: '欣赏精美的蒂凡尼灯装修案例，获取家居装饰灵感。' }
  ]
})

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale.value).format(date)
}

// 获取案例类文章
async function fetchCaseArticles() {
  try {
    const { data, error: supabaseError } = await supabase
      .from('posts')
      .select('*')
      .eq('type', 'case')
      .eq('language', locale.value)
      .order('created_at', { ascending: false })
    
    if (supabaseError) throw supabaseError
    
    articles.value = data
  } catch (err) {
    console.error('Error fetching case articles:', err)
    error.value = t('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

// 监听语言变化，重新获取文章
watch(() => locale.value, () => {
  loading.value = true
  fetchCaseArticles()
})

// 页面加载时获取文章
onMounted(() => {
  fetchCaseArticles()
})
</script>

<style scoped>
.cases-page {
  padding: 2rem 0;
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

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.article-card {
  height: 100%;
}

.article-link {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.article-image {
  position: relative;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  transition: transform 0.3s ease;
}

.article-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.view-case {
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 2px solid white;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-card:hover .article-overlay {
  opacity: 1;
}

.article-content {
  padding: 1.5rem;
  height: calc(100% - 250px);
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

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .article-image img {
    height: 200px;
  }
  
  .article-content {
    height: calc(100% - 200px);
  }
  
  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>