<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="logo">
            <span class="logo-icon">🔮</span>
            <span class="logo-text">WooNust</span>
          </div>
          <p class="footer-description">
            专业的蒂芙尼灯具制造商，为您提供高品质的手工艺术灯具。
          </p>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">产品分类</h3>
          <ul class="footer-links">
            <li><NuxtLink to="/categories/night-light">小夜灯</NuxtLink></li>
            <li><NuxtLink to="/categories/table-lamp">台灯</NuxtLink></li>
            <li><NuxtLink to="/categories/wall-lamp">壁灯</NuxtLink></li>
            <li><NuxtLink to="/categories/chandelier">吊灯</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">客户服务</h3>
          <ul class="footer-links">
            <li><NuxtLink to="/contact">联系我们</NuxtLink></li>
            <li><NuxtLink to="/service">售后服务</NuxtLink></li>
            <li><NuxtLink to="/shipping">配送信息</NuxtLink></li>
            <li><NuxtLink to="/returns">退换政策</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-title">关注我们</h3>
          <div class="social-links">
            <a href="#" class="social-link">📘</a>
            <a href="#" class="social-link">📷</a>
            <a href="#" class="social-link">🐦</a>
            <a href="#" class="social-link">📺</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">
          Copyright © 2025 Saedio. All rights reserved.
        </p>
        <p class="powered-by">
          Made by WooTemplates · GitHub
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: #2d3748;
  color: white;
  width: 100%;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 20px 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section .logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: bold;
  color: #8B5CF6;
  margin-bottom: 15px;
}

.logo-icon {
  font-size: 28px;
}

.footer-description {
  color: #a0aec0;
  line-height: 1.6;
  margin: 0;
}

.footer-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 20px 0;
  color: white;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #8B5CF6;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: #4a5568;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  text-decoration: none;
  transition: background 0.3s, transform 0.3s;
}

.social-link:hover {
  background: #8B5CF6;
  transform: translateY(-2px);
}

.footer-bottom {
  border-top: 1px solid #4a5568;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.copyright,
.powered-by {
  color: #a0aec0;
  margin: 0;
  font-size: 14px;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0 20px;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-section .logo {
    justify-content: center;
    font-size: 22px;
  }
  
  .logo-icon {
    font-size: 26px;
  }
  
  .footer-description {
    text-align: center;
  }
  
  .footer-title {
    text-align: center;
    font-size: 16px;
  }
  
  .footer-links {
    text-align: center;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 10px;
  }
  
  .footer-content {
    gap: 25px;
  }
  
  .footer-section .logo {
    font-size: 20px;
  }
  
  .logo-icon {
    font-size: 24px;
  }
  
  .footer-title {
    font-size: 15px;
    margin-bottom: 15px;
  }
  
  .footer-links li {
    margin-bottom: 8px;
  }
  
  .footer-links a {
    font-size: 14px;
  }
  
  .social-link {
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
  }
  
  .copyright,
  .powered-by {
    font-size: 13px;
  }
}
</style>