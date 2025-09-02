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

        <el-form-item label="中文名称" prop="name_zh">
          <el-input v-model="form.name_zh" placeholder="请输入中文名称" maxlength="200" show-word-limit />
        </el-form-item>
        <el-form-item label="英文名称" prop="name_en">
          <el-input v-model="form.name_en" placeholder="请输入英文名称" maxlength="200" show-word-limit />
        </el-form-item>

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

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Amazon商品ID" prop="amazon_id">
              <el-input v-model="form.amazon_id" placeholder="请输入Amazon商品ID" maxlength="50" show-word-limit />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="天猫商品ID" prop="tmall_id">
              <el-input v-model="form.tmall_id" placeholder="请输入天猫商品ID" maxlength="50" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 规格信息 -->
        <el-divider content-position="left">规格信息</el-divider>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="英寸" prop="inch">
              <el-input-number v-model="form.inch" :precision="2" :step="0.1" :min="0" placeholder="英寸"
                style="width: 100%" />
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
              <el-input-number v-model="form.length" :precision="2" :step="0.1" :min="0" placeholder="长度"
                style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="宽度(cm)" prop="width">
              <el-input-number v-model="form.width" :precision="2" :step="0.1" :min="0" placeholder="宽度"
                style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="高度(cm)" prop="height">
              <el-input-number v-model="form.height" :precision="2" :step="0.1" :min="0" placeholder="高度"
                style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 价格信息 -->
        <el-divider content-position="left">价格信息</el-divider>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="国内价格" prop="price_zh">
              <el-input-number v-model="form.price_zh" :precision="2" :step="1" :min="0" placeholder="国内价格"
                style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="国外价格" prop="price_en">
              <el-input-number v-model="form.price_en" :precision="2" :step="1" :min="0" placeholder="国外价格"
                style="width: 100%" />
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
        <el-divider v-if="isEditMode || form.model" content-position="left">图片管理</el-divider>

        <el-form-item v-if="isEditMode || form.model" label="主图" prop="main_images">
          <div class="upload-section">
            <!-- 拖拽排序区域 -->
            <draggable v-model="mainImageList" item-key="uid" class="draggable-list" :animation="200"
              ghost-class="ghost" @end="onMainImageDragEnd">
              <template #item="{ element: file }">
                <div class="draggable-item">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                  <!-- 状态显示层 -->
                  <div v-if="file.status === 'uploading'" class="upload-progress">
                    <el-progress type="circle" :percentage="file.percentage || 0" :width="60" />
                  </div>
                  <!-- 操作按钮层 -->
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handleMainImagePreview(file)">
                      <el-icon>
                        <ZoomIn />
                      </el-icon>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleMainImageRemove(file)">
                      <el-icon>
                        <Delete />
                      </el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </draggable>
            <!-- 上传按钮 -->
            <el-upload v-if="mainImageList.length < 10" ref="mainUploadRef" :file-list="[]"
              :on-change="handleMainImageChange" :before-upload="beforeUpload" :http-request="uploadMainImage"
              list-type="picture-card" accept="image/*" multiple :show-file-list="false">
              <el-icon>
                <Plus />
              </el-icon>
            </el-upload>
            <div class="upload-tip">支持jpg、png格式，单个文件不超过5MB，最多10张，可拖拽调整顺序</div>
          </div>
        </el-form-item>

        <el-form-item v-if="isEditMode || form.model" label="细节图" prop="detail_images">
          <div class="upload-section">
            <!-- 拖拽排序区域 -->
            <draggable v-model="detailImageList" item-key="uid" class="draggable-list" :animation="200"
              ghost-class="ghost" @end="onDetailImageDragEnd">
              <template #item="{ element: file }">
                <div class="draggable-item">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                  <!-- 状态显示层 -->
                  <div v-if="file.status === 'uploading'" class="upload-progress">
                    <el-progress type="circle" :percentage="file.percentage || 0" :width="60" />
                  </div>
                  <!-- 操作按钮层 -->
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handleDetailImagePreview(file)">
                      <el-icon><zoom-in /></el-icon>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleDetailImageRemove(file)">
                      <el-icon>
                        <Delete />
                      </el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </draggable>
            <!-- 上传按钮 -->
            <el-upload v-if="detailImageList.length < 20" ref="detailUploadRef" :file-list="[]"
              :on-change="handleDetailImageChange" :before-upload="beforeUpload" :http-request="uploadDetailImage"
              list-type="picture-card" accept="image/*" multiple :show-file-list="false">
              <el-icon>
                <Plus />
              </el-icon>
            </el-upload>
            <div class="upload-tip">支持jpg、png格式，单个文件不超过5MB，最多20张，可拖拽调整顺序</div>
          </div>
        </el-form-item>

        <!-- 视频上传 -->
        <el-divider v-if="isEditMode || form.model" content-position="left">视频管理</el-divider>

        <el-form-item v-if="isEditMode || form.model" label="产品视频" prop="videos">
          <div class="upload-section">
            <el-upload ref="videoUploadRef" :file-list="videoList" :on-change="handleVideoChange"
              :on-remove="handleVideoRemove" :before-upload="beforeVideoUpload" :http-request="uploadVideo"
              list-type="text" :limit="5" accept="video/*" multiple>
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
        <el-image :src="previewImageUrl" fit="contain" style="width: 100%; max-height: 70vh;"
          :preview-teleported="true" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
