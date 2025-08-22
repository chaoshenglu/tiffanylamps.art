<template>
  <div class="edit-post-page">
    <el-card class="post-card">
      <template #header>
        <div class="card-header">
          <span>编辑文章</span>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" class="post-form" v-loading="loading">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" maxlength="100" show-word-limit />
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
                <el-option label="English" value="en-US" />
                <el-option label="日本語" value="ja-JP" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="文章内容" prop="content">
          <div class="editor-container">
            <Toolbar class="editor-toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" />
            <Editor class="editor-content" v-model="form.content" :defaultConfig="editorConfig"
              @onCreated="handleCreated" />
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="submitting" size="large">
            更新文章
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
import { ref, shallowRef, reactive, onBeforeUnmount, onMounted } from 'vue'
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
const loading = ref(false)

const form = reactive({
  title: '',
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
    }
  }
}

// 编辑器实例
const handleCreated = (editor) => {
  editorRef.value = editor
}

// 加载文章数据
const loadPost = async () => {
  const postId = route.params.id
  if (!postId) {
    ElMessage.error('文章ID不存在')
    router.push('/list')
    return
  }

  loading.value = true
  try {
    const { data, error } = await supabaseClient.value
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (error) {
      console.error('加载文章错误:', error)

      // 如果是认证错误，尝试重连
      if (error.code === 'PGRST301' || error.message.includes('JWT') || error.message.includes('authentication')) {
        const reconnected = await autoReconnect()
        if (reconnected) {
          ElMessage.warning('连接已重新建立，正在重新加载...')
          setTimeout(() => loadPost(), 1000)
          return
        }
      }

      ElMessage.error(`加载失败: ${error.message}`)
      router.push('/list')
      return
    }

    if (data) {
      form.title = data.title
      form.cover_image = data.cover_image
      form.type = data.type
      form.language = data.language
      form.content = data.content
    }
  } catch (error) {
    console.error('加载文章错误:', error)
    ElMessage.error('加载文章时发生错误')
    router.push('/list')
  } finally {
    loading.value = false
  }
}

// 检查连接状态并加载文章
onMounted(async () => {
  if (!isConnected.value) {
    const reconnected = await autoReconnect()
    if (!reconnected) {
      ElMessageBox.confirm(
        '数据库连接已断开，请重新配置连接',
        '连接失效',
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
  }
  loadPost()
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
        const postId = route.params.id
        const { data, error } = await supabaseClient.value
          .from('posts')
          .update({
            title: form.title,
            cover_image: form.cover_image,
            content: form.content,
            type: form.type,
            language: form.language
          })
          .eq('id', postId)

        if (error) {
          console.error('更新错误:', error)

          // 如果是认证错误，尝试重连
          if (error.code === 'PGRST301' || error.message.includes('JWT') || error.message.includes('authentication')) {
            const reconnected = await autoReconnect()
            if (reconnected) {
              ElMessage.warning('连接已重新建立，请重新提交')
              return
            }
          }

          ElMessage.error(`更新失败: ${error.message}`)
        } else {
          ElMessage.success('文章更新成功！')
          router.push('/list')
        }
      } catch (error) {
        console.error('更新错误:', error)
        ElMessage.error('更新时发生错误')
      } finally {
        submitting.value = false
      }
    }
  })
}

// 重置表单
const resetForm = () => {
  loadPost() // 重新加载原始数据
}

// 组件销毁时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style scoped>
.edit-post-page {
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

.editor-toolbar {
  border-bottom: 1px solid #ccc;
}

.editor-content {
  height: 600px !important;
  min-height: 600px !important;
}
</style>