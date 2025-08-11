<template>
  <div>
    <TheHeader />
    <main class="page-container" v-if="data">
      <article class="blog-article">
        <header class="article-header">
          <div class="article-meta">
            <span class="category">{{ data.category }}</span>
            <span class="date">{{ formatDate(data.publishedAt) }}</span>
          </div>
          <h1 class="article-title">{{ data.title }}</h1>
          <p class="article-description">{{ data.description }}</p>
          <div class="article-info">
            <span class="author">{{ $t('common.author') }}: {{ data.author }}</span>
          </div>
        </header>
        
        <div class="article-image" v-if="data.image">
          <img :src="data.image" :alt="data.title" />
        </div>
        
        <div class="article-content">
          <ContentRenderer :value="data" />
        </div>
        
        <footer class="article-footer">
          <div class="tags" v-if="data.tags && data.tags.length">
            <span class="tags-label">{{ $t('common.tags') }}:</span>
            <span v-for="tag in data.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          
          <div class="back-to-list">
            <NuxtLink :to="localePath('/blog')" class="back-link">
              ← {{ $t('common.backToList') }}
            </NuxtLink>
          </div>
        </footer>
      </article>
    </main>
    <div v-else class="page-container">
      <div class="no-content">
        <h1>文章未找到</h1>
        <p>请检查链接是否正确</p>
        <NuxtLink :to="localePath('/blog')" class="back-link">
          ← {{ $t('common.backToList') }}
        </NuxtLink>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// 获取当前文章
const { data } = await useAsyncData(`blog-${route.path}`, () => {
  return queryContent()
    .where({ _path: route.path })
    .findOne()
    .catch(() => null)
})

// 如果没有找到文章，尝试查找对应语言的文章
if (!data.value && route.params.slug) {
  const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
  const { data: altData } = await useAsyncData(`blog-alt-${slug}`, () => {
    return queryContent('blog')
      .where({ _locale: locale.value })
      .where({ _path: { $regex: new RegExp(slug) } })
      .findOne()
      .catch(() => null)
  })
  if (altData.value) {
    data.value = altData.value
  }
}

// 格式化日期
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(locale.value)
}

// 设置页面元数据
if (data.value) {
  useSeoMeta({
    title: `${data.value.title} - 蒂凡尼灯的艺术世界`,
    description: data.value.description
  })
}
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 20px 40px;
}

.blog-article {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.article-header {
  padding: 40px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.article-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.category {
  background: var(--primary-color);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
}

.date {
  color: #666;
}

.article-title {
  font-family: var(--header-font);
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 20px;
  line-height: 1.2;
}

.article-description {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.article-info {
  color: #888;
  font-size: 0.9rem;
}

.article-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  padding: 40px;
  line-height: 1.8;
  color: var(--text-color);
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  font-family: var(--header-font);
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.article-content :deep(h1) {
  font-size: 2rem;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 10px;
}

.article-content :deep(h2) {
  font-size: 1.5rem;
}

.article-content :deep(h3) {
  font-size: 1.3rem;
}

.article-content :deep(p) {
  margin-bottom: 1rem;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
}

.article-content :deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  margin: 1.5rem 0;
  padding-left: 1rem;
  color: #666;
  font-style: italic;
}

.article-footer {
  padding: 40px;
  border-top: 1px solid #eee;
}

.tags {
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.tags-label {
  font-weight: 500;
  color: var(--text-color);
}

.tag {
  background: #f5f5f5;
  color: #666;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
}

.back-to-list {
  text-align: center;
}

.back-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  padding: 10px 20px;
  border: 2px solid var(--primary-color);
  border-radius: 25px;
  transition: all 0.3s ease;
  display: inline-block;
}

.back-link:hover {
  background: var(--primary-color);
  color: white;
}

.no-content {
  text-align: center;
  padding: 60px 20px;
}

.no-content h1 {
  font-family: var(--header-font);
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 20px;
}

.no-content p {
  color: #666;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .article-header {
    padding: 30px 20px;
  }
  
  .article-title {
    font-size: 2rem;
  }
  
  .article-content {
    padding: 30px 20px;
  }
  
  .article-footer {
    padding: 30px 20px;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 10px;
  }
  
  .tags {
    justify-content: center;
  }
}
</style>