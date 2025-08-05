import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify()
  ],
  shortcuts: {
    // 自定义快捷类
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md'
  },
  theme: {
    colors: {
      // 自定义颜色
    }
  }
})