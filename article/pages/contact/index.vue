<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay">
        <div class="container">
          <h1 class="hero-title">{{ $t('contact.title') }}</h1>
          <p class="hero-subtitle">{{ $t('contact.subtitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <!-- Left Side - Contact Info -->
          <div class="contact-info">
            <h2>{{ $t('contact.sayHello') }}</h2>
            <p class="contact-description">
              {{ $t('contact.description') }}
            </p>

            <div class="contact-details">
              <h3>{{ $t('contact.address') }}</h3>
              <p>409 Broadway</p>
              <p>New York, NY 1233</p>

              <h3>{{ $t('contact.phoneEmail') }}</h3>
              <p>(96) 323-4560</p>
              <p>info@domain.com</p>
            </div>
          </div>

          <!-- Right Side - Contact Form -->
          <div class="contact-form">
            <h2>{{ $t('contact.formTitle') }}</h2>
            <form @submit.prevent="submitForm">
              <div class="form-row">
                <div class="form-group">
                  <input 
                    type="text" 
                    v-model="form.firstName" 
                    :placeholder="$t('contact.firstName')"
                    required
                  >
                </div>
                <div class="form-group">
                  <input 
                    type="text" 
                    v-model="form.lastName" 
                    :placeholder="$t('contact.lastName')"
                    required
                  >
                </div>
              </div>

              <div class="form-group">
                <select v-model="form.budget" required>
                  <option value="">{{ $t('contact.budget') }}</option>
                  <option value="under-1000">{{ $t('contact.budgetOptions.under1000') }}</option>
                  <option value="1000-5000">{{ $t('contact.budgetOptions.range1000to5000') }}</option>
                  <option value="5000-10000">{{ $t('contact.budgetOptions.range5000to10000') }}</option>
                  <option value="over-10000">{{ $t('contact.budgetOptions.over10000') }}</option>
                </select>
              </div>

              <div class="form-group">
                <input 
                  type="email" 
                  v-model="form.email" 
                  :placeholder="$t('contact.email')"
                  required
                >
              </div>

              <div class="form-group">
                <textarea 
                  v-model="form.message" 
                  :placeholder="$t('contact.message')"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" class="submit-btn">
                {{ $t('contact.submit') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 设置页面 meta
useHead({
  title: 'Contact Us - Tiffany Lamps Art',
  meta: [
    { name: 'description', content: 'Contact us for any questions about our Tiffany lamps and services.' }
  ]
})

// 表单数据
const form = ref({
  firstName: '',
  lastName: '',
  budget: '',
  email: '',
  message: ''
})

// 提交表单
const submitForm = () => {
  // 这里可以添加表单提交逻辑
  console.log('Form submitted:', form.value)
  alert('Thank you for your message! We will get back to you soon.')
  
  // 重置表单
  form.value = {
    firstName: '',
    lastName: '',
    budget: '',
    email: '',
    message: ''
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
}

.hero-section {
  height: 400px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><rect fill="%23228B22" width="1200" height="400"/><circle fill="%23FFD700" cx="200" cy="100" r="30" opacity="0.7"/><circle fill="%23FF6347" cx="800" cy="150" r="25" opacity="0.6"/><circle fill="%2332CD32" cx="1000" cy="80" r="35" opacity="0.5"/></svg>');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.hero-overlay {
  width: 100%;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.contact-content {
  padding: 4rem 0;
  background: #f8f9fa;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.contact-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
}

.contact-details h3 {
  font-size: 1.3rem;
  margin: 2rem 0 0.5rem 0;
  color: #333;
}

.contact-details p {
  margin: 0.25rem 0;
  color: #666;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
}

.form-group select {
  background: white;
  cursor: pointer;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background: #333;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.submit-btn:hover {
  background: #555;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .contact-form {
    padding: 1.5rem;
  }
}
</style>