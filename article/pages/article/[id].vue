<template>
  <div class="article-detail">
    <div class="container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-else class="article-content">
        <div class="article-header">
          <h1>{{ article.title }}</h1>
          <div class="article-meta">
            <span class="article-author">{{ $t('article.author') }}: {{ author }}</span>
            <span class="article-date">{{ $t('article.publishTime') }}: {{ formatDate(article.created_at) }}</span>
          </div>
        </div>

        <div class="article-body" v-html="formattedContent"></div>

        <div class="article-navigation">
          <NuxtLink v-if="prevArticle" :to="localePath(`/article/${prevArticle.id}`)" class="article-nav-link prev">
            &larr; {{ $t('article.prevArticle') }}: {{ prevArticle.title }}
          </NuxtLink>

          <NuxtLink v-if="nextArticle" :to="localePath(`/article/${nextArticle.id}`)" class="article-nav-link next">
            {{ $t('article.nextArticle') }}: {{ nextArticle.title }} &rarr;
          </NuxtLink>
        </div>

        <div class="article-back">
          <NuxtLink :to="getBackLink()" class="btn">
            {{ $t('article.backToList') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
const config = useRuntimeConfig()

// 创建 Supabase 客户端（服务端和客户端通用）
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const articleId = computed(() => route.params.id)
const article = ref(null)
const prevArticle = ref(null)
const nextArticle = ref(null)
const loading = ref(true)
const error = ref(null)
const post_group_id = ref('')

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale.value).format(date)
}

// 格式化文章内容（将\n转换为<br>）
const formattedContent = computed(() => {
  if (!article.value || !article.value.content) return ''
  return article.value.content.replace(/\n/g, '<br>')
})

const author = computed(() => {
  if (locale.value == 'en') {
    return 'HT'
  } else {
    return 'Hauty'
  }
})

// 获取返回链接
const getBackLink = () => {
  if (!article.value) return '/'

  switch (article.value.type) {
    case 'culture':
      return '/culture'
    case 'trend':
      return '/trends'
    case 'hot':
      return '/hot'
    case 'case':
      return '/cases'
    default:
      return '/'
  }
}

// 获取文章详情
async function fetchArticle() {
  try {
    const { data, error: supabaseError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', articleId.value)
      .single()

    if (supabaseError) throw supabaseError

    if (!data) {
      throw new Error('文章不存在')
    }

    article.value = data
    post_group_id.value = data.post_group_id
    // 设置页面元数据
    useHead({
      title: data.title,
      meta: [
        { name: 'description', content: data.content.substring(0, 160) }
      ]
    })

    // 获取上一篇和下一篇文章
    await Promise.all([
      fetchPrevArticle(data.id, data.type),
      fetchNextArticle(data.id, data.type)
    ])

  } catch (err) {
    console.error('Error fetching article:', err)
    error.value = t('获取文章详情失败')
  } finally {
    loading.value = false
  }
}

// 获取上一篇文章
async function fetchPrevArticle(currentId, type) {
  try {
    const { data } = await supabase
      .from('posts')
      .select('id, title')
      .eq('type', type)
      .lt('id', currentId)
      .order('id', { ascending: false })
      .limit(1)
      .single()

    prevArticle.value = data
  } catch (err) {
    console.error('Error fetching previous article:', err)
    // 没有上一篇文章，不显示错误
    prevArticle.value = null
  }
}

// 获取下一篇文章
async function fetchNextArticle(currentId, type) {
  try {
    const { data } = await supabase
      .from('posts')
      .select('id, title')
      .eq('type', type)
      .gt('id', currentId)
      .order('id', { ascending: true })
      .limit(1)
      .single()

    nextArticle.value = data
  } catch (err) {
    console.error('Error fetching next article:', err)
    // 没有下一篇文章，不显示错误
    nextArticle.value = null
  }
}

// 监听路由变化，重新获取文章
watch(() => route.params.id, () => {
  loading.value = true
  fetchArticle()
})

// 页面加载时获取文章
onMounted(() => {
  fetchArticle()
})
</script>

<style scoped>
.article-detail {
  padding: 2rem 0;
}

.article-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.article-header h1 {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  color: #777;
  font-size: 0.9rem;
}

.article-body {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
}

.article-body :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
  border-radius: 8px;
}

.article-body :deep(h2) {
  margin: 2rem 0 1rem;
  color: black;
}

.article-body :deep(h3) {
  margin: 1.5rem 0 1rem;
  color: black;
}

.article-body :deep(p) {
  margin-bottom: 1.5rem;
}

.article-navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.article-nav-link {
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-back {
  margin-top: 2rem;
  text-align: center;
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
  .article-header h1 {
    font-size: 2rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .article-navigation {
    flex-direction: column;
    gap: 1rem;
  }

  .article-nav-link {
    max-width: 100%;
  }
}
</style>