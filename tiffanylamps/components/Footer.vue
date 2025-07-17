<template>
  <footer class="bg-gray-700 text-white w-full">
    <div class="max-w-screen-xl mx-auto px-5 py-15 pb-5">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 text-2xl font-bold text-purple-400 mb-4 md:justify-start justify-center">
            <span class="text-3xl md:text-3xl sm:text-2xl">🔮</span>
            <span>WooNust</span>
          </div>
          <p class="text-gray-400 leading-relaxed m-0 text-center md:text-left">
            专业的蒂芙尼灯具制造商，为您提供高品质的手工艺术灯具。
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-5 text-white text-center md:text-left">
            产品分类
          </h3>
          <ul class="list-none p-0 m-0 text-center md:text-left">
            <li class="mb-2.5">
              <NuxtLink to="/categories/night-light" class="text-gray-400 no-underline transition-colors duration-300 hover:text-purple-400">
                小夜灯
              </NuxtLink>
            </li>
            <li class="mb-2.5">
              <NuxtLink to="/categories/table-lamp" class="text-gray-400 no-underline transition-colors duration-300 hover:text-purple-400">
                台灯
              </NuxtLink>
            </li>
            <li class="mb-2.5">
              <NuxtLink to="/categories/wall-lamp" class="text-gray-400 no-underline transition-colors duration-300 hover:text-purple-400">
                壁灯
              </NuxtLink>
            </li>
            <li class="mb-2.5">
              <NuxtLink to="/categories/chandelier" class="text-gray-400 no-underline transition-colors duration-300 hover:text-purple-400">
                吊灯
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-5 text-white text-center md:text-left">
            客户服务
          </h3>
          <ul class="list-none p-0 m-0 text-center md:text-left">
            <li class="mb-2.5">
              <NuxtLink to="/contact" class="text-gray-400 no-underline transition-colors duration-300 hover:text-purple-400">
                联系我们
              </NuxtLink>
            </li>
            <li class="mb-2.5">
              <NuxtLink to="/service" class="text-gray-400 no-underline transition-colors duration-300 hover:text-purple-400">
                售后服务
              </NuxtLink>
            </li>
            <li class="mb-2.5">
              <NuxtLink to="/shipping" class="text-gray-400 no-underline transition-colors duration-300 hover:text-purple-400">
                配送信息
              </NuxtLink>
            </li>
            <li class="mb-2.5">
              <NuxtLink to="/returns" class="text-gray-400 no-underline transition-colors duration-300 hover:text-purple-400">
                退换政策
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-5 text-white text-center md:text-left">
            关注我们
          </h3>
          <div class="flex gap-4 justify-center md:justify-start">
            <a href="#" class="inline-block w-10 h-10 bg-gray-600 rounded-full text-center leading-10 text-lg no-underline transition-all duration-300 hover:bg-purple-400 hover:-translate-y-0.5">
              📘
            </a>
            <a href="#" class="inline-block w-10 h-10 bg-gray-600 rounded-full text-center leading-10 text-lg no-underline transition-all duration-300 hover:bg-purple-400 hover:-translate-y-0.5">
              📷
            </a>
            <a href="#" class="inline-block w-10 h-10 bg-gray-600 rounded-full text-center leading-10 text-lg no-underline transition-all duration-300 hover:bg-purple-400 hover:-translate-y-0.5">
              🐦
            </a>
            <a href="#" class="inline-block w-10 h-10 bg-gray-600 rounded-full text-center leading-10 text-lg no-underline transition-all duration-300 hover:bg-purple-400 hover:-translate-y-0.5">
              📺
            </a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-600 pt-5 flex flex-col md:flex-row justify-between items-center flex-wrap gap-2.5 text-center md:text-left">
        <p class="text-gray-400 m-0 text-sm">
          Copyright © 2025 Saedio. All rights reserved.
        </p>
        <p class="text-gray-400 m-0 text-sm">
          Made by WooTemplates · GitHub
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>