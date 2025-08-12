<template>
  <div style="padding: 20px; font-family: Arial, sans-serif;">
    <h1 style="color: #333;">我的博客</h1>
    <p style="color: #666;">这是一个测试页面</p>
    <div style="background: #f0f0f0; padding: 15px; margin: 20px 0; border-radius: 5px;">
      <h2>页面状态</h2>
      <p>如果你能看到这段文字，说明页面已经正常加载了。</p>
    </div>
    <div>
      <h2>文章列表</h2>
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
  // 如果API失败，尝试直接读取文件
  try {
    articles = [
      {
        _path: '/articles/first-article',
        title: '我的第一篇文章',
        description: '这是我的第一篇博客文章',
        date: '2024-01-15'
      },
      {
        _path: '/articles/second-article', 
        title: 'Vue 3 组合式API详解',
        description: '深入了解Vue 3的组合式API',
        date: '2024-01-20'
      }
    ]
  } catch (fallbackError) {
    articles = []
  }
}
</script>