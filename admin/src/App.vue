<script setup>
import { onMounted } from 'vue'
import { restoreSupabaseConfig } from './store/supabase.js'

onMounted(() => {
  // 页面加载时尝试恢复Supabase配置
  restoreSupabaseConfig()
})
</script>

<template>
  <div class="app">
    <el-container>
      <el-header class="header">
        <div class="header-content">
          <h1 class="title">博客管理系统</h1>
          <el-menu
            mode="horizontal"
            :default-active="$route.path"
            class="nav-menu"
            router
          >
            <el-menu-item index="/config">Supabase配置</el-menu-item>
            <el-menu-item index="/create">发布文章</el-menu-item>
            <el-menu-item index="/list">文章列表</el-menu-item>
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
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
}

.title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-menu {
  background: transparent;
  border: none;
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
