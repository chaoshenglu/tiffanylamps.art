<template>
  <div class="product-page">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>

    <!-- 产品详情 -->
    <div v-else-if="product" class="product-container">
      <!-- 上半部分：图片和商品信息 -->
      <div class="product-main">
        <!-- 左侧：图片轮播 -->
        <div class="product-images">
          <div class="main-image">
            <img :src="currentImage" />
          </div>
          <div class="thumbnail-list">
            <div 
              v-for="(image, index) in product.main_images" 
              :key="index"
              class="thumbnail"
              :class="{ active: currentImageIndex === index }"
              @click="currentImageIndex = index"
            >
              <img :src="image" />
            </div>
          </div>
        </div>

        <!-- 右侧：商品信息 -->
        <div class="product-info">
          <h1 class="product-title">{{ productTitle }}</h1>
          
          <div class="product-price">
            <span class="price">{{ productPrice }}</span>
          </div>

          <div class="product-params">
            <div class="param-list">
              <div class="param-item">
                <span class="param-label">{{ t('product.style') }}:</span>
                <span class="param-value">{{ t('product.tiffanyStyle') }}</span>
              </div>
              <div class="param-item">
                <span class="param-label">{{ t('product.category') }}:</span>
                <span class="param-value">{{ productCategory }}</span>
              </div>
              <div class="param-item">
                <span class="param-label">{{ t('product.category') }}:</span>
                <span class="param-value">{{ t('product.decorativeLamp') }}</span>
              </div>
              <div class="param-item">
                <span class="param-label">{{ t('product.category') }}:</span>
                <span class="param-value">{{ t('product.decorativeLamp') }}</span>
              </div>
            </div>
          </div>

          <!-- 购买按钮 -->
          <div class="purchase-section">
            <button class="btn purchase-btn" @click="goToPurchase">
              {{ t('product.buySimilar') }}
            </button>
            <p class="purchase-note">{{ t('product.purchaseNote') }}</p>
          </div>
        </div>
      </div>

      <!-- 下半部分：图文详情 -->
      <div class="product-details">
        <h2>{{ t('product.details') }}</h2>
        <div class="details-content" v-html="productHtml"></div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else class="error-state">
      <h2>{{ t('product.notFound') }}</h2>
      <p>{{ t('product.notFoundDesc') }}</p>
    </div>
  </div>
</template>

<script setup>
import { createClient } from '@supabase/supabase-js'
const config = useRuntimeConfig()
const { t, locale } = useI18n()
// 创建 Supabase 客户端
const supabase = createClient(
  config.public.supabaseUrl,
  config.public.supabaseKey
)
const route = useRoute()
const model = computed(() => route.params.model)
const product = ref(null)
const loading = ref(true)
const currentImageIndex = ref(0)

// 获取商品详情
async function fetchProduct() {
  try {
    const { data, error: supabaseError } = await supabase
      .from('lamp')
      .select('*')
      .eq('model', model.value)
      .single()
    if (supabaseError) throw supabaseError
    if (!data) {
      throw new Error('商品不存在')
    }
    product.value = data    
    useHead({
      title: productTitle.value,
    })
  } catch (err) {
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

// 计算属性
const productTitle = computed(() => {
  if (!product.value) return ''
  return locale.value === 'zh-CN' ? product.value.name_zh : product.value.name_en
})

// (type IN (1, 2, 3, 4, 5, 6)),--分类:1.台灯 2.落地灯 3.吊灯 4.壁灯 5.小夜灯 6.其它
const productCategory = computed(() => {
  if (!product.value) return ''
  if (locale.value === 'zh-CN'){
    switch (product.value.type) {
      case 1:
        return '台灯'
      case 2:
        return '落地灯'
      case 3:
        return '吊灯'
      case 4:
        return '壁灯'
      case 5:
        return '小夜灯'
      case 6:
        return '其它'
      default:
        return ''
    }
  }else{
    switch (product.value.type) {
      case 1:
        return 'Table Lamp'
      case 2:
        return 'Floor Lamp'
      case 3:
        return 'Chandelier'
      case 4:
        return 'Wall Lamp'
      case 5:
        return 'Night Lamp'
      case 6:
        return 'Other'
      default:
        return ''
    }
  }
})

const productPrice = computed(() => {
  if (!product.value) return ''
  const price = locale.value === 'zh-CN' ? product.value.price_zh : product.value.price_en
  const currency = locale.value === 'zh-CN' ? '¥' : '$'
  return `${currency}${price}`
})

const productHtml = computed(() => {
  if (!product.value) return ''
  const imageUrls = []
  product.value.detail_images.forEach(element => {
    imageUrls.push(element)
  });
  // 生成img标签
  const imgTags = imageUrls.map(url => `  <img src="${url}">`).join('\n')
  // 生成完整的HTML代码
  return `<div style="display: flex;flex-direction: column;border-radius: 8px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);overflow: hidden;">\n${imgTags}\n</div>`
})

const currentImage = computed(() => {
  if (!product.value?.main_images || product.value.main_images.length === 0) return ''
  return product.value.main_images[currentImageIndex.value]
})

// 方法
function goToPurchase() {
  // 跳转到购买链接，这里可以根据实际需求修改
  window.open('https://www.amazon.com', '_blank')
}

// 页面加载时获取产品数据
onMounted(() => {
  fetchProduct()
})

</script>