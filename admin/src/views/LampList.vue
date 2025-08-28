<template>
  <div class="lamp-list-page">
    <el-card class="list-card">
      <template #header>
        <div class="card-header">
          <span>产品列表</span>
          <el-button type="primary" @click="createLamp">发布产品</el-button>
        </div>
      </template>

      <!-- 筛选区域 -->
      <div class="filter-section">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-select v-model="filters.type" placeholder="选择分类" clearable @change="handleFilterChange"
              style="width: 100%">
              <el-option label="台灯" :value="1" />
              <el-option label="落地灯" :value="2" />
              <el-option label="吊灯" :value="3" />
              <el-option label="壁灯" :value="4" />
              <el-option label="小夜灯" :value="5" />
              <el-option label="其它" :value="6" />
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input v-model="filters.search" placeholder="搜索型号或名称" clearable @input="handleSearchChange">
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

      <!-- 产品表格 -->
      <el-table :data="lamps" v-loading="loading" stripe class="lamps-table" @sort-change="handleSortChange">
        <el-table-column prop="model" label="型号" width="90" show-overflow-tooltip />
        <el-table-column label="主图" width="100">
          <template #default="{ row }">
            <el-image
              v-if="row['main-images'] && row['main-images'].length > 0"
              :src="row['main-images'][0]"
              :preview-src-list="row['main-images']"
              fit="cover"
              style="width: 60px; height: 60px; border-radius: 4px;"
              :preview-teleported="true"
            />
            <div v-else class="no-image">无图片</div>
          </template>
        </el-table-column>
        <el-table-column prop="abb-zh" label="中文简称" show-overflow-tooltip />
        <el-table-column prop="inch" label="英寸">
          <template #default="{ row }">
            {{ row.inch }}″
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型">
          <template #default="{ row }">
            <el-tag :type="getTypeTagType(row.type)" size="small">
              {{ getTypeName(row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="price-zh" label="国内价">
          <template #default="{ row }">
            <span v-if="row['price-zh']">¥{{ row['price-zh'] }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="price-en" label="国外价">
          <template #default="{ row }">
            <span v-if="row['price-en']">${{ row['price-en'] }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="editLamp(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteLamp(row)">删除</el-button>
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
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { supabaseClient, isConnected, autoReconnect } from '../store/supabase.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const lamps = ref([])

// 筛选条件
const filters = reactive({
  type: '',
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
  prop: 'model',
  order: 'ascending'
})

// 分类名称映射
const typeNames = {
  1: '台灯',
  2: '落地灯',
  3: '吊灯',
  4: '壁灯',
  5: '小夜灯',
  6: '其它'
}

// 获取分类名称
const getTypeName = (type) => {
  return typeNames[type] || '未分类'
}

// 获取分类标签类型
const getTypeTagType = (type) => {
  const typeMap = {
    1: 'primary',
    2: 'success',
    3: 'warning',
    4: 'info',
    5: 'danger',
    6: ''
  }
  return typeMap[type] || 'info'
}

// 加载产品列表
const loadLamps = async () => {
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
    let query = supabaseClient.value.from('lamp').select('*', { count: 'exact' })

    // 应用筛选条件
    if (filters.type) {
      query = query.eq('type', filters.type)
    }
    if (filters.search) {
      query = query.or(`model.ilike.%${filters.search}%,name-zh.ilike.%${filters.search}%,name-en.ilike.%${filters.search}%`)
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
      console.error('加载产品错误:', error)
      
      // 如果是认证错误，尝试重连
      if (error.code === 'PGRST301' || error.message.includes('JWT') || error.message.includes('authentication')) {
        const reconnected = await autoReconnect()
        if (reconnected) {
          // 重连成功，重新尝试加载
          ElMessage.warning('连接已重新建立，正在重新加载...')
          setTimeout(() => loadLamps(), 1000)
          return
        }
      }
      
      ElMessage.error(`加载失败: ${error.message}`)
      return
    }

    lamps.value = data || []
    pagination.total = count || 0

  } catch (error) {
    console.error('加载产品错误:', error)
    ElMessage.error('加载产品时发生错误')
  } finally {
    loading.value = false
  }
}

// 处理筛选变化
const handleFilterChange = () => {
  pagination.currentPage = 1
  loadLamps()
}

// 处理搜索变化（防抖）
let searchTimeout
const handleSearchChange = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.currentPage = 1
    loadLamps()
  }, 500)
}

// 重置筛选
const resetFilters = () => {
  filters.type = ''
  filters.search = ''
  pagination.currentPage = 1
  loadLamps()
}

// 处理排序变化
const handleSortChange = ({ prop, order }) => {
  if (prop && order) {
    sort.prop = prop
    sort.order = order
    loadLamps()
  }
}

// 处理页面大小变化
const handleSizeChange = (size) => {
  pagination.pageSize = size
  pagination.currentPage = 1
  loadLamps()
}

// 处理当前页变化
const handleCurrentChange = (page) => {
  pagination.currentPage = page
  loadLamps()
}

// 发布产品
const createLamp = () => {
  router.push('/lamp/create')
}

// 编辑产品
const editLamp = (lamp) => {
  router.push(`/lamp/edit/${lamp.model}`)
}

// 删除产品
const deleteLamp = async (lamp) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除产品「${lamp.model} - ${lamp['name-zh']}」吗？`,
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    const { error } = await supabaseClient.value
      .from('lamp')
      .delete()
      .eq('model', lamp.model)

    if (error) {
      ElMessage.error(`删除失败: ${error.message}`)
    } else {
      ElMessage.success('删除成功')
      loadLamps()
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除时发生错误')
    }
  }
}

// 页面加载时获取产品列表
onMounted(() => {
  loadLamps()
})
</script>

<style scoped>
.lamp-list-page {
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

.lamps-table {
  margin-bottom: 20px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.no-image {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  border-radius: 4px;
  color: #909399;
  font-size: 12px;
}
</style>