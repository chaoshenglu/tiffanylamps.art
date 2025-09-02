<template>
  <div class="create-post-page">
    <el-card class="post-card">
      <template #header>
        <div class="card-header">
          <span>{{ isEditMode ? '编辑文章' : '发布新文章' }}</span>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" class="post-form" v-loading="loading">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" maxlength="100" show-word-limit />
        </el-form-item>
        <el-form-item label="群组ID" prop="post_group_id">
          <el-input v-model="form.post_group_id" placeholder="请输入文章的群组ID" maxlength="100" show-word-limit />
        </el-form-item>
        <el-form-item label="文章封面" prop="cover_image">
          <el-input v-model="form.cover_image" placeholder="请输入封面链接" maxlength="100" show-word-limit />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文章分类" prop="type">
              <el-select v-model="form.type" placeholder="请选择分类" style="width: 100%">
                <el-option label="历史文化" value="culture" />
                <el-option label="流行趋势" value="trend" />
                <el-option label="热卖榜单" value="hot" />
                <el-option label="拍卖会资料" value="auction" />
                <el-option label="装修案例" value="case" />
                <el-option label="其他" value="other" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="语言" prop="language">
              <el-select v-model="form.language" placeholder="请选择语言" style="width: 100%">
                <el-option label="简体中文" value="zh-CN" />
                <el-option label="繁體中文" value="zh-TW" />
                <el-option label="English" value="en" />
                <el-option label="日本語" value="ja" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="文章内容" prop="content">
          <div class="editor-container">
            <!-- 编辑器工具栏和HTML源码切换按钮 -->
            <div class="editor-header">
              <Toolbar class="editor-toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" v-show="!isHtmlMode" />
              <div class="html-mode-toolbar" v-show="isHtmlMode">
                <span class="html-mode-title">HTML</span>
              </div>
              <div class="mode-switch">
                <el-button 
                  :type="isHtmlMode ? 'primary' : 'default'" 
                  size="small" 
                  @click="toggleHtmlMode"
                >
                  {{ isHtmlMode ? '富文本' : 'HTML' }}
                </el-button>
              </div>
            </div>
            
            <!-- 富文本编辑器 -->
            <Editor 
              class="editor-content" 
              v-model="form.content" 
              :defaultConfig="editorConfig"
              @onCreated="handleCreated" 
              v-show="!isHtmlMode"
            />
            
            <!-- HTML源码编辑器 -->
            <el-input
              v-show="isHtmlMode"
              v-model="htmlContent"
              type="textarea"
              :rows="25"
              class="html-editor"
              placeholder="请输入HTML源码..."
              @blur="updateContentFromHtml"
            />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="submitting" size="large">
            {{ isEditMode ? '更新文章' : '发布文章' }}
          </el-button>
          <el-button v-if="isEditMode" type="primary" @click="submitForm2" :loading="submitting" size="large">
            二次发布
          </el-button>
          <el-button @click="resetForm" size="large">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref,shallowRef, reactive, onBeforeUnmount, onMounted, computed, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { supabaseClient, isConnected, autoReconnect } from '../store/supabase.js'
import { useRouter, useRoute } from 'vue-router'

// 引入编辑器样式
import '@wangeditor/editor/dist/css/style.css'

const router = useRouter()
const route = useRoute()
const formRef = ref()
const editorRef = shallowRef()
const submitting = ref(false)
const isHtmlMode = ref(false)
const htmlContent = ref('')
const loading = ref(false)

// 编辑模式判断
const isEditMode = computed(() => !!route.params.id)
const postId = computed(() => route.params.id)

const form = reactive({
  title: '',
  post_group_id: '',
  cover_image: '',
  type: '',
  language: 'zh-CN',
  content: ''
})

