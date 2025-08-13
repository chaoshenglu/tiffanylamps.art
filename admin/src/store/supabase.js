import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'
const router = useRouter()

// 全局状态
export const supabaseClient = ref(null)
export const isConnected = ref(false)

// 初始化Supabase客户端
export function initializeSupabase(url, key) {
  try {
    supabaseClient.value = createClient(url, key)
    isConnected.value = true
    
    // 保存配置到localStorage
    localStorage.setItem('supabase_url', url)
    localStorage.setItem('supabase_key', key)

    // 连接成功后自动跳转到文章列表页面
    setTimeout(() => {
      router.push('/list')
    }, 1500)
    
    return { success: true }
  } catch (error) {
    console.error('Supabase连接错误:', error)
    return { success: false, error: error.message }
  }
}

// 从localStorage恢复配置
export function restoreSupabaseConfig() {
  const url = localStorage.getItem('supabase_url')
  const key = localStorage.getItem('supabase_key')
  
  if (url && key) {
    return initializeSupabase(url, key)
  }
  
  return { success: false }
}

// 清除配置
export function clearSupabaseConfig() {
  supabaseClient.value = null
  isConnected.value = false
  localStorage.removeItem('supabase_url')
  localStorage.removeItem('supabase_key')
}