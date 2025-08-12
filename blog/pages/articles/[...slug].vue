<template>
  <div class="container">
    <nav class="breadcrumb">
      <NuxtLink to="/" class="breadcrumb-link">首页</NuxtLink>
      <span class="breadcrumb-separator">></span>
      <span class="breadcrumb-current">{{ data.title }}</span>
    </nav>
    
    <article class="article">
      <header class="article-header">
        <h1 class="article-title">{{ data.title }}</h1>
        <p class="article-description">{{ data.description }}</p>
        <div class="article-meta">
          <div class="meta-item">
            <span class="meta-label">发布日期:</span>
            <span class="meta-value">{{ formatDate(data.date) }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">作者:</span>
            <span class="meta-value">{{ data.author }}</span>
          </div>
        </div>
        <div class="article-tags" v-if="data.tags && data.tags.length">
          <span 
            v-for="tag in data.tags" 
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
      </header>
      
      <div class="article-content">
        <ContentRenderer :value="data" />
      </div>
    </article>
    
    <footer class="article-footer">
      <NuxtLink to="/" class="back-link">
        ← 返回文章列表
      </NuxtLink>
    </footer>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug?.[0] || 'first-article'

// 使用Nuxt Content获取文章数据
const { data } = await useAsyncData(`article-${slug}`, () => 
  queryContent('articles', slug).findOne()
)

if (!data) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章未找到'
  })
}

useHead({
  title: data.title,
  meta: [
    { name: 'description', content: data.description },
    { property: 'og:title', content: data.title },
    { property: 'og:description', content: data.description },
    { property: 'og:type', content: 'article' },
    { property: 'article:author', content: data.author },
    { property: 'article:published_time', content: data.date }
  ]
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.breadcrumb-link {
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  color: #9ca3af;
}

.breadcrumb-current {
  color: #1f2937;
  font-weight: 500;
}

.article {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  margin-bottom: 2rem;
}

.article-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f3f4f6;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.article-description {
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.article-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-label {
  font-size: 0.875rem;
  color: #9ca3af;
  font-weight: 500;
}

.meta-value {
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 600;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.375rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #dbeafe;
}

.article-content {
  line-height: 1.8;
  color: #374151;
}

.article-content :deep(h1) {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
  margin: 2rem 0 1rem 0;
  line-height: 1.3;
}

.article-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 1.5rem 0 1rem 0;
  line-height: 1.4;
}

.article-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 1.25rem 0 0.75rem 0;
  line-height: 1.4;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 1.5rem 0;
  padding-left: 2rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
}

.article-content :deep(pre) {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
}

.article-content :deep(code) {
  background: #f1f5f9;
  color: #e11d48;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.article-content :deep(pre code) {
  background: none;
  color: #334155;
  padding: 0;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #3b82f6;
  background: #f8fafc;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #475569;
}

.article-content :deep(hr) {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 3rem 0;
}

.article-footer {
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .article {
    padding: 2rem 1.5rem;
  }
  
  .article-title {
    font-size: 2rem;
  }
  
  .article-description {
    font-size: 1rem;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .article-content :deep(h1) {
    font-size: 1.75rem;
  }
  
  .article-content :deep(h2) {
    font-size: 1.375rem;
  }
  
  .article-content :deep(pre) {
    padding: 1rem;
    font-size: 0.8rem;
  }
}
</style>