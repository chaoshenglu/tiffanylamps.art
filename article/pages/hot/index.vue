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
      
      <div v-else-if="articles.length === 0" class="no-articles">
        暂无相关文章
      </div>
      
      <div v-else class="articles-grid">
        <div v-for="(article, index) in articles" :key="article.id" class="article-card card">
          <NuxtLink :to="localePath(`/article/${article.id}`)" class="article-link">
            <div class="article-rank">
              <span class="rank-number">{{ index + 1 }}</span>
            </div>
            <div class="article-image">
              <img src="https://placehold.co/600x400/d4af37/ffffff?text=Hot+Sale" :alt="article.title" />
            </div>
            <div class="article-content">
              <h3>{{ article.title }}</h3>
              <div class="article-meta">
                <span class="article-author">{{ $t('article.author') }}: {{ article.author }}</span>
                <span class="article-date">{{ formatDate(article.created_at) }}</span>
              </div>
              <p class="article-excerpt">{{ getExcerpt(article.content) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { $supabase } = useNuxtApp()

const articles = ref([])
const loading = ref(true)
const error = ref(null)

// 设置页面元数据
useHead({
  title: '热卖榜单 - 蒂凡尼灯的艺术世界',
  meta: [
    { name: 'description', content: '发现最受欢迎的蒂凡尼灯具，了解市场热门选择。' }
  ]
})

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale.value).format(date)
}

// 获取文章摘要
const getExcerpt = (content) => {
  if (!content) return ''
  return content.length > 120 ? content.substring(0, 120) + '...' : content
}

// 获取热卖类文章
async function fetchHotArticles() {
  try {
    const { data, error: supabaseError } = await $supabase
      .from('posts')
      .select('*')
      .eq('type', 'hot')
      .eq('language', locale.value)
      .order('created_at', { ascending: false })
    
    if (supabaseError) throw supabaseError
    
    articles.value = data
  } catch (err) {
    console.error('Error fetching hot articles:', err)
    error.value = t('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

// 监听语言变化，重新获取文章
watch(() => locale.value, () => {
  loading.value = true
  fetchHotArticles()
})

// 页面加载时获取文章
onMounted(() => {
  fetchHotArticles()
})
</script>

<style scoped>
.hot-page {
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
  position: relative;
}

.article-rank {
  position: absolute;
  top: -15px;
  left: -15px;
  width: 50px;
  height: 50px;
  background: var(--vintage-gold);
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
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.article-content {
  padding: 1.5rem;
  height: calc(100% - 200px);
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
  
  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>