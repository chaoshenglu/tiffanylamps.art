<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// 设置页面头部元数据
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:wght@400;500;600&display=swap'
    }
  ]
})
</script>

<style>
/* 全局CSS变量 */
:root {
  --primary-color: #000000;
  --secondary-color: #000000;
  --accent-color: #000000;
  --text-color: #333;
  --bg-color: #f5f5f5;
  --header-font: 'Playfair Display', serif;
  --body-font: 'Lora', serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--body-font);
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.6;
}

/* 复古装饰元素 */
.vintage-border {
  border: 8px solid transparent;
  border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='75' height='75' viewBox='0 0 75 75'%3E%3Cg fill='%230f4c75' fill-opacity='0.3'%3E%3Cpath d='M0 0h75v75H0V0zm25 25h25v25H25V25z'/%3E%3C/g%3E%3C/svg%3E") 8 stretch;
}

.ornament {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--primary-color);
  text-align: center;
  margin: 20px 0;
}

/* 按钮样式 */
.btn {
  display: inline-block;
  background-color: var(--primary-color);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* 主要内容区 */
.container {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

section {
  margin-bottom: 80px;
}

.section-title {
  font-family: var(--header-font);
  font-size: 2.5rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: var(--secondary-color);
}
</style>
