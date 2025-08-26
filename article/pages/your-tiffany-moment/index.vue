<template>
  <div class="tiffany-moment-page">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1>{{ $t('home.moment') }}</h1>
      </div>

      <!-- 展示区域 -->
      <section class="moments-display">
        <div v-if="momentsLoading" class="loading">
          <div class="spinner"></div>
        </div>
        
        <div v-else-if="moments.length === 0" class="no-moments">
          <p>暂无分享内容，快来成为第一个分享者吧！</p>
        </div>
        
        <div v-else class="moments-grid">
          <div v-for="moment in moments" :key="moment.id" class="moment-card">
            <div class="moment-header">
              <div class="user-info">
                <div class="avatar">
                    <img src="/assets/head.svg">
                </div>
                <div class="user-details">
                  <h4>{{ moment.nickname || '匿名用户' }}</h4>
                  <span class="time">{{ formatDate(moment.created_at) }}</span>
                </div>
              </div>
            </div>
            
            <div class="moment-content">
              <p>{{ moment.content }}</p>
            </div>
            
            <div v-if="moment.images && moment.images.length > 0" class="moment-images">
              <div class="image-grid" :class="`grid-${Math.min(moment.images.length, 9)}`">
                <div v-for="(image, index) in moment.images.slice(0, 9)" :key="index" class="image-item">
                  <NuxtImg :src="image" :alt="`用户分享图片 ${index + 1}`" class="moment-image" @click="openImageModal(image)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 投稿表单 -->
      <section class="submit-form">
        <div class="form-container">
          <h3>{{ $t('home.momentDesc') }}</h3>
          <form @submit.prevent="submitMoment" class="moment-form">
            <div class="form-group">
              <label for="nickname">昵称（可选）</label>
              <input 
                id="nickname" 
                v-model="form.nickname" 
                type="text" 
                placeholder="请输入您的昵称"
                maxlength="20"
              />
            </div>
            
            <div class="form-group">
              <label for="content">分享内容 *</label>
              <textarea 
                id="content" 
                v-model="form.content" 
                placeholder="分享您与蒂凡尼灯的美好瞬间..."
                maxlength="300"
                rows="4"
                required
              ></textarea>
              <div class="char-count">{{ form.content.length }}/300</div>
            </div>
            
            <div class="form-group">
              <label>图片上传（最多9张）</label>
              <div class="upload-area">
                <div class="image-preview-grid">
                  <div v-for="(image, index) in previewImages" :key="index" class="preview-item">
                    <img :src="image.url" :alt="`预览图片 ${index + 1}`" class="preview-image" />
                    <button type="button" @click="removeImage(index)" class="remove-btn">&times;</button>
                  </div>
                  
                  <div v-if="previewImages.length < 9" class="upload-btn-container">
                    <input 
                      ref="fileInput" 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      @change="handleFileSelect" 
                      class="file-input"
                    />
                    <button type="button" @click="$refs.fileInput.click()" class="upload-btn">
                      <span class="upload-icon">+</span>
                      <span>添加图片</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <button type="submit" :disabled="submitting || !form.content.trim()" class="submit-btn">
              {{ submitting ? '提交中...' : '提交分享' }}
            </button>
          </form>
        </div>
      </section>

      <!-- 成功提示 -->
      <div v-if="showSuccess" class="success-modal">
        <div class="modal-content">
          <div class="success-icon">✓</div>
          <h3>投稿成功！</h3>
          <p>感谢您的分享，审核通过后会在此页面展示</p>
          <button @click="showSuccess = false" class="close-btn">确定</button>
        </div>
      </div>

      <!-- 图片查看模态框 -->
      <div v-if="modalImage" class="image-modal" @click="closeImageModal">
        <div class="modal-backdrop">
          <img :src="modalImage" alt="查看大图" class="modal-image" />
          <button @click="closeImageModal" class="modal-close">&times;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'

// 页面元数据
useHead({
  title: 'Your Tiffany Moment - 蒂凡尼灯艺术',
  meta: [
    { name: 'description', content: '分享您与蒂凡尼灯的美好瞬间，记录生活中的艺术时刻' }
  ]
})

// 获取运行时配置
const config = useRuntimeConfig()

// 初始化 Supabase 客户端
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)

// 响应式数据
const moments = ref([])
const momentsLoading = ref(true)
const form = reactive({
  nickname: '',
  content: ''
})
const previewImages = ref([])
const submitting = ref(false)
const showSuccess = ref(false)
const modalImage = ref(null)

