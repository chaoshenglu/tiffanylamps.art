import { createClient } from '@supabase/supabase-js'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  const url = config.public.supabaseUrl as string | undefined
  const key = config.public.supabaseKey as string | undefined

  // Avoid runtime "Invalid URL" by validating envs first
  if (!url || !/^https?:\/\//.test(url)) {
    console.error('[Supabase] Invalid or missing SUPABASE_URL. Please set SUPABASE_URL in your .env (e.g. https://xyzcompany.supabase.co) and restart the dev server.')
    return
  }
  if (!key || key.length < 20) {
    console.error('[Supabase] Missing SUPABASE_ANON_KEY. Please set SUPABASE_ANON_KEY in your .env and restart the dev server.')
    return
  }

  console.log('[Supabase] 初始化客户端，环境:', process.server ? '服务端' : '客户端')
  const supabase = createClient(url, key)
  
  // 提供给应用使用
  nuxtApp.provide('supabase', supabase)
  
  // 同时返回，以便在组合式函数中使用
  return {
    provide: {
      supabase
    }
  }
})