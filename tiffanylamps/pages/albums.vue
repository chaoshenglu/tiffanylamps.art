<template>
  <div class="albums-page">
    <!-- 页面背景 -->
    <div class="page-background"></div>
    
    <!-- 主要内容区域 -->
    <div class="layout-full">
      <article class="content-area">
        <div class="content-limiter">
          <div class="content-box">
            <!-- 分类过滤器 -->
            <ul class="category-filter">
              <li :class="{ selected: selectedFilter === 'all' }" @click="filterAlbums('all')">
                <a href="#" @click.prevent>全部</a>
              </li>
              <li :class="{ selected: selectedFilter === 'gallery' }" @click="filterAlbums('gallery')">
                <a href="#" @click.prevent>画廊</a>
              </li>
              <li :class="{ selected: selectedFilter === 'model' }" @click="filterAlbums('model')">
                <a href="#" @click.prevent>模特</a>
              </li>
              <li :class="{ selected: selectedFilter === 'slideshow' }" @click="filterAlbums('slideshow')">
                <a href="#" @click.prevent>幻灯片</a>
              </li>
              <li :class="{ selected: selectedFilter === 'studio' }" @click="filterAlbums('studio')">
                <a href="#" @click.prevent>工作室</a>
              </li>
            </ul>
            
            <!-- 作品集网格 -->
            <div class="albums-grid">
              <div class="albums-container">
                <!-- 作品项目 -->
                <div 
                  v-for="album in filteredAlbums" 
                  :key="album.id"
                  class="album-item"
                >
                  <img 
                    :src="album.image" 
                    :alt="album.title" 
                    :title="album.title" 
                  />
                  <div class="cover"></div>
                   <div class="icon">+</div>
                   <div class="caption">
                     <div class="texts-group">
                       <h2 class="post-title">{{ album.title }}</h2>
                       <div class="excerpt">{{ album.excerpt }}</div>
                     </div>
                   </div>
                   <a :href="album.link" class="album-link"></a>
                 </div>
               </div>
             </div>
             
             <div class="result-count">
               {{ filteredAlbums.length }}/{{ albums.length }}
             </div>
           </div>
         </div>
       </article>
     </div>
    
    <!-- 页脚 -->
    <footer id="footer" class="full centered footer-separator">
      <div class="foot-widgets four-col light-sidebar">
        <div class="foot-content clearfix">
          <div class="widget widget_media_image">
            <img 
              width="249" 
              height="57" 
              src="/assets/logo-footer.png" 
              class="image attachment-full size-full" 
              alt="蒂凡尼灯艺术" 
              style="max-width: 100%; height: auto;"
            />
          </div>
          <div class="widget widget_text">
            <div class="textwidget">
              <p><strong>管理:</strong> +86 138 0013 8000, +86 400 123 4567</p>
            </div>
          </div>
          <div class="widget widget_text">
            <div class="textwidget">
              <p><strong>工作室:</strong> 北京市朝阳区艺术区创意园</p>
            </div>
          </div>
          <div class="widget widget_text">
            <div class="textwidget">
              <div style="margin-top: 10px;">
                <div class="socials icons-only white color_hover">
                  <a target="_blank" title="微博" href="#" class="fa fa-weibo" rel="noopener"></a>
                  <a target="_blank" title="微信" href="#" class="fa fa-wechat" rel="noopener"></a>
                  <a target="_blank" title="抖音" href="#" class="fa fa-video" rel="noopener"></a>
                  <a target="_blank" title="小红书" href="#" class="fa fa-book" rel="noopener"></a>
                  <a target="_blank" title="Instagram" href="#" class="fa fa-instagram" rel="noopener"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot-items">
        <div class="foot-content clearfix">
          <div class="foot-text">
            蒂凡尼灯艺术 ❤ 传承经典，创造美好
          </div>
        </div>
      </div>
    </footer>
    
    <!-- 返回顶部按钮 -->
    <a href="#top" id="to-top" class="to-top fa fa-angle-up"></a>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 页面标题
useHead({
  title: '作品集 - 蒂凡尼灯艺术'
})

// 响应式数据
const selectedFilter = ref('all')

