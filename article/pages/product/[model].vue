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
            <div v-for="(image, index) in product.main_images" :key="index" class="thumbnail"
              :class="{ active: currentImageIndex === index }" @click="currentImageIndex = index">
              <img :src="image" />
            </div>
          </div>
        </div>

        <!-- 右侧：商品信息 -->
        <div class="product-info">
          <h1 class="product-title">{{ productTitle }}</h1>
          <div class="product-params">
            <div class="param-list">
              <div class="param-item">
                <span class="param-label" style="padding-top:15px;">{{ t('product.price') }}:</span>
                <span class="price">{{ productPrice }}</span>
              </div>
              <div class="param-item">
                <span class="param-label">{{ t('product.style') }}:</span>
                <span class="param-value">{{ t('product.tiffanyStyle') }}</span>
              </div>
              <div class="param-item">
                <span class="param-label">{{ t('product.category') }}:</span>
                <span class="param-value">{{ productCategory }}</span>
              </div>
              <div class="param-item">
                <span class="param-label">{{ t('product.size') }}:</span>
                <span class="param-value">{{ productSize }}</span>
              </div>
              <div class="param-item">
                <span class="param-label">{{ t('product.material') }}:</span>
                <span class="param-value">{{ productMaterial }}</span>
              </div>
            </div>
          </div>

          <!-- 视频按钮和购买按钮 -->
          <div class="purchase-section">
            <div class="lxCenterRow">
              <button v-if="shouldShowVideoButton" class="btn video-btn" @click="goToVideo">
                <svg width="20" height="20" viewBox="0 0 1024 1024" fill="currentColor">
                  <path d="M213.333333 278.698667C213.333333 179.2 321.877333 117.76 407.168 168.96l388.821333 233.301333c82.858667 49.706667 82.858667 169.813333 0 219.477334L407.168 855.04C321.834667 906.24 213.333333 844.8 213.333333 745.301333V278.698667z"/>
                </svg>
                {{ t('product.videoShowcase') }}
              </button>
              <div v-if="shouldShowVideoButton" style="width: 30px;"></div>
              <button class="btn purchase-btn" @click="goToPurchase">
                <svg width="20" height="20" viewBox="0 0 1024 1024" fill="currentColor">
                  <path d="M704 316.992a38.72 38.72 0 0 0-38.4-39.168c-21.184 0-38.4 17.536-38.4 39.168v78.208c0 64.832-51.52 117.376-115.072 117.376s-115.072-52.48-115.072-117.376V316.992a38.784 38.784 0 0 0-38.4-39.168c-21.12 0-38.336 17.536-38.336 39.168v78.208c0 108.096 85.888 195.648 191.808 195.648 105.92 0 191.808-87.552 191.808-195.648V316.992z m172.16 521.216a73.536 73.536 0 0 1-56.96 25.792H204.8c-22.592 0-41.92-8.768-57.024-25.92a76.352 76.352 0 0 1-19.328-60.48l37.632-547.52A76.864 76.864 0 0 1 242.368 160h538.88c39.68 0 72.32 30.08 76.352 70.336l37.952 547.456c2.304 22.912-4.288 43.328-19.392 60.416z"/>
                </svg>
                {{ t('product.buySimilar') }}
              </button>
            </div>
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
  if (locale.value === 'zh-CN') {
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
  } else {
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

//  mt INTEGER CHECK (mt IN (1, 2, 3, 4, 5, 6)),--底座材质:1.树脂 2.铸铁 3.合金 4.全铜 5.木 6.无底座
const productMaterial = computed(() => {
  if (!product.value) return ''
  let material = ''
  if (locale.value === 'zh-CN') {
    switch (product.value.mt) {
      case 1:
        material = '树脂'
        break
      case 2:
        material = '铸铁'
        break
      case 3:
        material = '合金'
        break
      case 4:
        material = '全铜'
        break
      case 5:
        material = '木'
        break
      case 6:
        material = '无'
      default:
        material = ''
    }
    return `彩色玻璃灯罩，${material}底座`
  } else {
    let material = ''
    switch (product.value.mt) {
      case 1:
        material = 'Resin'
        break
      case 2:
        material = 'Cast Iron'
        break
      case 3:
        material = 'Alloy'
        break
      case 4:
        material = 'Copper'
        break
      case 5:
        material = 'Wood'
        break
      case 6:
        material = 'No'
        break
      default:
        material = ''
    }
    return `Stained Glass Shade, ${material} Base`
  }
})

/**
 *  length NUMERIC,--长cm
 *  width NUMERIC,--宽cm
 *  height NUMERIC,--高cm
 */

const productSize = computed(() => {
  if (!product.value) return ''
  return `${product.value.length}cm x ${product.value.width}cm x ${product.value.height}cm`
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

// 是否显示视频按钮
const shouldShowVideoButton = computed(() => {
  if (!product.value) return false
  if (locale.value === 'zh-CN') {
    return !!product.value.douyin_id
  } else {
    return !!product.value.tiktok_id
  }
})

// 方法
function goToPurchase() {
  if (locale.value === 'zh-CN') {
    window.open(`https://detail.tmall.com/item.htm?id=${product.value.tmall_id}`, '_blank')
  } else {
    window.open(`https://www.amazon.com/dp/${product.value.amazon_id}`, '_blank')
  }
}

function isOnlyDigits(str) {
  return /^\d+$/.test(str);
}

function goToVideo() {
  if (locale.value === 'zh-CN') {
    window.open(`https://v.douyin.com/${product.value.douyin_id}`, '_blank')
  } else {
    if (isOnlyDigits(product.value.tiktok_id)) {
      window.open(`https://www.tiktok.com/@hautylamps/video/${product.value.tiktok_id}`, '_blank')
    }else{
      window.open(`https://vt.tiktok.com/${product.value.tiktok_id}`, '_blank')
    }
  }
}

// 页面加载时获取产品数据
onMounted(() => {
  fetchProduct()
})

</script>