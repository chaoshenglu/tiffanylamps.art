import { createClient } from '@supabase/supabase-js'

// @ts-ignore
export default defineNuxtPlugin(() => {
  // @ts-ignore
  const config = useRuntimeConfig()
  
  const supabase = createClient(
    config.public.supabaseUrl as string,
    config.public.supabaseKey as string
  )
  
  return {
    provide: {
      supabase
    }
  }
})