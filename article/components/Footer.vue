<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <img src="/assets/logoWhite.svg" style="width: 180px;">
          <p style="margin-top: 16px;">{{ $t('home.subtitle') }}</p>
        </div>
        
        <div class="footer-section">
          <h4>{{ $t('nav.home') }}</h4>
          <ul class="footer-links">
            <li><NuxtLink :to="localePath('/cases')">{{ $t('nav.cases') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/trends')">{{ $t('nav.trends') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/hot')">{{ $t('nav.hot') }}</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>{{ $t('footer.about') }}</h4>
          <ul class="footer-links">
            <li><NuxtLink :to="localePath('/culture')">{{ $t('nav.culture') }}</NuxtLink></li>
            <!-- <li><NuxtLink :to="localePath('/auctions')">{{ $t('nav.auctions') }}</NuxtLink></li> -->
            <li><a href="#">{{ $t('footer.contact') }}</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>{{ $t('footer.contact') }}</h4>
          <div class="social-links">
            <!-- 中文社交媒体图标 -->
            <template v-if="locale === 'zh-CN'">
              <!-- 在新标签页打开 -->
              <a href="https://v.douyin.com/xZ_02CtYTHc/" class="social-link" target="_blank" rel="noopener noreferrer">
                <!-- 抖音图标偏小，用30x30 -->
                <img src="/assets/douyin.svg" width="30" height="30" alt="抖音" />
              </a>
              <div class="social-link wechat-container" @click="toggleWechatQR" @mouseenter="showWechatQR" @mouseleave="hideWechatQR">
                <img src="/assets/weixin.svg" width="20" height="20" alt="微信" />
                <div v-if="isWechatQRVisible" class="wechat-qr-popup">
                  <img src="/assets/weixin.webp" alt="微信公众号二维码" class="qr-code" />
                  <p class="qr-text">扫一扫关注微信公众号</p>
                </div>
              </div>
              <a href="https://weibo.com/hauty" class="social-link" target="_blank" rel="noopener noreferrer">
                <img src="/assets/weibo.svg" width="20" height="20" alt="微博" />
              </a>
            </template>
            <!-- 默认社交媒体图标 -->
            <template v-else>
              <a href="#" class="social-link">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M19.589 6.686a4.793 4.793 0 01-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 01-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 113.183-4.51v-3.5a6.329 6.329 0 109.238 5.728V6.686z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </template>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>{{ $t('footer.copyright') }}</p>
        <!-- <div class="footer-bottom-links">
          <a href="#">{{ $t('footer.privacy') }}</a>
        </div> -->
      </div>
    </div>
  </footer>
</template>

<script setup>
const localePath = useLocalePath()
const { t, locale } = useI18n()

// 微信二维码显示状态
const isWechatQRVisible = ref(false)
let hideTimeout = null

// 显示微信二维码
const showWechatQR = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  isWechatQRVisible.value = true
}

// 隐藏微信二维码（延迟隐藏，避免鼠标移动时闪烁）
const hideWechatQR = () => {
  hideTimeout = setTimeout(() => {
    isWechatQRVisible.value = false
  }, 200)
}

// 切换微信二维码显示状态（点击时）
const toggleWechatQR = () => {
  isWechatQRVisible.value = !isWechatQRVisible.value
}
</script>

<style scoped>
.footer {
  background: black;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.footer-section h4 {
  color: white;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-section p {
  line-height: 1.6;
  color: #ccc;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: black;
  color: white;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  text-decoration: none;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

/* 微信容器样式 */
.wechat-container {
  position: relative;
}

/* 微信二维码弹窗样式 */
.wechat-qr-popup {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  text-align: center;
  min-width: 160px;
  animation: fadeInUp 0.3s ease-out;
}

.wechat-qr-popup::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid white;
}

.qr-code {
  width: 120px;
  height: 120px;
  display: block;
  margin: 0 auto 10px;
  border-radius: 4px;
}

.qr-text {
  color: #333;
  font-size: 12px;
  margin: 0;
  line-height: 1.4;
}

/* 弹窗动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.footer-bottom {
  border-top: 1px solid #555;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-bottom p {
  margin: 0;
  color: #999;
  font-size: 0.9rem;
}

.footer-bottom-links a {
  color: #999;
  text-decoration: none;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
  
  /* 移动端微信二维码弹窗调整 */
  .wechat-qr-popup {
    bottom: 45px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 140px;
    padding: 12px;
  }
  
  .qr-code {
    width: 100px;
    height: 100px;
  }
  
  .qr-text {
    font-size: 11px;
  }
}
</style>