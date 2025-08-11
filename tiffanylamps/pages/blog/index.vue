<template>
  <div>
    <TheHeader />
    <main class="page-container">
      <div class="blog-header">
        <h1>{{ categoryTitle }}</h1>
        <p>{{ $t('hero.subtitle') }}</p>
      </div>
      
      <div class="blog-list" v-if="data && data.length > 0">
        <article 
          v-for="article in data" 
          :key="article._path"
          class="blog-card"
        >
          <NuxtLink :to="localePath(article._path)" class="card-link">
            <div class="card-image">
              <img :src="article.image" :alt="article.title" />
            </div>
            <div class="card-content">
              <div class="card-meta">
                <span class="category">{{ article.category }}</span>
                <span class="date">{{ formatDate(article.publishedAt) }}</span>
              </div>
              <h2 class="card-title">{{ article.title }}</h2>
              <p class="card-description">{{ article.description }}</p>
              <div class="card-footer">
                <span class="author">{{ $t('common.author') }}: {{ article.author }}</span>
                <span class="read-more">{{ $t('common.readMore') }} →</span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>
      
      <div v-else class="no-content">
        <p>暂无文章内容</p>
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// 获取category查询参数
const category = computed(() => route.query.category)

// 根据category显示标题
const categoryTitle = computed(() => {
  if (category.value) {
    return category.value
  }
  return t('navigation.blog')
})

// 根据当前语言和类别获取文章
const { data } = await useAsyncData('blog-list', () => {
  let query = queryContent('blog')
  
  // 如果有category参数，则按类别筛选
  if (category.value) {
    query = query.where({ category: category.value })
  }
  
  return query.sort({ publishedAt: -1 }).find()
}, {
  watch: [category]
})

// 格式化日期
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(locale.value)
}

useSeoMeta({
  title: '文章博客 - 蒂凡尼灯的艺术世界',
  description: '探索蒂凡尼灯的艺术文化，阅读精彩文章'
})
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px;
}

.blog-header {
  text-align: center;
  margin-bottom: 60px;
}

.blog-header h1 {
  font-family: var(--header-font);
  font-size: 3rem;
  color: var(--text-color);
  margin-bottom: 20px;
}

.blog-header p {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.blog-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.card-image {
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 24px;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.9rem;
}

.category {
  background: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
}

.date {
  color: #666;
}

.card-title {
  font-family: var(--header-font);
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 12px;
  line-height: 1.4;
}

.card-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.author {
  color: #888;
}

.read-more {
  color: var(--primary-color);
  font-weight: 500;
}

.no-content {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

@media (max-width: 768px) {
  .blog-header h1 {
    font-size: 2.5rem;
  }
  
  .blog-list {
    grid-template-columns: 1fr;
  }
  
  .card-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>