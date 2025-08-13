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
            <el-select
              v-model="filters.type"
              placeholder="选择分类"
              clearable
              @change="handleFilterChange"
              style="width: 100%"
            >
              <el-option label="全部分类" value="" />
              <el-option label="技术文章" value="article" />
              <el-option label="教程指南" value="tutorial" />
              <el-option label="产品评测" value="review" />
              <el-option label="新闻资讯" value="news" />
              <el-option label="个人思考" value="thoughts" />
              <el-option label="项目分享" value="project" />
              <el-option label="其他" value="other" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="filters.language"
              placeholder="选择语言"
              clearable
              @change="handleFilterChange"
              style="width: 100%"
            >
              <el-option label="全部语言" value="" />
              <el-option label="简体中文" value="zh-CN" />
              <el-option label="繁體中文" value="zh-TW" />
              <el-option label="English" value="en-US" />
              <el-option label="日本語" value="ja-JP" />
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input
              v-model="filters.search"
              placeholder="搜索标题或作者"
              clearable
              @input="handleSearchChange"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button @click="resetFilters">重置筛选</el-button>
          </el-col>
        </el-row>
      </div>
      
      <!-- 文章表格 -->
      <el-table
        :data="posts"
        v-loading="loading"
        stripe
        class="posts-table"
        @sort-change="handleSortChange"
      >
        <el-table-column prop="id" label="ID" width="80" sortable="custom" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip>
          <template #default="{ row }">
            <el-link type="primary" @click="viewPost(row)">{{ row.title }}</el-link>
          </template>
        </el-table-column>
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
            <el-button size="small" @click="viewPost(row)">查看</el-button>
            <el-button size="small" type="danger" @click="deletePost(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 文章详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="selectedPost?.title"
      width="80%"
      class="post-dialog"
    >
      <div v-if="selectedPost" class="post-detail">
        <div class="post-meta">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="作者">{{ selectedPost.author }}</el-descriptions-item>
            <el-descriptions-item label="分类">
              <el-tag :type="getTypeTagType(selectedPost.type)" size="small">
                {{ getTypeName(selectedPost.type) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="语言">
              <el-tag type="info" size="small">
                {{ getLanguageName(selectedPost.language) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="发布时间">{{ formatDate(selectedPost.created_at) }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <el-divider />
        <div class="post-content" v-html="selectedPost.content"></div>
      </div>
    </el-dialog>
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
const dialogVisible = ref(false)
const selectedPost = ref(null)

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
  'article': '技术文章',
  'tutorial': '教程指南',
  'review': '产品评测',
  'news': '新闻资讯',
  'thoughts': '个人思考',
  'project': '项目分享',
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
  return new Date(dateString).toLocaleString('zh-CN')
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

// 查看文章详情
const viewPost = (post) => {
  selectedPost.value = post
  dialogVisible.value = true
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

.post-detail {
  max-height: 60vh;
  overflow-y: auto;
}

.post-meta {
  margin-bottom: 20px;
}

.post-content {
  line-height: 1.8;
  color: #333;
}

.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3),
.post-content :deep(h4),
.post-content :deep(h5),
.post-content :deep(h6) {
  margin: 20px 0 10px 0;
  color: #2c3e50;
}

.post-content :deep(p) {
  margin: 10px 0;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin: 10px 0;
  padding-left: 20px;
}

.post-content :deep(blockquote) {
  margin: 15px 0;
  padding: 10px 15px;
  border-left: 4px solid #409eff;
}

.post-content :deep(code) {
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.post-content :deep(pre) {
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 15px 0;
}
</style>