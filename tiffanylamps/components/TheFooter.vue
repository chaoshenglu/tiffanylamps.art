<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-col">
        <h3>关于我们</h3>
        <p>我们致力于推广蒂凡尼灯的艺术与文化，提供精选作品、设计灵感与行业资讯。</p>
      </div>
      <div class="footer-col">
        <h3>快速链接</h3>
        <a href="#home">首页</a>
        <a href="#trends">流行趋势</a>
        <a href="#history">历史文化</a>
        <a href="#hot">热卖榜单</a>
        <a href="#auction">拍卖会</a>
      </div>
      <div class="footer-col">
        <h3>联系我们</h3>
        <p>邮箱：info@tiffanylamps.art</p>
        <p>电话：+86 123 4567 8901</p>
        <div class="social-links">
          <a href="#" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24h11.495v-9.294H9.691V11.08h3.129V8.414c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.315h3.59l-.467 3.626h-3.123V24h6.116C23.406 24 24 23.405 24 22.676V1.325C24 .595 23.406 0 22.675 0z"/></svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.866 9.866 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.942 13.942 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.562 4.897 4.897 0 0 1-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.933 4.933 0 0 1-2.224.084 4.918 4.918 0 0 0 4.59 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.514 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.325.975.975 1.263 2.242 1.325 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.325 3.608-.975.975-2.242 1.263-3.608 1.325-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.325-.975-.975-1.263-2.242-1.325-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.325-3.608.975-.975 2.242-1.263 3.608-1.325C8.416 2.175 8.796 2.163 12 2.163zm0 1.837c-3.17 0-3.552.012-4.805.07-1.042.048-1.608.223-1.983.372-.499.193-.855.425-1.23.8-.375.375-.607.731-.8 1.23-.149.375-.324.941-.372 1.983-.058 1.253-.07 1.635-.07 4.805s.012 3.552.07 4.805c.048 1.042.223 1.608.372 1.983.193.499.425.855.8 1.23.375.375.731.607 1.23.8.375.149.941.324 1.983.372 1.253.058 1.635.07 4.805.07s3.552-.012 4.805-.07c1.042-.048 1.608-.223 1.983-.372.499-.193.855-.425 1.23-.8.375-.375.607-.731.8-1.23.149-.375.324-.941.372-1.983.058-1.253.07-1.635.07-4.805s-.012-3.552-.07-4.805c-.048-1.042-.223-1.608-.372-1.983-.193-.499-.425-.855-.8-1.23-.375-.375-.731-.607-1.23-.8-.375-.149-.941-.324-1.983-.372-1.253-.058-1.635-.07-4.805-.07zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.164a4.002 4.002 0 1 1 0-8.004 4.002 4.002 0 0 1 0 8.004zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div class="copyright">
      &copy; {{ new Date().getFullYear() }} tiffanylamps.art 保留所有权利
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.site-footer {
  background-color: var(--primary-color);
  color: white;
  padding: 50px 0 20px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-col h3 {
  font-family: var(--header-font);
  font-size: 1.5rem;
  margin-bottom: 20px;
  position: relative;
}

.footer-col h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 50px;
  height: 2px;
  background-color: var(--accent-color);
}

.footer-col p, .footer-col a {
  color: #ddd;
  margin-bottom: 10px;
  display: block;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-col a:hover {
  color: white;
  padding-left: 5px;
}

.social-links {
  display: flex;
  margin-top: 20px;
}

.social-links a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  transition: background-color 0.3s;
  color: white;
}

.social-links a:hover {
  background-color: var(--secondary-color);
}

.copyright {
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>