const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 1, max: 100, message: '标题长度在 1 到 100 个字符', trigger: 'blur' }
  ],
  cover_image: [
    { required: true, message: '请输入封面链接', trigger: 'blur' },
    { min: 1, max: 100, message: '链接长度在 1 到 100 个字符', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择文章分类', trigger: 'change' }
  ],
  language: [
    { required: true, message: '请选择语言', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
}

// 编辑器配置
const toolbarConfig = {
  toolbarKeys: [
    'headerSelect',
    'bold',
    'italic',
    'underline',
    'through',
    '|',
    'color',
    'bgColor',
    'fontSize',
    '|',
    'bulletedList',
    'numberedList',
    'todo',
    '|',
    'insertLink',
    'insertImage',
    'insertTable',
    'codeBlock',
    '|',
    'undo',
    'redo'
  ]
}

const editorConfig = {
  placeholder: '请输入文章内容...',
  height: 600,
  MENU_CONF: {
    fontSize: {
      fontSizeList: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px']
    },
    fontFamily: {
      fontFamilyList: [
        '黑体',
        '仿宋',
        '楷体',
        '标楷体',
        '华文仿宋',
        '华文楷体',
        'Arial',
        'Tahoma',
        'Verdana'
      ]
    },
  }
}

// 编辑器实例
const handleCreated = (editor) => {
  editorRef.value = editor
  
  // 如果是编辑模式且已有内容，延迟设置编辑器内容
  if (isEditMode.value && form.content) {
    setTimeout(() => {
      try {
        editor.setHtml(form.content)
      } catch (error) {
        console.warn('设置编辑器内容失败:', error)
      }
    }, 100)
  }
}

// 切换HTML模式
const toggleHtmlMode = () => {
  if (!editorRef.value) return
  
  if (isHtmlMode.value) {
    // 从HTML模式切换到富文本模式
    isHtmlMode.value = false
    // 将HTML内容设置到编辑器中
    if (htmlContent.value.trim()) {
      editorRef.value.setHtml(htmlContent.value)
      form.content = htmlContent.value
    }
  } else {
    // 从富文本模式切换到HTML模式
    isHtmlMode.value = true
    // 获取编辑器的HTML内容
    htmlContent.value = editorRef.value.getHtml()
  }
}

// 从HTML源码更新内容
const updateContentFromHtml = () => {
  if (!editorRef.value || !isHtmlMode.value) return
  
  try {
    // 更新表单内容
    form.content = htmlContent.value
    // 同步到编辑器（但不显示，因为在HTML模式下）
    if (htmlContent.value.trim()) {
      editorRef.value.setHtml(htmlContent.value)
    }
  } catch (error) {
    console.warn('HTML内容格式可能有误:', error)
    ElMessage.warning('HTML格式可能有误，请检查语法')
  }
}

// 加载文章数据（编辑模式）
const loadPost = async () => {
  if (!isEditMode.value) return
  
  loading.value = true
  
  try {
    const { data, error } = await supabaseClient.value
      .from('posts')
      .select('*')
      .eq('id', postId.value)
      .single()
    
    if (error) {
      console.error('加载文章错误:', error)
      ElMessage.error(`加载文章失败: ${error.message}`)
      router.push('/posts')
      return
    }
    
    if (data) {
      // 填充表单数据
      form.title = data.title || ''
      form.post_group_id = data.post_group_id || ''
      form.cover_image = data.cover_image || ''
      form.type = data.type || ''
      form.language = data.language || 'zh-CN'
      form.content = data.content || ''
      
      // 设置HTML内容
      htmlContent.value = data.content || ''
      
      // 延迟设置编辑器内容，避免Slate DOM错误
      if (data.content) {
        await nextTick()
        setTimeout(() => {
          if (editorRef.value) {
            try {
              editorRef.value.setHtml(data.content)
            } catch (error) {
              console.warn('设置编辑器内容失败:', error)
              // 如果设置失败，尝试清空后重新设置
              setTimeout(() => {
                if (editorRef.value) {
                  try {
                    editorRef.value.clear()
                    editorRef.value.setHtml(data.content)
                  } catch (retryError) {
                    console.warn('重试设置编辑器内容失败:', retryError)
                  }
                }
              }, 200)
            }
          }
        }, 200)
      }
    }
  } catch (error) {
    console.error('加载文章错误:', error)
    ElMessage.error('加载文章时发生错误')
    router.push('/posts')
  } finally {
    loading.value = false
  }
}

// 检查连接状态和加载数据
onMounted(async () => {
  if (!isConnected.value) {
    const reconnected = await autoReconnect()
    if (!reconnected) {
      ElMessage.error('数据库连接失败，请检查环境配置')
      return
    }
  }
  
  // 如果是编辑模式，加载文章数据
  if (isEditMode.value) {
    await loadPost()
  }
})

// 提交表单
const submitForm = async () => {
  if (!isConnected.value) {
    const reconnected = await autoReconnect()
    if (!reconnected) {
      ElMessage.error('数据库连接已断开，请重新配置连接')
      return
    }
  }

  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true

      try {
        const postData = {
          title: form.title,
          post_group_id: form.post_group_id,
          cover_image: form.cover_image,
          content: form.content,
          type: form.type,
          language: form.language
        }

        let result
        if (isEditMode.value) {
          // 更新文章
          result = await supabaseClient.value
            .from('posts')
            .update(postData)
            .eq('id', postId.value)
        } else {
          // 创建新文章
          result = await supabaseClient.value
            .from('posts')
            .insert([postData])
        }

        const { data, error } = result

        if (error) {
          console.error(isEditMode.value ? '更新错误:' : '发布错误:', error)

          // 如果是认证错误，尝试重连
          if (error.code === 'PGRST301' || error.message.includes('JWT') || error.message.includes('authentication')) {
            const reconnected = await autoReconnect()
            if (reconnected) {
              ElMessage.warning('连接已重新建立，请重新提交')
              return
            }
          }

          ElMessage.error(`${isEditMode.value ? '更新' : '发布'}失败: ${error.message}`)
        } else {
          if (isEditMode.value) {
            ElMessage.success('文章更新成功')
            router.push('/posts')
          } else {
            ElMessageBox.confirm(
              '你可以点击翻译，然后用其他语言再次发布此文章',
              '文章发布成功',
              {
                confirmButtonText: '继续发布',
                cancelButtonText: '返回列表',
                type: 'success'
              }
            ).then(() => {
              // 用户选择继续发布，重置表单
              resetForm()
            }).catch(() => {
              // 用户选择返回列表
              router.push('/posts')
            })
          }
        }
      } catch (error) {
        console.error(isEditMode.value ? '更新错误:' : '发布错误:', error)
        ElMessage.error(`${isEditMode.value ? '更新' : '发布'}时发生错误`)
      } finally {
        submitting.value = false
      }
    }
  })
}

