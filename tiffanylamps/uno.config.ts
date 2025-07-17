import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify()
  ],
  shortcuts: {
    // 自定义快捷类
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-primary': 'btn text-white bg-blue-500 hover:bg-blue-700',
    'btn-secondary': 'btn text-gray-700 bg-gray-200 hover:bg-gray-300',
  },
  theme: {
    colors: {
      // 自定义颜色
    }
  }
})