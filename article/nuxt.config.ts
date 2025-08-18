// https://nuxt.com/docs/api/configuration/nuxt-config
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // 明确指定源码目录为项目根目录
  srcDir: '.',
  
  // 启用 SSR 模式
  ssr: true,
  
  // 启用组件自动导入
  components: true,
  
  // 配置模块
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  
  // 插件配置
  plugins: [
    '~/plugins/supabase.client.ts'
  ],
  
  // i18n 配置
  i18n: {
    locales: [
      {
        code: 'zh-CN',
        name: '中文',
        file: 'zh-CN.json'
      },
      {
        code: 'en',
        name: 'English', 
        file: 'en.json'
      }
    ],
    defaultLocale: 'zh-CN',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  
  // CSS 配置
  css: [
    '~/assets/css/main.css'
  ],
  
  // Vite 配置
  vite: {
    plugins: [
      tsconfigPaths()
    ]
  },
  
  // SEO 配置将通过模块默认配置处理

  // 运行时配置
  runtimeConfig: {
    // 私有配置（仅服务端可用）
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
    // 公共配置（客户端也可用）
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY
    }
  },
  
  // 全局应用配置
  app: {
    head: {
      title: '蒂凡尼灯的艺术世界 - Tiffany Lamps Art',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '探索蒂凡尼灯的艺术世界，了解历史文化、流行趋势、装修案例和拍卖资讯' },
        { name: 'keywords', content: '蒂凡尼灯,Tiffany灯,艺术灯具,彩色玻璃,装修案例,拍卖,收藏' },
        { name: 'author', content: 'Tiffany Lamps Art' },
        { property: 'og:title', content: '蒂凡尼灯的艺术世界 - Tiffany Lamps Art' },
        { property: 'og:description', content: '探索蒂凡尼灯的艺术世界，了解历史文化、流行趋势、装修案例和拍卖资讯' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://tiffanylamps.art' },
        { property: 'og:image', content: 'https://tiffanylamps.art/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '蒂凡尼灯的艺术世界 - Tiffany Lamps Art' },
        { name: 'twitter:description', content: '探索蒂凡尼灯的艺术世界，了解历史文化、流行趋势、装修案例和拍卖资讯' },
        { name: 'twitter:image', content: 'https://tiffanylamps.art/og-image.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://tiffanylamps.art' }
      ]
    }
  }
})