// 二次提交表单（在编辑模式下，方便发布第二种语言的文章）
const submitForm2 = async () => {
  if (!isConnected.value) {
    const reconnected = await autoReconnect()
    if (!reconnected) {
      ElMessage.error('数据库连接已断开，请重新配置连接')
      return
    }
  }

  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true

      try {
        const postData = {
          title: form.title,
          post_group_id: form.post_group_id,
          cover_image: form.cover_image,
          content: form.content,
          type: form.type,
          language: form.language
        }

        // 创建新文章(通常是翻译后的文章)
        let result = await supabaseClient.value
            .from('posts')
            .insert([postData])

        const { data, error } = result

        if (error) {
          console.error('发布错误:', error)

          // 如果是认证错误，尝试重连
          if (error.code === 'PGRST301' || error.message.includes('JWT') || error.message.includes('authentication')) {
            const reconnected = await autoReconnect()
            if (reconnected) {
              ElMessage.warning('连接已重新建立，请重新提交')
              return
            }
          }

          ElMessage.error(`发布失败: ${error.message}`)
        } else {
          ElMessageBox.confirm(
              '你可以点击翻译，然后用其他语言再次发布此文章',
              '文章发布成功',
              {
                confirmButtonText: '我知道了',
                type: 'success'
              }
            )
        }
      } catch (error) {
        console.error('发布错误:', error)
        ElMessage.error(`发布时发生错误`)
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
  form.content = ''
  htmlContent.value = ''
  isHtmlMode.value = false
  if (editorRef.value) {
    editorRef.value.clear()
  }
}

// 组件销毁时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style scoped>
.create-post-page {
  max-width: 1086px;
  margin: 0 auto;
}

.post-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding-right: 20px;
}

.card-header {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.post-form {
  margin-top: 20px;
}

.editor-container {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  width: 1000px;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ccc;
  padding: 8px 12px;
}

.editor-toolbar {
  flex: 1;
  border: none;
  background: transparent;
}

.html-mode-toolbar {
  flex: 1;
  display: flex;
  align-items: center;
}

.html-mode-title {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

.mode-switch {
  margin-left: 16px;
}

.editor-content {
  height: 600px !important;
  min-height: 600px !important;
}

.html-editor {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
}

.html-editor :deep(.el-textarea__inner) {
  height: 600px !important;
  min-height: 600px !important;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
  border: none;
  border-radius: 0;
  resize: none;
}
</style>