<template>
  <header class="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-90 backdrop-blur-sm transition-all duration-300">
    <div class="flex items-center justify-between px-6 py-4">
      <!-- Logo -->
      <div class="logo-container">
        <a href="/" class="text-white text-2xl font-bold tracking-wider">
          蒂凡尼灯艺术
        </a>
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <a href="/" class="text-white hover:text-blue-400 transition-colors font-medium">首页</a>
        <a href="/albums" class="text-white hover:text-blue-400 transition-colors font-medium">作品集</a>
        <a href="/about" class="text-white hover:text-blue-400 transition-colors font-medium">关于我们</a>
        <a href="/contact" class="text-white hover:text-blue-400 transition-colors font-medium">联系方式</a>
        <div class="relative group">
          <button class="text-white hover:text-blue-400 transition-colors font-medium flex items-center">
            更多 <i class="fa fa-angle-down ml-1"></i>
          </button>
          <div class="absolute top-full left-0 mt-2 w-48 bg-black bg-opacity-95 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <a href="#" class="block px-4 py-3 text-white hover:text-blue-400 hover:bg-gray-800 transition-colors">子菜单 1</a>
            <a href="#" class="block px-4 py-3 text-white hover:text-blue-400 hover:bg-gray-800 transition-colors">子菜单 2</a>
            <a href="#" class="block px-4 py-3 text-white hover:text-blue-400 hover:bg-gray-800 transition-colors">子菜单 3</a>
          </div>
        </div>
      </nav>

      <!-- Header Tools -->
      <div class="flex items-center space-x-4">
        <button @click="$emit('toggle-side-menu')" class="text-white hover:text-blue-400 transition-colors text-xl">
          <i class="fa fa-bars"></i>
        </button>
        <button @click="$emit('toggle-mobile-menu')" class="md:hidden text-white hover:text-blue-400 transition-colors text-xl">
          <i class="fa fa-menu"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
// 定义组件的事件
defineEmits(['toggle-side-menu', 'toggle-mobile-menu'])
</script>

<style scoped>
/* 组件特定的样式可以在这里添加 */
</style>