import { supabaseClient, isConnected, autoReconnect } from '../store/supabase'
import draggable from 'vuedraggable'
import { nanoid } from 'nanoid'
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
  amazon_id: '',
  tmall_id: '',
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
  name_zh: [
    { required: true, message: '请输入中文名称', trigger: 'blur' },
    { min: 1, max: 200, message: '中文名称长度在1到200个字符', trigger: 'blur' }
  ],
  name_en: [
    { required: true, message: '请输入英文名称', trigger: 'blur' },
    { min: 1, max: 200, message: '英文名称长度在1到200个字符', trigger: 'blur' }
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
const uploadFileToStorage = async (file, folder, customFileName = null) => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = customFileName ? `${customFileName}.${fileExt}` : `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`
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
    // 在编辑模式下，如果已经有产品型号，使用现有型号，否则使用临时标识
    const modelPrefix = form.model || (isEditMode.value ? lampModel.value : 'temp')
    if (!modelPrefix) {
      throw new Error('请先填写产品型号')
    }
    const nanoId = nanoid().replace(/-/g, '') // 去除中划线
    const fileName = `${modelPrefix}main${nanoId}`
    const url = await uploadFileToStorage(file, 'main-images', fileName)
    form.main_images.push(url)
    
    // 手动添加到文件列表，因为on-change事件现在只在success时触发
    const newFile = {
      uid: `upload_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      name: file.name,
      status: 'success',
      url: url,
      response: { url }
    }
    mainImageList.value.push(newFile)
    
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
    // 在编辑模式下，如果已经有产品型号，使用现有型号，否则使用临时标识
    const modelPrefix = form.model || (isEditMode.value ? lampModel.value : 'temp')
    if (!modelPrefix) {
      throw new Error('请先填写产品型号')
    }
    const nanoId = nanoid().replace(/-/g, '') // 去除中划线
    const fileName = `${modelPrefix}detail${nanoId}`
    const url = await uploadFileToStorage(file, 'detail-images', fileName)
    form.detail_images.push(url)
    
    // 手动添加到文件列表，因为on-change事件现在只在success时触发
    const newFile = {
      uid: `upload_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      name: file.name,
      status: 'success',
      url: url,
      response: { url }
    }
    detailImageList.value.push(newFile)
    
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
    // 在编辑模式下，如果已经有产品型号，使用现有型号，否则使用临时标识
    const modelPrefix = form.model || (isEditMode.value ? lampModel.value : 'temp')
    if (!modelPrefix) {
      throw new Error('请先填写产品型号')
    }
    const nanoId = nanoid().replace(/-/g, '') // 去除中划线
    const fileName = `${modelPrefix}video${nanoId}`
    const url = await uploadFileToStorage(file, 'videos', fileName)
    form.videos.push(url)
    
    // 对于视频上传，Element UI 会自动管理文件列表，所以我们不需要手动添加
    // 只需要确保URL被添加到form.videos数组中
    
    onSuccess({ url })
    ElMessage.success('视频上传成功')
  } catch (error) {
    onError(error)
    ElMessage.error('视频上传失败: ' + error.message)
  }
}

// 文件变化处理 - 主要处理上传进度状态
const handleMainImageChange = (file, fileList) => {
  // 只更新上传中的文件状态，不替换整个列表
  if (file.status === 'uploading') {
    const index = mainImageList.value.findIndex(f => f.uid === file.uid)
    if (index === -1) {
      // 添加新的上传中文件
      mainImageList.value.push({
        ...file,
        uid: file.uid || `upload_${Date.now()}_${Math.random().toString(36).substring(2)}`
      })
    } else {
      // 更新已有文件的上传进度
      mainImageList.value[index] = {
        ...mainImageList.value[index],
        percentage: file.percentage,
        status: file.status
      }
    }
  }
}

