<template>
  <div class="article-detail">
    <div class="container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-else class="article-content">
        <div class="article-header">
          <h1>{{ article.title }}</h1>
          <div class="article-meta">
            <span class="article-author">{{ $t('article.author') }}: {{ author }}</span>
            <span class="article-date">{{ $t('article.publishTime') }}: {{ formatDate(article.created_at) }}</span>
          </div>
        </div>

        <div class="article-body" v-html="formattedContent"></div>

        <div class="article-navigation">
          <NuxtLink v-if="prevArticle" :to="localePath(`/article/${prevArticle.id}`)" class="article-nav-link prev">
            &larr; {{ $t('article.prevArticle') }}: {{ prevArticle.title }}
          </NuxtLink>

          <NuxtLink v-if="nextArticle" :to="localePath(`/article/${nextArticle.id}`)" class="article-nav-link next">
            {{ $t('article.nextArticle') }}: {{ nextArticle.title }} &rarr;
          </NuxtLink>
        </div>

        <div class="article-back">
          <NuxtLink :to="getBackLink()" class="btn">
            {{ $t('article.backToList') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
const config = useRuntimeConfig()

// 创建 Supabase 客户端（服务端和客户端通用）
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const articleId = computed(() => route.params.id)
const article = ref(null)
const prevArticle = ref(null)
const nextArticle = ref(null)
const loading = ref(true)
const error = ref(null)
const post_group_id = ref('')

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale.value).format(date)
}

// 格式化文章内容（将\n转换为<br>，并处理图片说明文字样式）
const formattedContent = computed(() => {
  if (!article.value || !article.value.content) return ''
  
  // 先将换行符转换为<br>
  let content = article.value.content.replace(/\n/g, '<br>')
  
  // 预处理HTML：为图片后的14px文字添加特殊样式
  content = preprocessImageCaptions(content)
  
  return content
})

// 预处理图片说明文字
const preprocessImageCaptions = (html) => {
  // 创建一个临时DOM元素来解析HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  
  // 查找所有img标签
  const images = tempDiv.querySelectorAll('img')
  
  images.forEach(img => {
    // 如果文章有商品链接，为图片添加点击跳转功能
    if (article.value && article.value.product_link) {
      // 创建包装链接元素
      const linkWrapper = document.createElement('div')
      linkWrapper.className = 'image-link-wrapper'
      linkWrapper.setAttribute('data-product-link', article.value.product_link)
      
      // 创建遮罩元素
      const overlay = document.createElement('div')
      overlay.className = 'image-overlay'
      
      // 创建文字元素
      const overlayText = document.createElement('span')
      overlayText.className = 'overlay-text'
      overlayText.textContent = locale.value === 'en' ? 'Shop This Look' : '购买同款'
      
      overlay.appendChild(overlayText)
      
      // 将img从原位置移除并添加到wrapper中
      const imgParent = img.parentElement
      const imgClone = img.cloneNode(true)
      
      linkWrapper.appendChild(imgClone)
      linkWrapper.appendChild(overlay)
      
      // 替换原来的img
      imgParent.replaceChild(linkWrapper, img)
      
      // 更新img引用为克隆的元素
      img = imgClone
    }
    
    // 获取img的父元素（可能是p标签或wrapper）
    let imgParent = img.parentElement
    if (imgParent.classList.contains('image-link-wrapper')) {
      imgParent = imgParent.parentElement
    }
    if (!imgParent) return
    
    // 查找紧跟在img父元素后面的下一个兄弟元素
    let nextElement = imgParent.nextElementSibling
    
    // 检查下一个元素是否包含14px的文字
    if (nextElement && isImageCaption(nextElement)) {
      // 为图片父元素添加特殊class
      imgParent.classList.add('image-with-caption')
      // 为说明文字元素添加特殊class
      nextElement.classList.add('image-caption')
    }
  })
  
  return tempDiv.innerHTML
}

// 检查元素是否为图片说明文字（字体大小为14px）
const isImageCaption = (element) => {
  // 检查元素本身或其子元素是否有14px的字体大小
  const checkFontSize = (el) => {
    if (el.style && el.style.fontSize === '14px') {
      return true
    }
    
    // 检查内联样式中是否包含font-size: 14px
    if (el.getAttribute && el.getAttribute('style')) {
      const style = el.getAttribute('style')
      if (style.includes('font-size: 14px') || style.includes('font-size:14px')) {
        return true
      }
    }
    
    // 递归检查子元素
    for (let child of el.children || []) {
      if (checkFontSize(child)) {
        return true
      }
    }
    
    return false
  }
  
  return checkFontSize(element)
}

const author = computed(() => {
  if (locale.value == 'en') {
    return 'HT'
  } else {
    return 'Hauty'
  }
})

// 获取返回链接
const getBackLink = () => {
  if (!article.value) return '/'

  switch (article.value.type) {
    case 'culture':
      return '/culture'
    case 'trend':
      return '/trends'
    case 'hot':
      return '/hot'
    case 'case':
      return '/cases'
    default:
      return '/'
  }
}

