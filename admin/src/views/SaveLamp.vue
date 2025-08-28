<template>
  <div class="save-lamp-page">
    <el-card class="lamp-card">
      <template #header>
        <div class="card-header">
          <span>{{ isEditMode ? '编辑产品' : '新增产品' }}</span>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" class="lamp-form" v-loading="loading">
        <!-- 基本信息 -->
        <el-divider content-position="left">基本信息</el-divider>
        
        <el-form-item label="产品型号" prop="model">
          <el-input v-model="form.model" placeholder="请输入产品型号" maxlength="50" show-word-limit :disabled="isEditMode" />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="中文名称" prop="name_zh">
              <el-input v-model="form.name_zh" placeholder="请输入中文名称" maxlength="100" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名称" prop="name_en">
              <el-input v-model="form.name_en" placeholder="请输入英文名称" maxlength="100" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="中文简称" prop="abb_zh">
              <el-input v-model="form.abb_zh" placeholder="请输入中文简称" maxlength="50" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文简称" prop="abb_en">
              <el-input v-model="form.abb_en" placeholder="请输入英文简称" maxlength="50" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 规格信息 -->
        <el-divider content-position="left">规格信息</el-divider>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="英寸" prop="inch">
              <el-input-number v-model="form.inch" :precision="2" :step="0.1" :min="0" placeholder="英寸" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品分类" prop="type">
              <el-select v-model="form.type" placeholder="请选择分类" style="width: 100%">
                <el-option label="台灯" :value="1" />
                <el-option label="落地灯" :value="2" />
                <el-option label="吊灯" :value="3" />
                <el-option label="壁灯" :value="4" />
                <el-option label="小夜灯" :value="5" />
                <el-option label="其它" :value="6" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="长度(cm)" prop="length">
              <el-input-number v-model="form.length" :precision="2" :step="0.1" :min="0" placeholder="长度" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="宽度(cm)" prop="width">
              <el-input-number v-model="form.width" :precision="2" :step="0.1" :min="0" placeholder="宽度" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="高度(cm)" prop="height">
              <el-input-number v-model="form.height" :precision="2" :step="0.1" :min="0" placeholder="高度" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 价格信息 -->
        <el-divider content-position="left">价格信息</el-divider>
        
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="国内价格" prop="price_zh">
              <el-input-number v-model="form.price_zh" :precision="2" :step="1" :min="0" placeholder="国内价格" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="国外价格" prop="price_en">
              <el-input-number v-model="form.price_en" :precision="2" :step="1" :min="0" placeholder="国外价格" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="底座材质" prop="mt">
          <el-select v-model="form.mt" placeholder="请选择底座材质" style="width: 100%">
            <el-option label="树脂" :value="1" />
            <el-option label="铸铁" :value="2" />
            <el-option label="合金" :value="3" />
            <el-option label="全铜" :value="4" />
            <el-option label="木" :value="5" />
            <el-option label="无底座" :value="6" />
          </el-select>
        </el-form-item>

        <!-- 图片上传 -->
        <el-divider content-position="left">图片管理</el-divider>
        
        <el-form-item label="主图" prop="main_images">
          <div class="upload-section">
            <el-upload
              ref="mainUploadRef"
              :file-list="mainImageList"
              :on-change="handleMainImageChange"
              :on-remove="handleMainImageRemove"
              :on-preview="handleMainImagePreview"
              :before-upload="beforeUpload"
              :http-request="uploadMainImage"
              list-type="picture-card"
              :limit="10"
              accept="image/*"
              multiple
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
            <div class="upload-tip">支持jpg、png格式，单个文件不超过5MB，最多10张</div>
          </div>
        </el-form-item>

        <el-form-item label="细节图" prop="detail_images">
          <div class="upload-section">
            <el-upload
              ref="detailUploadRef"
              :file-list="detailImageList"
              :on-change="handleDetailImageChange"
              :on-remove="handleDetailImageRemove"
              :on-preview="handleDetailImagePreview"
              :before-upload="beforeUpload"
              :http-request="uploadDetailImage"
              list-type="picture-card"
              :limit="20"
              accept="image/*"
              multiple
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
            <div class="upload-tip">支持jpg、png格式，单个文件不超过5MB，最多20张</div>
          </div>
        </el-form-item>

        <!-- 视频上传 -->
        <el-divider content-position="left">视频管理</el-divider>
        
        <el-form-item label="产品视频" prop="videos">
          <div class="upload-section">
            <el-upload
              ref="videoUploadRef"
              :file-list="videoList"
              :on-change="handleVideoChange"
              :on-remove="handleVideoRemove"
              :before-upload="beforeVideoUpload"
              :http-request="uploadVideo"
              list-type="text"
              :limit="5"
              accept="video/*"
              multiple
            >
              <el-button type="primary">选择视频文件</el-button>
            </el-upload>
            <div class="upload-tip">支持mp4、mov格式，单个文件不超过50MB，最多5个</div>
          </div>
        </el-form-item>

        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="submitting" size="large">
            {{ isEditMode ? '更新产品' : '创建产品' }}
          </el-button>
          <el-button @click="resetForm" size="large">重置</el-button>
          <el-button @click="$router.go(-1)" size="large">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="previewVisible" title="图片预览" width="60%" center>
      <div class="preview-container">
        <el-image
          :src="previewImageUrl"
          fit="contain"
          style="width: 100%; max-height: 70vh;"
          :preview-teleported="true"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { supabaseClient, isConnected, autoReconnect } from '../store/supabase'

