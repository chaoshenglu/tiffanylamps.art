<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { initializeSupabase } from './store/supabase.js'

const router = useRouter()

onMounted(async () => {
  // 页面加载时自动初始化Supabase连接
  try {
    const result = initializeSupabase()
    if (!result.success) {
      console.error('Supabase初始化失败:', result.error)
    }
  } catch (error) {
    console.error('初始化失败:', error)
  }
})

function refresh() {
  window.location.reload()
}
</script>

<template>
  <div class="app">
    <el-container>
      <el-header class="header">
        <div class="header-content">
          <h1 class="title" @click="refresh">豪蒂后台管理</h1>
          <el-menu mode="horizontal" :ellipsis="false" :default-active="$route.path" class="nav-menu" router>
            <el-menu-item index="/list">文章列表</el-menu-item>
            <el-menu-item index="/lamps">产品列表</el-menu-item>
            <el-menu-item index="/images">图片列表</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  min-height: 100vh;
}

.app {
  min-height: 100vh;
}

.header {
  background: #1a1a1a;
  border-bottom: 1px solid #333;
  padding: 0;
}

.header-content {
  display: flex;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  height: 100%;
  padding-right: 20px;
}

.title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 20px;
}

.nav-menu {
  background: transparent;
  border: none;
  margin-left: auto;
}

.nav-menu .el-menu-item {
  color: #ccc;
  border-bottom: 2px solid transparent;
}

.nav-menu .el-menu-item:hover,
.nav-menu .el-menu-item.is-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-bottom-color: #409eff;
}

.main {
  background: transparent;
  padding: 20px;
  min-height: calc(100vh - 60px);
}

.el-container {
  min-height: 100vh;
}
</style>