// 获取文章详情
async function fetchArticle() {
  try {
    // 检查localStorage中是否存在该文章的语言信息
    const storedLanguage = localStorage.getItem(`article_${articleId.value}_language`)
    if (storedLanguage && storedLanguage !== locale.value) {
      return // 如果存储的语言与当前语言不匹配，停止执行
    }

    const { data, error: supabaseError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', articleId.value)
      .single()

    if (supabaseError) throw supabaseError

    if (!data) {
      throw new Error('文章不存在')
    }

    article.value = data
    post_group_id.value = data.post_group_id
    
    // 将文章id和language存储到localStorage
    localStorage.setItem(`article_${data.id}_language`, data.language)
    // 设置页面元数据
    useHead({
      title: data.title,
      meta: [
        { name: 'description', content: data.content.substring(0, 160) }
      ]
    })

    // 获取上一篇和下一篇文章
    await Promise.all([
      fetchPrevArticle(data.id, data.type),
      fetchNextArticle(data.id, data.type)
    ])

  } catch (err) {
    console.error('Error fetching article:', err)
    error.value = t('获取文章详情失败')
  } finally {
    loading.value = false
    // 在数据加载完成后绑定点击事件
    nextTick(() => {
      bindImageClickEvents()
    })
  }
}

// 根据语言获取文章详情
async function fetchArticleByLanguage() {
  if (!post_group_id.value) {
    // 如果没有post_group_id，先获取初始文章
    await fetchArticle()
    return
  }

  try {
    const { data, error: supabaseError } = await supabase
      .from('posts')
      .select('*')
      .eq('post_group_id', post_group_id.value)
      .eq('language', locale.value)
      .single()

    if (supabaseError) throw supabaseError

    if (!data) {
      throw new Error('该语言版本的文章不存在')
    }

    navigateTo(localePath(`/article/${data.id}`))

  } catch (err) {
    console.error('Error fetching article by language:', err)
    error.value = t('获取文章详情失败')
  } finally {
    loading.value = false
    // 在数据加载完成后绑定点击事件
    nextTick(() => {
      bindImageClickEvents()
    })
  }
}

// 绑定图片点击事件
function bindImageClickEvents() {
  const imageWrappers = document.querySelectorAll('.image-link-wrapper')
  imageWrappers.forEach(wrapper => {
    // 移除之前的事件监听器（如果存在）
    wrapper.removeEventListener('click', handleImageClick)
    // 添加新的事件监听器
    wrapper.addEventListener('click', handleImageClick)
  })
}

// 处理图片点击事件
function handleImageClick(event) {
  const wrapper = event.currentTarget
  const productLink = wrapper.getAttribute('data-product-link')
  if (productLink) {
    window.open(productLink, '_blank')
  }
}

// 获取上一篇文章
async function fetchPrevArticle(currentId, type) {
  try {
    const { data } = await supabase
      .from('posts')
      .select('id, title')
      .eq('type', type)
      .lt('id', currentId)
      .order('id', { ascending: false })
      .limit(1)
      .single()

    prevArticle.value = data
  } catch (err) {
    console.error('Error fetching previous article:', err)
    // 没有上一篇文章，不显示错误
    prevArticle.value = null
  }
}

// 获取下一篇文章
async function fetchNextArticle(currentId, type) {
  try {
    const { data } = await supabase
      .from('posts')
      .select('id, title')
      .eq('type', type)
      .gt('id', currentId)
      .order('id', { ascending: true })
      .limit(1)
      .single()

    nextArticle.value = data
  } catch (err) {
    console.error('Error fetching next article:', err)
    // 没有下一篇文章，不显示错误
    nextArticle.value = null
  }
}

// 监听路由变化，重新获取文章
watch(() => route.params.id, () => {
  loading.value = true
  post_group_id.value = '' // 重置post_group_id
  fetchArticle()
})

// 监听语言变化，重新获取对应语言的文章
watch(() => locale.value, () => {
  if (post_group_id.value) {
    loading.value = true
    fetchArticleByLanguage()
  }
})

// 页面加载时获取文章
onMounted(() => {
  fetchArticle()
})
</script>

<style scoped>
.article-detail {
  padding: 2rem 0;
}

.article-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.article-header h1 {
  font-size: 2.5rem;
  color: black;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  color: #777;
  font-size: 0.9rem;
}

.article-body {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
}

.article-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

/* 图片链接包装器样式 */
.article-body :deep(.image-link-wrapper) {
  position: relative;
  display: inline-block;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
}

/* 图片遮罩样式 */
.article-body :deep(.image-overlay) {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  /* transition: opacity 0.3s ease; */
  border-radius: 8px;
}

/* 遮罩文字样式 */
.article-body :deep(.overlay-text) {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  padding: 0.5rem 1rem;
  border: 2px solid white;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
}

/* 悬停效果 */
.article-body :deep(.image-link-wrapper:hover .image-overlay) {
  opacity: 1;
}

/* 图片在wrapper中的样式 */
.article-body :deep(.image-link-wrapper img) {
  display: block;
  transition: transform 0.3s ease;
}

.article-body :deep(.image-link-wrapper:hover img) {
  transform: scale(1.02);
}

/* 图片与说明文字的特殊样式 */
.article-body :deep(.image-with-caption) {
  margin-bottom: 0.1rem; /* 减少图片段落的下边距 */
}

.article-body :deep(.image-caption) {
  margin-top: 0.1rem; /* 减少说明文字段落的上边距 */
  margin-bottom: 1.5rem; /* 保持与下一段落的正常间距 */
}

.article-body :deep(h2) {
  margin: 2rem 0 1rem;
  color: black;
}

.article-body :deep(h3) {
  margin: 1.5rem 0 1rem;
  color: black;
}

.article-body :deep(p) {
  margin-bottom: 1.5rem;
}

.article-navigation {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.article-nav-link {
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-back {
  margin-top: 2rem;
  text-align: center;
}

.error-message {
  padding: 2rem;
  background-color: #fff5f5;
  color: #e53e3e;
  border-radius: 8px;
  text-align: center;
  margin: 2rem 0;
}

@media (max-width: 768px) {
  .article-header h1 {
    font-size: 2rem;
  }

  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .article-navigation {
    flex-direction: column;
    gap: 1rem;
  }

  .article-nav-link {
    max-width: 100%;
  }
}
</style>