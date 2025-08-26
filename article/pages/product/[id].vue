<template>
  <div class="product-page">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>

    <!-- 产品详情 -->
    <div v-else-if="product" class="container">
      <!-- 上半部分：图片和商品信息 -->
      <div class="product-main">
        <!-- 左侧：图片轮播 -->
        <div class="product-images">
          <div class="main-image">
            <img :src="currentImage" :alt="productTitle" />
          </div>
          <div class="thumbnail-list">
            <div 
              v-for="(image, index) in product.images" 
              :key="index"
              class="thumbnail"
              :class="{ active: currentImageIndex === index }"
              @click="currentImageIndex = index"
            >
              <img :src="image" :alt="`${productTitle} ${index + 1}`" />
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
            <h3>{{ t('product.specifications') }}</h3>
            <div class="param-list">
              <div class="param-item">
                <span class="param-label">{{ t('product.material') }}:</span>
                <span class="param-value">{{ t('product.stainedGlass') }}</span>
              </div>
              <div class="param-item">
                <span class="param-label">{{ t('product.style') }}:</span>
                <span class="param-value">{{ t('product.tiffanyStyle') }}</span>
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
const productId = computed(() => route.params.id)
const product = ref(null)
const loading = ref(true)
const currentImageIndex = ref(0)

// 获取商品详情
async function fetchProduct() {
  try {
    const { data, error: supabaseError } = await supabase
      .from('product')
      .select('*')
      .eq('id', productId.value)
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
  return locale.value === 'zh-CN' ? product.value['title_zh'] : product.value['title_en']
})

const productPrice = computed(() => {
  if (!product.value) return ''
  const price = locale.value === 'zh-CN' ? product.value['price_zh'] : product.value['price_en']
  const currency = locale.value === 'zh-CN' ? '¥' : '$'
  return `${currency}${price}`
})

const productHtml = computed(() => {
  if (!product.value) return ''
  return locale.value === 'zh-CN' ? product.value['html_zh'] : product.value['html_en']
})

const currentImage = computed(() => {
  if (!product.value?.images || product.value.images.length === 0) return ''
  return product.value.images[currentImageIndex.value]
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