// 获取已审核的分享内容
const fetchMoments = async () => {
  try {
    momentsLoading.value = true
    const { data, error } = await supabase
      .from('tiffany_moments')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(20)
    
    if (error) throw error
    moments.value = data || []
  } catch (error) {
    console.error('获取分享内容失败:', error)
  } finally {
    momentsLoading.value = false
  }
}

// 处理文件选择
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  const remainingSlots = 9 - previewImages.value.length
  const filesToProcess = files.slice(0, remainingSlots)
  
  filesToProcess.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        previewImages.value.push({
          file,
          url: e.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  })
  
  // 清空input值，允许重复选择同一文件
  event.target.value = ''
}

// 移除图片
const removeImage = (index) => {
  previewImages.value.splice(index, 1)
}

// 上传图片到 Supabase Storage
const uploadImages = async () => {
  const uploadedUrls = []
  
  for (const imageData of previewImages.value) {
    try {
      const fileExt = imageData.file.name.split('.').pop()
      let fileName
      try {
        fileName = `${crypto.randomUUID()}.${fileExt}`
      } catch (error) {
        // 如果crypto.randomUUID()失败，使用16位随机数
        const randomId = Math.random().toString(36).substring(2, 18)
        fileName = `${randomId}.${fileExt}`
      }
      
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, imageData.file)
      
      if (error) throw error
      
      // 获取公共URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName)
      
      uploadedUrls.push(publicUrl)
    } catch (error) {
      console.error('图片上传失败:', error)
      throw new Error('图片上传失败，请重试')
    }
  }
  
  return uploadedUrls
}

// 提交分享
const submitMoment = async () => {
  if (!form.content.trim()) return
  
  try {
    submitting.value = true
    
    // 上传图片
    let imageUrls = []
    if (previewImages.value.length > 0) {
      imageUrls = await uploadImages()
    }
    
    // 保存到数据库
    const { error } = await supabase
      .from('tiffany_moments')
      .insert({
        nickname: form.nickname.trim() || null,
        content: form.content.trim(),
        images: imageUrls,
        approved: false
      })
    
    if (error) throw error
    
    // 重置表单
    form.nickname = ''
    form.content = ''
    previewImages.value = []
    
    // 显示成功提示
    showSuccess.value = true
    
  } catch (error) {
    console.error('提交失败:', error)
    alert('提交失败，请重试')
  } finally {
    submitting.value = false
  }
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  if (diff < 2592000000) return `${Math.floor(diff / 86400000)}天前`
  
  return date.toLocaleDateString('zh-CN')
}

// 打开图片模态框
const openImageModal = (imageUrl) => {
  modalImage.value = imageUrl
}

// 关闭图片模态框
const closeImageModal = () => {
  modalImage.value = null
}

// 页面加载时获取数据
onMounted(() => {
  fetchMoments()
})
</script>

<style scoped>
.tiffany-moment-page {
  padding: 2rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

/* 展示区域样式 */
.moments-display {
  margin-bottom: 4rem;
}

.no-moments {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}

.moments-grid {
  display: grid;
  gap: 2rem;
  width: 1160px;
  margin: 0 auto;
}

.moment-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.moment-header {
  margin-bottom: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
}

.user-details h4 {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.time {
  font-size: 0.85rem;
  color: #999;
}

.moment-content {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #444;
}

.moment-images {
  margin-top: 1rem;
}

.image-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-radius: 8px;
  overflow: hidden;
}

.image-item {
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 4px;
}

.moment-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;
}

.moment-image:hover {
  transform: scale(1.05);
}

/* 表单样式 */
.submit-form {
  background: #f8f9fa;
  padding: 2rem 0;
  border-radius: 12px;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
}

.form-container h3 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.moment-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.char-count {
  text-align: right;
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.25rem;
}

/* 图片上传样式 */
.upload-area {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.image-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
}

.preview-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
}

.upload-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-input {
  display: none;
}

.upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 2px dashed #ccc;
  border-radius: 6px;
  background: none;
  cursor: pointer;
  transition: all 0.2s;
  color: #666;
}

.upload-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.upload-icon {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.submit-btn {
  padding: 1rem 2rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #555;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 成功提示模态框 */
.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  margin: 1rem;
}

.success-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #4CAF50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1rem;
}

.close-btn {
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* 图片查看模态框 */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  cursor: pointer;
}

.modal-backdrop {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }
  
  .moments-grid {
    padding: 0 1rem;
  }
  
  .moment-card {
    padding: 1.5rem;
  }
  
  .form-container {
    padding: 0 1rem;
  }
  
  .image-preview-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
  
  .upload-btn {
    width: 80px;
    height: 80px;
  }
}
</style>