const route = useRoute()
const router = useRouter()

// 表单引用
const formRef = ref()
const mainUploadRef = ref()
const detailUploadRef = ref()
const videoUploadRef = ref()

// 状态管理
const loading = ref(false)
const submitting = ref(false)

// 编辑模式判断
const isEditMode = computed(() => !!route.params.model)
const lampModel = computed(() => route.params.model)

// 表单数据
const form = reactive({
  model: '',
  name_zh: '',
  name_en: '',
  abb_zh: '',
  abb_en: '',
  inch: null,
  length: null,
  width: null,
  height: null,
  type: null,
  price_zh: null,
  price_en: null,
  mt: null,
  main_images: [],
  detail_images: [],
  videos: []
})

// 文件列表
const mainImageList = ref([])
const detailImageList = ref([])
const videoList = ref([])

// 预览相关
const previewVisible = ref(false)
const previewImageUrl = ref('')

// 表单验证规则
const rules = {
  model: [
    { required: true, message: '请输入产品型号', trigger: 'blur' },
    { min: 1, max: 50, message: '型号长度在1到50个字符', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择产品分类', trigger: 'change' }
  ]
}

// 文件上传前验证
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB!')
    return false
  }
  return true
}

// 视频上传前验证
const beforeVideoUpload = (file) => {
  const isVideo = file.type.startsWith('video/')
  const isLt50M = file.size / 1024 / 1024 < 50

  if (!isVideo) {
    ElMessage.error('只能上传视频文件!')
    return false
  }
  if (!isLt50M) {
    ElMessage.error('视频大小不能超过 50MB!')
    return false
  }
  return true
}

// 上传文件到Supabase Storage
const uploadFileToStorage = async (file, folder) => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { data, error } = await supabaseClient.value.storage
      .from('images')
      .upload(filePath, file)

    if (error) {
      throw error
    }

    // 获取公共URL
    const { data: urlData } = supabaseClient.value.storage
      .from('images')
      .getPublicUrl(filePath)

    return urlData.publicUrl
  } catch (error) {
    console.error('文件上传失败:', error)
    throw error
  }
}

// 主图上传
const uploadMainImage = async ({ file, onSuccess, onError }) => {
  try {
    const url = await uploadFileToStorage(file, 'main-images')
    form.main_images.push(url)
    onSuccess({ url })
    ElMessage.success('主图上传成功')
  } catch (error) {
    onError(error)
    ElMessage.error('主图上传失败: ' + error.message)
  }
}

// 细节图上传
const uploadDetailImage = async ({ file, onSuccess, onError }) => {
  try {
    const url = await uploadFileToStorage(file, 'detail-images')
    form.detail_images.push(url)
    onSuccess({ url })
    ElMessage.success('细节图上传成功')
  } catch (error) {
    onError(error)
    ElMessage.error('细节图上传失败: ' + error.message)
  }
}

// 视频上传
const uploadVideo = async ({ file, onSuccess, onError }) => {
  try {
    const url = await uploadFileToStorage(file, 'videos')
    form.videos.push(url)
    onSuccess({ url })
    ElMessage.success('视频上传成功')
  } catch (error) {
    onError(error)
    ElMessage.error('视频上传失败: ' + error.message)
  }
}

// 文件变化处理
const handleMainImageChange = (file, fileList) => {
  mainImageList.value = fileList
}

const handleDetailImageChange = (file, fileList) => {
  detailImageList.value = fileList
}

const handleVideoChange = (file, fileList) => {
  videoList.value = fileList
}

// 图片预览处理
const handleMainImagePreview = (file) => {
  previewImageUrl.value = file.url || file.response?.url || ''
  previewVisible.value = true
}

const handleDetailImagePreview = (file) => {
  previewImageUrl.value = file.url || file.response?.url || ''
  previewVisible.value = true
}

// 文件移除处理
const handleMainImageRemove = (file, fileList) => {
  if (file.response && file.response.url) {
    const index = form.main_images.indexOf(file.response.url)
    if (index > -1) {
      form.main_images.splice(index, 1)
    }
  }
  mainImageList.value = fileList
}

const handleDetailImageRemove = (file, fileList) => {
  if (file.response && file.response.url) {
    const index = form.detail_images.indexOf(file.response.url)
    if (index > -1) {
      form.detail_images.splice(index, 1)
    }
  }
  detailImageList.value = fileList
}