// 作品集数据
const albums = ref([
  {
    id: 1,
    title: '经典蒂凡尼台灯',
    excerpt: '传统工艺制作',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=667&h=375&fit=crop',
    category: ['gallery', 'studio'],
    link: '#'
  },
  {
    id: 2,
    title: '现代简约系列',
    excerpt: '时尚设计理念',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=667&h=375&fit=crop',
    category: ['slideshow', 'studio'],
    link: '#'
  },
  {
    id: 3,
    title: '花卉主题灯饰',
    excerpt: '自然美学展现',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=667&h=375&fit=crop',
    category: ['gallery', 'model'],
    link: '#'
  },
  {
    id: 4,
    title: '几何图案系列',
    excerpt: '现代艺术风格',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=667&h=375&fit=crop',
    category: ['slideshow', 'studio'],
    link: '#'
  },
  {
    id: 5,
    title: '动物主题作品',
    excerpt: '生动形象设计',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=667&h=375&fit=crop',
    category: ['gallery', 'model'],
    link: '#'
  },
  {
    id: 6,
    title: '抽象艺术灯具',
    excerpt: '创意无限表达',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=667&h=375&fit=crop',
    category: ['gallery', 'studio'],
    link: '#'
  },
  {
    id: 7,
    title: '复古风格系列',
    excerpt: '怀旧经典重现',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=667&h=375&fit=crop',
    category: ['model', 'slideshow'],
    link: '#'
  },
  {
    id: 8,
    title: '定制专属作品',
    excerpt: '个性化设计',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=667&h=375&fit=crop',
    category: ['gallery', 'studio'],
    link: '#'
  },
  {
    id: 9,
    title: '节日主题灯饰',
    excerpt: '节庆氛围营造',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=667&h=375&fit=crop',
    category: ['slideshow', 'model'],
    link: '#'
  }
])

// 过滤后的作品集
const filteredAlbums = computed(() => {
  if (selectedFilter.value === 'all') {
    return albums.value
  }
  return albums.value.filter(album => 
    album.category.includes(selectedFilter.value)
  )
})

// 过滤方法
const filterAlbums = (filter) => {
  selectedFilter.value = filter
}
</script>

<style scoped>
/* 页面基础样式 */
.albums-page {
  min-height: 100vh;
  background: #000;
  color: #fff;
  font-family: 'Hind', sans-serif;
  padding-top: 85px; /* 为固定头部留出空间 */
}

.page-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #000 100%);
  z-index: -1;
}

/* 主要内容区域 */
.layout-full {
  width: 100%;
  margin: 0 auto;
}

.content-area {
  width: 100%;
}

.content-limiter {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.content-box {
  padding: 40px 0;
}

/* 分类过滤器样式 */
.category-filter {
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.category-filter li {
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-filter li a {
  color: #999;
  text-decoration: none;
  padding: 10px 20px;
  border: 1px solid #333;
  border-radius: 25px;
  transition: all 0.3s ease;
  display: block;
  font-weight: 500;
}

.category-filter li:hover a,
.category-filter li.selected a {
  color: #fff;
  border-color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

/* 作品集网格样式 */
.albums-grid {
  margin-bottom: 40px;
}

.albums-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.album-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #111;
}

.album-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.album-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: all 0.3s ease;
}

.album-item:hover img {
  transform: scale(1.05);
}

.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: all 0.3s ease;
}

.album-item:hover .cover {
  opacity: 1;
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  opacity: 0;
  transition: all 0.3s ease;
}

.album-item:hover .icon {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.1);
}

.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  transform: translateY(100%);
  transition: all 0.3s ease;
}

.album-item:hover .caption {
  transform: translateY(0);
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #fff;
}

.excerpt {
  font-size: 14px;
  color: #ccc;
  margin: 0;
}

.album-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

/* 结果计数 */
.result-count {
  display: block;
  text-align: center;
  color: #999;
  font-size: 14px;
  margin-top: 20px;
}

/* 页脚样式 */
#footer {
  background: #111;
  border-top: 1px solid #333;
  margin-top: 60px;
}

.foot-widgets {
  padding: 40px 0;
}

.foot-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  align-items: start;
}

.widget {
  color: #ccc;
}

.widget img {
  max-width: 100%;
  height: auto;
}

.widget p {
  margin: 0;
  line-height: 1.6;
}

.socials {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.socials a {
  color: #999;
  font-size: 18px;
  transition: color 0.3s ease;
}

.socials a:hover {
  color: #fff;
}

.foot-items {
  background: #000;
  padding: 20px 0;
  border-top: 1px solid #333;
}

.foot-text {
  text-align: center;
  color: #666;
  font-size: 14px;
}

/* 返回顶部按钮 */
#to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 1000;
}

#to-top:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #fff;
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-limiter {
    padding: 0 15px;
  }
  
  .albums-container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }
  
  .category-filter {
    gap: 10px;
  }
  
  .category-filter li a {
    padding: 8px 15px;
    font-size: 14px;
  }
  
  .foot-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .albums-grid-container {
    grid-template-columns: 1fr;
  }
  
  .category-filter {
    flex-direction: column;
    align-items: center;
  }
}

/* 清除浮动 */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

.clear {
  clear: both;
}
</style>