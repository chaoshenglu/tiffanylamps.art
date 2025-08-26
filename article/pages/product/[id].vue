<template>
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
const productId = computed(() => route.params.id)
const product = ref(null)
const loading = ref(true)

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
    
    // 设置页面元数据
    useHead({
      title: data.title,
      meta: [
        { name: 'description', content: data.content.substring(0, 160) }
      ]
    })

  } catch (err) {
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

</script>