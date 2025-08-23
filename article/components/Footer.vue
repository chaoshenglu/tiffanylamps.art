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
            <a href="#" class="social-link">📧</a>
            <a href="#" class="social-link">📱</a>
            <a href="#" class="social-link">🌐</a>
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
}
</style>