<template>
  <div class="config-page">
    <el-card class="config-card">
      <template #header>
        <div class="card-header">
          <span>Supabase 数据库配置</span>
        </div>
      </template>
      
      <el-form :model="form" label-width="120px" class="config-form">
        <el-form-item label="项目URL">
          <el-input
            v-model="form.url"
            placeholder="请输入Supabase项目URL"
            :disabled="isConnected"
          />
        </el-form-item>
        
        <el-form-item label="API密钥">
          <el-input
            v-model="form.key"
            type="password"
            placeholder="请输入Supabase API密钥"
            :disabled="isConnected"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button
            v-if="!isConnected"
            type="primary"
            @click="connectDatabase"
            :loading="loading"
          >
            连接数据库
          </el-button>
          <el-button
            v-else
            type="danger"
            @click="disconnectDatabase"
          >
            断开连接
          </el-button>
        </el-form-item>
      </el-form>
      
      <el-divider />
      
      <div class="status-section">
        <h3>连接状态</h3>
        <el-tag :type="isConnected ? 'success' : 'info'" size="large">
          {{ isConnected ? '已连接' : '未连接' }}
        </el-tag>
      </div>
      
      <el-divider />
      
      <div class="help-section">
        <h3>数据库表结构</h3>
        <p>请确保在Supabase中创建了以下表结构：</p>
        <el-card class="sql-card">
          <pre class="sql-code">CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'article',
  language TEXT DEFAULT 'zh-CN',
  created_at TIMESTAMP DEFAULT NOW()
);</pre>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { initializeSupabase, clearSupabaseConfig, isConnected } from '../store/supabase.js'

const router = useRouter()

const form = ref({
  url: '',
  key: ''
})

const loading = ref(false)

// 从localStorage恢复配置
onMounted(() => {
  const savedUrl = localStorage.getItem('supabase_url')
  const savedKey = localStorage.getItem('supabase_key')
  
  if (savedUrl) form.value.url = savedUrl
  if (savedKey) form.value.key = savedKey
})

const connectDatabase = async () => {
  if (!form.value.url || !form.value.key) {
    ElMessage.error('请输入完整的URL和API密钥')
    return
  }
  
  loading.value = true
  
  try {
    const result = initializeSupabase(form.value.url, form.value.key)
    
    if (result.success) {
      ElMessage.success('数据库连接成功！')
      // 连接成功后自动跳转到文章列表页面
      setTimeout(() => {
        router.push('/list')
      }, 1500)
    } else {
      ElMessage.error(`连接失败: ${result.error}`)
    }
  } catch (error) {
    ElMessage.error('连接时发生错误')
  } finally {
    loading.value = false
  }
}

const disconnectDatabase = () => {
  clearSupabaseConfig()
  form.value.url = ''
  form.value.key = ''
  ElMessage.success('已断开数据库连接')
}
</script>

<style scoped>
.config-page {
  max-width: 800px;
  margin: 0 auto;
}

.config-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.card-header {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.config-form {
  margin-top: 20px;
}

.status-section {
  text-align: center;
  padding: 20px 0;
}

.status-section h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.help-section h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.help-section p {
  margin-bottom: 15px;
  color: #666;
}

.sql-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
}

.sql-code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #2c3e50;
  margin: 0;
  white-space: pre-wrap;
}
</style>