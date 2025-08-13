<template>
  <div class="post-list-page">
    <el-card class="list-card">
      <template #header>
        <div class="card-header">
          <span>文章列表</span>
          <el-button type="primary" @click="loadPosts">刷新</el-button>
        </div>
      </template>

      <!-- 筛选区域 -->
      <div class="filter-section">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select v-model="filters.type" placeholder="选择分类" clearable @change="handleFilterChange"
              style="width: 100%">
              <el-option label="历史文化" value="culture" />
              <el-option label="流行趋势" value="trend" />
              <el-option label="热卖榜单" value="hot" />
              <el-option label="拍卖会资料" value="auction" />
              <el-option label="装修案例" value="case" />
              <el-option label="其他" value="other" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="filters.language" placeholder="选择语言" clearable @change="handleFilterChange"
              style="width: 100%">
              <el-option label="简体中文" value="zh-CN" />
              <el-option label="繁體中文" value="zh-TW" />
              <el-option label="English" value="en-US" />
              <el-option label="日本語" value="ja-JP" />
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="filters.search" placeholder="搜索标题或作者" clearable @input="handleSearchChange">
              <template #prefix>
                <el-icon>
                  <Search />
                </el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button @click="resetFilters">重置筛选</el-button>
          </el-col>
        </el-row>
      </div>

      <!-- 文章表格 -->
      <el-table :data="posts" v-loading="loading" stripe class="posts-table" @sort-change="handleSortChange">
        <el-table-column prop="id" label="ID" width="80" sortable="custom" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="type" label="分类" width="120">
          <template #default="{ row }">
            <el-tag :type="getTypeTagType(row.type)" size="small">
              {{ getTypeName(row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="language" label="语言" width="100">
          <template #default="{ row }">
            <el-tag type="info" size="small">
              {{ getLanguageName(row.language) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="发布时间" width="180" sortable="custom">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="editPost(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deletePost(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]" :total="pagination.total" layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>


  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { supabaseClient, isConnected } from '../store/supabase.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const posts = ref([])

// 筛选条件
const filters = reactive({
  type: '',
  language: '',
  search: ''
})

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 排序配置
const sort = reactive({
  prop: 'created_at',
  order: 'descending'
})

// 分类名称映射
const typeNames = {
  'culture': '历史文化',
  'trend': '流行趋势',
  'hot': '热卖榜单',
  'auction': '拍卖会资料',
  'case': '装修案例',
  'other': '其他'
}

// 语言名称映射
const languageNames = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'en-US': 'English',
  'ja-JP': '日本語'
}

// 获取分类名称
const getTypeName = (type) => {
  return typeNames[type] || type || '未分类'
}

// 获取语言名称
const getLanguageName = (language) => {
  return languageNames[language] || language || '未知语言'
}

// 获取分类标签类型
const getTypeTagType = (type) => {
  const typeMap = {
    'article': 'primary',
    'tutorial': 'success',
    'review': 'warning',
    'news': 'info',
    'thoughts': 'danger',
    'project': '',
    'other': 'info'
  }
  return typeMap[type] || 'info'
}

// 格式化日期
const formatDate = (dateString) => {
  // 确保正确解析UTC时间并转换为北京时间
  const date = new Date(dateString + (dateString.includes('Z') ? '' : 'Z'))
  return date.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

// 加载文章列表
const loadPosts = async () => {
  if (!isConnected.value) {
    ElMessageBox.confirm(
      '请先配置Supabase数据库连接',
      '提示',
      {
        confirmButtonText: '去配置',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      router.push('/config')
    })
    return
  }

  loading.value = true

  try {
    let query = supabaseClient.value.from('posts').select('*', { count: 'exact' })

    // 应用筛选条件
    if (filters.type) {
      query = query.eq('type', filters.type)
    }
    if (filters.language) {
      query = query.eq('language', filters.language)
    }
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,author.ilike.%${filters.search}%`)
    }

    // 应用排序
    const ascending = sort.order === 'ascending'
    query = query.order(sort.prop, { ascending })

    // 应用分页
    const from = (pagination.currentPage - 1) * pagination.pageSize
    const to = from + pagination.pageSize - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.error('加载文章错误:', error)
      ElMessage.error(`加载失败: ${error.message}`)
      return
    }

    posts.value = data || []
    pagination.total = count || 0

  } catch (error) {
    console.error('加载文章错误:', error)
    ElMessage.error('加载文章时发生错误')
  } finally {
    loading.value = false
  }
}

// 处理筛选变化
const handleFilterChange = () => {
  pagination.currentPage = 1
  loadPosts()
}

// 处理搜索变化（防抖）
let searchTimeout
const handleSearchChange = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.currentPage = 1
    loadPosts()
  }, 500)
}

// 重置筛选
const resetFilters = () => {
  filters.type = ''
  filters.language = ''
  filters.search = ''
  pagination.currentPage = 1
  loadPosts()
}

// 处理排序变化
const handleSortChange = ({ prop, order }) => {
  if (prop && order) {
    sort.prop = prop
    sort.order = order
    loadPosts()
  }
}

// 处理页面大小变化
const handleSizeChange = (size) => {
  pagination.pageSize = size
  pagination.currentPage = 1
  loadPosts()
}

// 处理当前页变化
const handleCurrentChange = (page) => {
  pagination.currentPage = page
  loadPosts()
}

// 编辑文章
const editPost = (post) => {
  router.push(`/edit/${post.id}`)
}

// 删除文章
const deletePost = async (post) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除文章「${post.title}」吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    const { error } = await supabaseClient.value
      .from('posts')
      .delete()
      .eq('id', post.id)

    if (error) {
      ElMessage.error(`删除失败: ${error.message}`)
    } else {
      ElMessage.success('删除成功')
      loadPosts()
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除时发生错误')
    }
  }
}

// 页面加载时获取文章列表
onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
.post-list-page {
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

.filter-section {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
}

.posts-table {
  margin-bottom: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}


</style>