const handleDetailImageChange = (file, fileList) => {
  // 只更新上传中的文件状态，不替换整个列表
  if (file.status === 'uploading') {
    const index = detailImageList.value.findIndex(f => f.uid === file.uid)
    if (index === -1) {
      // 添加新的上传中文件
      detailImageList.value.push({
        ...file,
        uid: file.uid || `upload_${Date.now()}_${Math.random().toString(36).substring(2)}`
      })
    } else {
      // 更新已有文件的上传进度
      detailImageList.value[index] = {
        ...detailImageList.value[index],
        percentage: file.percentage,
        status: file.status
      }
    }
  }
}

const handleVideoChange = (file, fileList) => {
  // 对于视频上传，Element UI 的 text 类型列表会自动管理
  // 但我们需要确保不会丢失已有的视频文件
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

// 拖拽结束处理函数
const onMainImageDragEnd = () => {
  // 更新form中的main_images数组，保持与拖拽后的顺序一致
  form.main_images = mainImageList.value.map(file => file.response?.url || file.url).filter(Boolean)
}

const onDetailImageDragEnd = () => {
  // 更新form中的detail_images数组，保持与拖拽后的顺序一致
  form.detail_images = detailImageList.value.map(file => file.response?.url || file.url).filter(Boolean)
}

// 文件移除处理
const handleMainImageRemove = (file) => {
  // 从拖拽列表中删除
  const index = mainImageList.value.findIndex(f => f.uid === file.uid)
  if (index > -1) {
    mainImageList.value.splice(index, 1)
    // 同时从form数组中删除对应的URL
    const urlToRemove = file.response?.url || file.url
    if (urlToRemove) {
      const urlIndex = form.main_images.indexOf(urlToRemove)
      if (urlIndex > -1) {
        form.main_images.splice(urlIndex, 1)
      }
    }
  }
}

const handleDetailImageRemove = (file) => {
  // 从拖拽列表中删除
  const index = detailImageList.value.findIndex(f => f.uid === file.uid)
  if (index > -1) {
    detailImageList.value.splice(index, 1)
    // 同时从form数组中删除对应的URL
    const urlToRemove = file.response?.url || file.url
    if (urlToRemove) {
      const urlIndex = form.detail_images.indexOf(urlToRemove)
      if (urlIndex > -1) {
        form.detail_images.splice(urlIndex, 1)
      }
    }
  }
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
        if (data[key] !== undefined && data[key] !== null) {
          form[key] = data[key]
        }
      })

      // 处理图片和视频列表显示
      if (data.main_images) {
        form.main_images = [...data.main_images]
        mainImageList.value = data.main_images.map((url, index) => ({
          uid: `main-${index}-${url.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10)}`,
          name: `主图${index + 1}`,
          status: 'success',
          url: url,
          response: { url }
        }))
      }

      if (data.detail_images) {
        form.detail_images = [...data.detail_images]
        detailImageList.value = data.detail_images.map((url, index) => ({
          uid: `detail-${index}-${url.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10)}`,
          name: `细节图${index + 1}`,
          status: 'success',
          url: url,
          response: { url }
        }))
      }

      if (data.videos) {
        form.videos = [...data.videos]
        videoList.value = data.videos.map((url, index) => ({
          uid: `video-${index}-${url.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10)}`,
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
          name_zh: form.name_zh,
          name_en: form.name_en,
          abb_zh: form.abb_zh,
          abb_en: form.abb_en,
          amazon_id: form.amazon_id,
          tmall_id: form.tmall_id,
          inch: form.inch,
          length: form.length,
          width: form.width,
          height: form.height,
          type: form.type,
          price_zh: form.price_zh,
          price_en: form.price_en,
          mt: form.mt,
          main_images: form.main_images,
          detail_images: form.detail_images,
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
    } else if (typeof form[key] === 'number') {
      form[key] = null
    } else {
      form[key] = ''
    }
  })
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

/* 拖拽相关样式 */
.draggable-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.draggable-item {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  overflow: hidden;
  cursor: move;
  background: #fff;
}

.draggable-item:hover {
  border-color: #409eff;
}

.draggable-item .el-upload-list__item-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.draggable-item .el-upload-list__item-actions {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
}

.draggable-item:hover .el-upload-list__item-actions {
  opacity: 1;
}

.draggable-item .el-upload-list__item-preview,
.draggable-item .el-upload-list__item-delete {
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.draggable-item .el-upload-list__item-delete {
  display: flex;
  opacity: 1;
  color: white;
  position: relative;
  font-size: 18px;
  margin-bottom: 5px;
}

.draggable-item .el-upload-list__item-delete:hover {
  display: flex;
  opacity: 1;
  color: white;
  position: relative;
  font-size: 18px;
  margin-bottom: 5px;
}

.upload-progress {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

/* 拖拽时的幽灵效果 */
.ghost {
  opacity: 0.5;
  transform: scale(0.95);
}

.el-form-item {
  margin-bottom: 22px;
}

.el-button {
  margin-right: 12px;
}
</style>