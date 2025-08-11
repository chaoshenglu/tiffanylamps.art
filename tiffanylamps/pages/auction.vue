<template>
  <div>
    <TheHeader />
    <main class="page-container">
      <h1>拍卖会</h1>
      <p>这里是拍卖会页面的内容。</p>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'

useSeoMeta({
  title: '拍卖会 - 蒂凡尼灯的艺术世界',
  description: '参与蒂凡尼灯拍卖会'
})
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px; /* 顶部留白以避开固定头部 */
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 40px;
}

p {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
}
</style>