const handleVideoRemove = (file, fileList) => {
  if (file.response && file.response.url) {
    const index = form.videos.indexOf(file.response.url)
    if (index > -1) {
      form.videos.splice(index, 1)
    }
  }
  videoList.value = fileList
}

// 加载产品数据（编辑模式）
const loadLamp = async () => {
  if (!lampModel.value) return

  loading.value = true
  try {
    const { data, error } = await supabaseClient.value
      .from('lamp')
      .select('*')
      .eq('model', lampModel.value)
      .single()

    if (error) {
      throw error
    }

    if (data) {
      // 填充表单数据
      Object.keys(form).forEach(key => {
        if (key.includes('_')) {
          // 处理带下划线的字段名
          const dbKey = key.replace('_', '-')
          if (data[dbKey] !== undefined) {
            form[key] = data[dbKey]
          }
        } else {
          if (data[key] !== undefined) {
            form[key] = data[key]
          }
        }
      })

      // 处理图片和视频列表显示
      if (data['main-images']) {
        form.main_images = [...data['main-images']]
        mainImageList.value = data['main-images'].map((url, index) => ({
          uid: index,
          name: `主图${index + 1}`,
          status: 'success',
          url: url,
          response: { url }
        }))
      }

      if (data['detail-images']) {
        form.detail_images = [...data['detail-images']]
        detailImageList.value = data['detail-images'].map((url, index) => ({
          uid: index,
          name: `细节图${index + 1}`,
          status: 'success',
          url: url,
          response: { url }
        }))
      }

      if (data.videos) {
        form.videos = [...data.videos]
        videoList.value = data.videos.map((url, index) => ({
          uid: index,
          name: `视频${index + 1}`,
          status: 'success',
          url: url,
          response: { url }
        }))
      }
    }
  } catch (error) {
    console.error('加载产品错误:', error)
    ElMessage.error('加载产品数据失败')
    router.push('/lamps')
  } finally {
    loading.value = false
  }
}

// 提交表单
const submitForm = async () => {
  if (!isConnected.value) {
    const reconnected = await autoReconnect()
    if (!reconnected) {
      ElMessage.error('数据库连接失败，请检查环境配置')
      return
    }
  }

  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true

      try {
        const lampData = {
          model: form.model,
          'name-zh': form.name_zh,
          'name-en': form.name_en,
          'abb-zh': form.abb_zh,
          'abb-en': form.abb_en,
          inch: form.inch,
          length: form.length,
          width: form.width,
          height: form.height,
          type: form.type,
          'price-zh': form.price_zh,
          'price-en': form.price_en,
          mt: form.mt,
          'main-images': form.main_images,
          'detail-images': form.detail_images,
          videos: form.videos
        }

        let result
        if (isEditMode.value) {
          // 更新产品
          result = await supabaseClient.value
            .from('lamp')
            .update(lampData)
            .eq('model', lampModel.value)
        } else {
          // 创建新产品
          result = await supabaseClient.value
            .from('lamp')
            .insert([lampData])
        }

        const { error } = result

        if (error) {
          console.error(isEditMode.value ? '更新错误:' : '创建错误:', error)
          ElMessage.error(`${isEditMode.value ? '更新' : '创建'}失败: ${error.message}`)
          return
        }

        ElMessage.success(`${isEditMode.value ? '更新' : '创建'}成功！`)
        router.push('/lamps')
      } catch (error) {
        console.error('操作错误:', error)
        ElMessage.error('操作失败，请重试')
      } finally {
        submitting.value = false
      }
    }
  })
}

// 重置表单
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  
  // 清空文件列表
  mainImageList.value = []
  detailImageList.value = []
  videoList.value = []
  
  // 重置表单数据
  Object.keys(form).forEach(key => {
    if (Array.isArray(form[key])) {
      form[key] = []
    } else {
      form[key] = null
    }
  })
  form.model = ''
  form.name_zh = ''
  form.name_en = ''
  form.abb_zh = ''
  form.abb_en = ''
}

// 组件挂载
onMounted(async () => {
  if (!isConnected.value) {
    const reconnected = await autoReconnect()
    if (!reconnected) {
      ElMessage.error('数据库连接失败，请检查环境配置')
      return
    }
  }
  
  // 如果是编辑模式，加载产品数据
  if (isEditMode.value) {
    await loadLamp()
  }
})
</script>

<style scoped>
.save-lamp-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.lamp-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
}

.lamp-form {
  padding: 20px;
}

.upload-section {
  width: 100%;
}

.upload-tip {
  margin-top: 8px;
  color: #909399;
  font-size: 12px;
  line-height: 1.4;
}

:deep(.el-upload--picture-card) {
  width: 100px;
  height: 100px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 100px;
  height: 100px;
}

:deep(.el-divider__text) {
  font-weight: 600;
  color: #409eff;
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.el-form-item {
  margin-bottom: 22px;
}

.el-button {
  margin-right: 12px;
}
</style>