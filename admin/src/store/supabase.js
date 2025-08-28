import { ref } from 'vue'
import { createClient } from '@supabase/supabase-js'

// 全局状态
export const supabaseClient = ref(null)
export const isConnected = ref(false)

// 从环境变量获取配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 初始化Supabase客户端
export function initializeSupabase() {
  try {
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase配置缺失，请检查环境变量 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY')
      return { success: false, error: 'Supabase配置缺失' }
    }

    supabaseClient.value = createClient(supabaseUrl, supabaseKey)
    isConnected.value = true
    
    return { success: true }
  } catch (error) {
    console.error('Supabase连接错误:', error)
    return { success: false, error: error.message }
  }
}

// 验证连接是否有效
export async function validateConnection() {
  if (!supabaseClient.value || !isConnected.value) {
    return false
  }

  try {
    const { error } = await supabaseClient.value.from('posts').select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('Supabase连接验证失败:', error)
      isConnected.value = false
      return false
    }
    
    return true
  } catch (error) {
    console.error('连接验证错误:', error)
    isConnected.value = false
    return false
  }
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
  
  const result = initializeSupabase()
  if (result.success) {
    return await validateConnection()
  }
  
  return false
}