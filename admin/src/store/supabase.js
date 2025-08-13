import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

// 全局状态
export const supabaseClient = ref(null)
export const isConnected = ref(false)

// 初始化Supabase客户端
export function initializeSupabase(url, key, router = null) {
  try {
    supabaseClient.value = createClient(url, key)
    isConnected.value = true
    
    // 保存配置到localStorage
    localStorage.setItem('supabase_url', url)
    localStorage.setItem('supabase_key', key)

    // 连接成功后自动跳转到文章列表页面
    if (router) {
      setTimeout(() => {
        router.push('/list')
      }, 500)
    }
    
    return { success: true }
  } catch (error) {
    console.error('Supabase连接错误:', error)
    return { success: false, error: error.message }
  }
}

// 从localStorage恢复配置
export async function restoreSupabaseConfig(router = null) {
  const url = localStorage.getItem('supabase_url')
  const key = localStorage.getItem('supabase_key')
  
  if (url && key) {
    try {
      supabaseClient.value = createClient(url, key)
      
      // 验证连接是否有效
      const { data, error } = await supabaseClient.value.from('posts').select('count', { count: 'exact', head: true })
      
      if (error) {
        console.error('Supabase连接验证失败:', error)
        // 如果连接无效，清除配置
        clearSupabaseConfig()
        return { success: false, error: error.message }
      }
      
      // 连接有效，更新状态
      isConnected.value = true
      return { success: true }
    } catch (error) {
      console.error('恢复Supabase配置错误:', error)
      clearSupabaseConfig()
      return { success: false, error: error.message }
    }
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

// 检查连接健康状态
export async function checkConnectionHealth() {
  if (!supabaseClient.value || !isConnected.value) {
    return false
  }
  
  try {
    const { error } = await supabaseClient.value.from('posts').select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('连接健康检查失败:', error)
      isConnected.value = false
      return false
    }
    
    return true
  } catch (error) {
    console.error('连接健康检查错误:', error)
    isConnected.value = false
    return false
  }
}

// 自动重连机制
export async function autoReconnect() {
  if (isConnected.value) {
    return true
  }
  
  const url = localStorage.getItem('supabase_url')
  const key = localStorage.getItem('supabase_key')
  
  if (url && key) {
    const result = await restoreSupabaseConfig()
    return result.success
  }
  
  return false
}