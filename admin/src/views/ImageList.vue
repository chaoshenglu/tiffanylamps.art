<template>
  <div class="image-list-page">
    <el-card class="list-card">
      <template #header>
        <div class="card-header">
          <span>图片列表</span>
          <el-button type="primary" @click="addImage">新增图片</el-button>
        </div>
      </template>

      <!-- 搜索框 -->
      <div class="search-container">
        <el-input
          v-model="searchQuery"
          placeholder="搜索文件名称"
          clearable
          @input="handleSearch"
          style="width: 300px;"
        >
          <template #prefix>
            <el-icon><search /></el-icon>
          </template>
        </el-input>
      </div>

      <!-- 图片表格 -->
      <el-table :data="images" v-loading="loading" stripe class="images-table">
        <el-table-column label="缩略图" width="80">
          <template #default="{ row }">
            <el-image :src="row.url" :preview-src-list="[row.url]" fit="cover"
              style="width: 50px; height: 50px; border-radius: 4px;" :preview-teleported="true" />
          </template>
        </el-table-column>
        <el-table-column prop="url" label="图片地址" show-overflow-tooltip />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="copyLink(row)">复制链接</el-button>
            <el-button size="small" type="danger" @click="deleteImage(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize"
          :total="pagination.total" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { supabaseClient, isConnected, autoReconnect } from '../store/supabase.js'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const router = useRouter()
const loading = ref(false)
const images = ref([])
const searchQuery = ref('')
const searchTimeout = ref(null)

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 缓存文件总数，避免重复调用
const totalCountCache = ref(null)
const cacheTimestamp = ref(0)
const CACHE_DURATION = 30000 // 30秒缓存

// 搜索处理 - 使用原生防抖避免频繁API调用
const handleSearch = () => {
  // 清除之前的定时器
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  // 设置新的定时器，300ms后执行搜索
  searchTimeout.value = setTimeout(() => {
    loadImages()
  }, 300)
}

// 获取文件总数
const getTotalFilesCount = async (forceRefresh = false) => {
  const now = Date.now()
  
  // 使用缓存（非搜索状态且缓存有效）
  if (!forceRefresh && !searchQuery.value && totalCountCache.value !== null &&
      (now - cacheTimestamp.value) < CACHE_DURATION) {
    return totalCountCache.value
  }

  try {
    // 获取所有文件（不限制数量）来计数
    const { data, error } = await supabaseClient.value.storage
      .from('images')
      .list('dr', {
        limit: 1000, // 设置一个足够大的限制来获取所有文件
        search: searchQuery.value
      })

    if (error) {
      console.error('获取文件总数错误:', error)
      return 0
    }

    // 过滤掉文件夹，只保留文件并计数
    const count = data.filter(item => !item.name.endsWith('/')).length
    
    // 缓存非搜索状态的总数
    if (!searchQuery.value) {
      totalCountCache.value = count
      cacheTimestamp.value = now
    }
    
    return count
  } catch (error) {
    console.error('获取文件总数错误:', error)
    return 0
  }
}

// 加载图片列表
const loadImages = async () => {
  // 如果未连接，尝试自动重连
  if (!isConnected.value) {
    const reconnected = await autoReconnect()
    if (!reconnected) {
      ElMessage.error('数据库连接失败，请检查环境配置')
      return
    }
  }

  loading.value = true

  try {
    // 获取 dr 文件夹中的文件，支持搜索
    const listOptions = {
      limit: pagination.pageSize,
      offset: (pagination.currentPage - 1) * pagination.pageSize
    }
    
    // 如果有关键词，添加搜索条件
    if (searchQuery.value) {
      listOptions.search = searchQuery.value
    }

    const { data, error } = await supabaseClient.value.storage
      .from('images')
      .list('dr', listOptions)

    if (error) {
      console.error('加载图片错误:', error)
      ElMessage.error(`加载失败: ${error.message}`)
      return
    }

    // 过滤掉文件夹，只保留文件
    const files = data.filter(item => !item.name.endsWith('/'))

    // 获取每个文件的公开 URL
    const imagesWithUrls = files.map(file => {
      const { data: { publicUrl } } = supabaseClient.value.storage
        .from('images')
        .getPublicUrl(`dr/${file.name}`)

      return {
        name: file.name,
        url: publicUrl,
        path: `dr/${file.name}`
      }
    })

    images.value = imagesWithUrls
    
    // 获取文件总数并设置分页
    if (searchQuery.value) {
      // 搜索时，获取准确的搜索结果总数
      pagination.total = await getTotalFilesCount(true)
    } else {
      // 非搜索时，使用缓存的总文件数
      pagination.total = await getTotalFilesCount()
    }

  } catch (error) {
    console.error('加载图片错误:', error)
    ElMessage.error('加载图片时发生错误')
  } finally {
    loading.value = false
  }
}

// 处理当前页变化
const handleCurrentChange = (page) => {
  pagination.currentPage = page
  loadImages()
}

// 新增图片
const addImage = () => {
  router.push('/images/add')
}

const copyLink = (image) => {
  navigator.clipboard.writeText(image.url).then(() => {
    ElMessage.success('链接已复制到剪贴板')
  }).catch(err => {
    ElMessage.error('复制链接失败')
  })
}

// 删除图片
const deleteImage = async (image) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除图片「${image.name}」吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    const { error } = await supabaseClient.value.storage
      .from('images')
      .remove([image.path])

    if (error) {
      ElMessage.error(`删除失败: ${error.message}`)
    } else {
      ElMessage.success('删除成功')
      // 清除缓存，强制刷新总数
      totalCountCache.value = null
      loadImages()
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除时发生错误')
    }
  }
}

// 页面加载时获取图片列表
onMounted(() => {
  loadImages()
})
</script>

<style scoped>
.image-list-page {
  max-width: 1200px;
  margin: 0 auto;
}

.list-card {
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

.images-table {
  margin-bottom: 20px;
}

.search-container {
  margin-bottom: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}
</style>