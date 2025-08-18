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

  const supabase = createClient(url, key)
  nuxtApp.provide('supabase', supabase)
})