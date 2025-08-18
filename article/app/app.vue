<template>
  <div>
    <NuxtRouteAnnouncer />
    <Navbar />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup>
// 设置页面 meta
useHead({
  htmlAttrs: {
    lang: 'zh-CN'
  }
})
</script>

<style>
/* 全局样式已在 main.css 中定义 */
main {
  min-height: calc(100vh - 200px);
}
</style>
