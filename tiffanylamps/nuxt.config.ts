// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    ['@nuxt/content', {
      database: { connector: 'native' },
      highlight: { theme: 'github-dark' }
    }],
    ['@nuxtjs/i18n', {
      strategy: 'prefix_except_default',
      defaultLocale: 'zh-cn',
      locales: [
        { 
          code: 'zh-cn', 
          name: '简体中文', 
          iso: 'zh-CN',
          messages: {
            "navigation": {
              "home": "首页",
              "trends": "流行趋势",
              "hot": "热卖榜单",
              "history": "历史文化",
              "auction": "拍卖会",
              "blog": "文章博客"
            },
            "common": {
              "readMore": "阅读更多",
              "backToList": "返回列表",
              "publish": "发布",
              "author": "作者",
              "publishDate": "发表日期",
              "category": "分类",
              "tags": "标签"
            },
            "hero": {
              "title": "蒂凡尼灯的艺术世界",
              "subtitle": "探索艺术与光的完美融合，领略百年不朽的经典魅力"
            },
            "footer": {
              "about": "关于我们",
              "aboutDesc": "我们致力于推广蒂凡尼灯的艺术与文化，提供精选作品、设计灵感与行业资讯。",
              "contact": "联系我们",
              "email": "邮箱：sale@tiffanylamps.art",
              "phone": "电话：+86 123 4567 8901"
            }
          }
        },
        { 
          code: 'en', 
          name: 'English', 
          iso: 'en-US',
          messages: {
            "navigation": {
              "home": "Home",
              "trends": "Trends",
              "hot": "Hot Sales",
              "history": "History",
              "auction": "Auctions",
              "blog": "Blog"
            },
            "common": {
              "readMore": "Read more",
              "backToList": "Back to list",
              "publish": "Publish",
              "author": "Author",
              "publishDate": "Published on",
              "category": "Category",
              "tags": "Tags"
            },
            "hero": {
              "title": "The Artistic World of Tiffany Lamps",
              "subtitle": "Explore the perfect fusion of art and light, and experience timeless classics"
            },
            "footer": {
              "about": "About Us",
              "aboutDesc": "We promote the art and culture of Tiffany lamps, offering curated pieces, design inspiration, and industry insights.",
              "contact": "Contact Us",
              "email": "Email: sale@tiffanylamps.art",
              "phone": "Phone: +86 123 4567 8901"
            }
          }
        }
      ],
      lazy: false,
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root'
      }
    }]
  ],
  css: []
})
