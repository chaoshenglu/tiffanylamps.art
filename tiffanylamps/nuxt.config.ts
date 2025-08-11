// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    ['@nuxt/content', {
      highlight: { theme: 'github-dark' }
    }],
    ['@nuxtjs/i18n', {
      strategy: 'prefix_except_default',
      defaultLocale: 'zh-cn',
      locales: [
        { code: 'zh-cn', name: '简体中文', file: 'zh-cn.json', iso: 'zh-CN' },
        { code: 'zh-tw', name: '繁體中文', file: 'zh-tw.json', iso: 'zh-TW' },
        { code: 'en', name: 'English', file: 'en.json', iso: 'en-US' },
        { code: 'ja', name: '日本語', file: 'ja.json', iso: 'ja-JP' }
      ],
      lazy: true,
      langDir: 'lang/',
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root'
      }
    }]
  ],
  css: []
})
