<template>
  <div class="add-image-page">
    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <span>新增图片</span>
          <el-button @click="goBack">返回列表</el-button>
        </div>
      </template>

      <div class="form-container">
        <el-alert title="图片上传功能待实现" type="info" description="此页面用于上传图片到 drainage 文件夹，功能将在后续版本中实现。" show-icon
          :closable="false" />

        <div class="placeholder-content">
          <el-icon size="64" color="#909399">
            <Picture />
          </el-icon>
          <p class="placeholder-text">图片上传功能开发中</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Picture } from '@element-plus/icons-vue'

const router = useRouter()

// 返回图片列表
const goBack = () => {
  router.push('/images')
}
</script>

<style scoped>
.add-image-page {
  max-width: 800px;
  margin: 0 auto;
}

.form-card {
  border-radius: 12px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-container {
  padding: 20px;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #909399;
}

.placeholder-text {
  margin-top: 16px;
  font-size: 16px;
  color: #606266;
}
</style>