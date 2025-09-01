<template>
  <div class="image-list-page">
    <el-card class="list-card">
      <template #header>
        <div class="card-header">
          <span>图片列表</span>
          <el-button type="primary" @click="addImage">新增图片</el-button>
        </div>
      </template>

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

    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { supabaseClient, isConnected, autoReconnect } from '../store/supabase.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const images = ref([])

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
    // 获取 dr 文件夹中的所有文件
    const { data, error } = await supabaseClient.value.storage
      .from('images')
      .list('dr', {
        limit: 500
      })

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
    pagination.total = files.length // 这里需要获取总文件数，但 list API 不返回总数
    // 为了分页正常工作，可能需要实现一个计数功能

  } catch (error) {
    console.error('加载图片错误:', error)
    ElMessage.error('加载图片时发生错误')
  } finally {
    loading.value = false
  }
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

</style>