<template>
  <div class="culture-page">
    <div class="container">
      <div class="page-header">
        <h1>{{ $t('nav.culture') }}</h1>
        <p class="page-description">探索蒂凡尼灯的丰富历史与文化底蕴，了解这一艺术形式的起源与发展。</p>
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
            <div class="article-content">
              <h2>{{ article.title }}</h2>
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
  title: '历史文化 - 蒂凡尼灯的艺术世界',
  meta: [
    { name: 'description', content: '探索蒂凡尼灯的丰富历史与文化底蕴，了解这一艺术形式的起源与发展。' }
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

// 获取文化类文章
async function fetchCultureArticles() {
  try {
    const { data, error: supabaseError } = await $supabase
      .from('posts')
      .select('*')
      .eq('type', 'culture')
      .eq('language', locale.value)
      .order('created_at', { ascending: false })
    
    if (supabaseError) throw supabaseError
    
    articles.value = data
  } catch (err) {
    console.error('Error fetching culture articles:', err)
    error.value = t('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

// 监听语言变化，重新获取文章
watch(() => locale.value, () => {
  loading.value = true
  fetchCultureArticles()
})

// 页面加载时获取文章
onMounted(() => {
  fetchCultureArticles()
})
</script>

<style scoped>
.culture-page {
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
  gap: 2rem;
}

.article-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.article-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.article-content {
  padding: 2rem;
}

.article-content h2 {
  font-size: 1.8rem;
  color: black;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.article-excerpt {
  color: #444;
  line-height: 1.6;
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
  
  .article-content h2 {
    font-size: 1.5rem;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>