<template>
  <div class="auctions-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ $t('nav.auctions') }}</h1>
        <p class="page-description">获取最新的蒂凡尼灯拍卖会资讯，了解收藏市场动态。</p>
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
      
      <div v-else class="articles-list">
        <div v-for="article in articles" :key="article.id" class="article-item">
          <NuxtLink :to="localePath(`/article/${article.id}`)" class="article-link">
            <div class="article-icon">
              <span class="auction-icon">🔨</span>
            </div>
            <div class="article-content">
              <h2>{{ article.title }}</h2>
              <div class="article-meta">
                <span class="article-author">{{ $t('article.author') }}: {{ article.author }}</span>
                <span class="article-date">{{ formatDate(article.created_at) }}</span>
              </div>
              <p class="article-excerpt">{{ getExcerpt(article.content) }}</p>
            </div>
            <div class="article-arrow">
              <span>&rarr;</span>
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
  title: '拍卖会资料 - 蒂凡尼灯的艺术世界',
  meta: [
    { name: 'description', content: '获取最新的蒂凡尼灯拍卖会资讯，了解收藏市场动态。' }
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
  return content.length > 150 ? content.substring(0, 150) + '...' : content
}

// 获取拍卖类文章
async function fetchAuctionArticles() {
  try {
    const { data, error: supabaseError } = await $supabase
      .from('posts')
      .select('*')
      .eq('type', 'auction')
      .eq('language', locale.value)
      .order('created_at', { ascending: false })
    
    if (supabaseError) throw supabaseError
    
    articles.value = data
  } catch (err) {
    console.error('Error fetching auction articles:', err)
    error.value = t('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

// 监听语言变化，重新获取文章
watch(() => locale.value, () => {
  loading.value = true
  fetchAuctionArticles()
})

// 页面加载时获取文章
onMounted(() => {
  fetchAuctionArticles()
})
</script>

<style scoped>
.auctions-page {
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

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.article-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 4px solid var(--vintage-gold);
}

.article-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.article-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1.5rem;
  gap: 1.5rem;
}

.article-icon {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: var(--vintage-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auction-icon {
  font-size: 1.5rem;
}

.article-content {
  flex-grow: 1;
}

.article-content h2 {
  font-size: 1.5rem;
  color: black;
  margin-bottom: 0.5rem;
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.article-excerpt {
  color: #555;
  line-height: 1.6;
}

.article-arrow {
  flex-shrink: 0;
  color: black;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.article-item:hover .article-arrow {
  transform: translateX(5px);
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
  
  .article-link {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .article-content h2 {
    font-size: 1.3rem;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .article-arrow {
    display: none;
  }
}
</style>