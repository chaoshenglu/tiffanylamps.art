<template>
  <div>
    <h1>我的博客</h1>
    <p>测试页面</p>
    <div v-if="articles && articles.length > 0">
      <h2>文章列表：</h2>
      <ul>
        <li v-for="article in articles" :key="article._path">
          <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>没有找到文章</p>
    </div>
  </div>
</template>

<script setup>
const articles = await queryContent('articles').find()
console.log('找到的文章:', articles)
</script>