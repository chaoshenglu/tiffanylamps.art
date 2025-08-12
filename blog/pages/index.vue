<template>
  <div style="padding: 20px; font-family: Arial, sans-serif;">
    <h1 style="color: #333;">我的博客</h1>
    <div>
      <div v-if="articles && articles.length > 0">
        <div v-for="article in articles" :key="article._path" style="margin: 10px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
          <h3 style="margin: 0 0 10px 0;">
            <NuxtLink :to="article._path" style="color: #0066cc; text-decoration: none;">{{ article.title }}</NuxtLink>
          </h3>
          <p style="color: #666; margin: 5px 0;">{{ article.description }}</p>
          <small style="color: #999;">发布时间: {{ new Date(article.date).toLocaleDateString('zh-CN') }}</small>
        </div>
      </div>
      <p v-else style="color: #999;">暂无文章</p>
    </div>
  </div>
</template>

<script setup>
let articles = []
try {
  const response = await $fetch('/api/_content/query', {
    method: 'GET',
    query: {
      _params: JSON.stringify({
        where: [{ _path: { $regex: '/articles' } }]
      })
    }
  })
  articles = response || []
  console.log('找到的文章:', articles)
} catch (error) {
  console.error('获取文章失败:', error)
}
</script>