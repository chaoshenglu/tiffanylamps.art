<template>
  <header class="bg-white sticky top-0 z-100 w-full">
    <div class="max-w-1200px mx-auto flex items-center justify-between h-100px px-20px md:px-15px sm:px-10px">
      <div class="flex items-center gap-8px text-24px font-bold text-violet-500 md:text-20px">
        <img class="h-40px" src="/assets/logo.webp" />
      </div>
      <nav class="flex gap-30px">
        <NuxtLink to="/" class="no-underline text-gray-700 font-medium transition-colors-300 hover:text-violet-500" :class="{ 'text-violet-500': $route.path === '/' }">Home</NuxtLink>
        <NuxtLink to="/products" class="no-underline text-gray-700 font-medium transition-colors-300 hover:text-violet-500" :class="{ 'text-violet-500': $route.path === '/products' }">Products</NuxtLink>
        <NuxtLink to="/categories" class="no-underline text-gray-700 font-medium transition-colors-300 hover:text-violet-500" :class="{ 'text-violet-500': $route.path === '/categories' }">Categories</NuxtLink>
        <NuxtLink to="/contact" class="no-underline text-gray-700 font-medium transition-colors-300 hover:text-violet-500" :class="{ 'text-violet-500': $route.path === '/contact' }">Contact</NuxtLink>
      </nav>
      <div class="flex items-center bg-gray-100 rounded-25px px-15px py-8px w-300px">
        <input type="text" placeholder="Search Products..." class="border-none bg-transparent outline-none flex-1 p-5px text-14px md:text-13px">
        <button class="border-none bg-transparent cursor-pointer text-16px p-0">🔍</button>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>