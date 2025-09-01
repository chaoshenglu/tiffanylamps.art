<template>
  <div class="add-image-page">
    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <span>新增图片（文章插图）</span>
          <el-button @click="goBack">返回列表</el-button>
        </div>
      </template>

      <div class="form-container">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
          <!-- 是否关联商品 -->
          <el-form-item label="是否关联商品">
            <el-radio-group v-model="haveRelatedProduct">
              <el-radio :value="0">否</el-radio>
              <el-radio :value="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 商品ID信息 -->
          <el-form-item v-if="haveRelatedProduct==1" label="Amazon ID" prop="amazonId">
            <el-input v-model="form.amazonId" placeholder="请输入Amazon商品ID" style="width: 300px;margin-right: 15px;" />
            <el-popover placement="right" :width="500" trigger="hover">
              <template #reference>
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </template>
              <img src="/src/assets/amazonTip.webp" style="width: 100%;" />
            </el-popover>
          </el-form-item>

          <el-form-item v-if="haveRelatedProduct==1" label="天猫 ID" prop="tmallId">
            <el-input v-model="form.tmallId" placeholder="请输入天猫商品ID" style="width: 300px;margin-right: 15px;" />
            <el-popover placement="right" :width="500" trigger="hover">
              <template #reference>
                <el-icon>
                  <QuestionFilled />
                </el-icon>
              </template>
              <img src="/src/assets/tmallTip.webp" style="width: 100%;" />
            </el-popover>
          </el-form-item>

          <!-- 图片上传区域 -->
          <el-form-item label="图片" required>
            <div class="upload-section">
              <el-alert title="请注意：" type="warning" :closable="false" />
              <el-alert title="1.发布产品，可以直接上传图片，不需要在这里上传。" type="warning" :closable="false" />
              <el-alert title="2.这里的图片，仅作为文章中的插图使用。" type="warning" :closable="false" style="margin-bottom: 16px;" />
              <el-upload v-model:file-list="fileList" action="#" multiple :auto-upload="false"
                :on-change="handleFileChange" :on-remove="handleFileRemove" list-type="picture-card"
                :before-upload="beforeUpload">
                <el-icon>
                  <Plus />
                </el-icon>
              </el-upload>
            </div>
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm" :loading="loading">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus, QuestionFilled } from '@element-plus/icons-vue'
import { supabaseClient, isConnected, autoReconnect } from '../store/supabase.js'
import { nanoid } from 'nanoid'

const router = useRouter()
const formRef = ref()
const loading = ref(false)
const haveRelatedProduct = ref(0)
const fileList = ref([])

// 表单数据
const form = reactive({
  amazonId: '',
  tmallId: ''
})

// 表单验证规则
const rules = reactive({
  amazonId: [
    {
      required: true,
      message: '请输入Amazon商品ID',
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (haveRelatedProduct.value && !value) {
          callback(new Error('请输入Amazon商品ID'))
        } else {
          callback()
        }
      }
    }
  ],
  tmallId: [
    {
      required: true,
      message: '请输入天猫商品ID',
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (haveRelatedProduct.value && !value) {
          callback(new Error('请输入天猫商品ID'))
        } else {
          callback()
        }
      }
    }
  ]
})

// 文件选择变化
const handleFileChange = (file, files) => {
  fileList.value = files
}

// 文件移除
const handleFileRemove = (file, files) => {
  fileList.value = files
}

// 上传前验证
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    ElMessage.error('只能上传图片文件')
    return false
  }

  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过5MB')
    return false
  }

  return false // 返回false阻止自动上传
}


// 提交表单
const submitForm = async () => {
  if (!formRef.value) return

  try {
    // 验证表单
    await formRef.value.validate()

    // 检查是否有文件
    if (fileList.value.length === 0) {
      ElMessage.warning('请至少上传一张图片')
      return
    }

    loading.value = true

    // 如果未连接，尝试自动重连
    if (!isConnected.value) {
      const reconnected = await autoReconnect()
      if (!reconnected) {
        ElMessage.error('数据库连接失败，请检查环境配置')
        return
      }
    }

    // 上传所有图片
    const uploadPromises = fileList.value.map(async (file, index) => {
      const random4Digits = Math.floor(1000 + Math.random() * 9000) // 生成4位随机数
      const fileExtension = file.name.split('.').pop()
      
      let fileName
      if (haveRelatedProduct.value) {
        // 关联商品时使用商品ID
        fileName = `dr/${form.amazonId}-${form.tmallId}-${random4Digits}${index}.${fileExtension}`
      } else {
        // 不关联商品时使用nanoid生成文件名
        const nanoId = nanoid().replace(/-/g, '') // 去除中划线
        fileName = `dr/${nanoId}${index}.${fileExtension}`
      }

      const { data, error } = await supabaseClient.value.storage
        .from('images')
        .upload(fileName, file.raw)

      if (error) {
        throw new Error(`上传失败: ${error.message}`)
      }

      return data
    })

    // 等待所有上传完成
    await Promise.all(uploadPromises)

    ElMessage.success('图片上传成功！')
    resetForm()

  } catch (error) {
    console.error('上传错误:', error)
    ElMessage.error(error.message || '上传失败，请重试')
  } finally {
    loading.value = false
  }
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  fileList.value = []
}

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

.upload-section {
  width: 100%;
}

:deep(.el-upload-list--picture-card) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

:deep(.el-upload--picture-card) {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
</style>