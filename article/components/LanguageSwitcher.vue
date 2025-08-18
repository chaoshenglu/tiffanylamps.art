<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="switchLanguage" class="language-select">
      <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n()

const currentLocale = ref(locale.value)
const availableLocales = computed(() => locales.value)

const switchLanguage = async () => {
  await setLocale(currentLocale.value)
}

watch(locale, (newLocale) => {
  currentLocale.value = newLocale
})
</script>

<style scoped>
.language-switcher {
  position: relative;
}

.language-select {
  background: var(--tiffany-blue);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  outline: none;
  transition: background-color 0.3s ease;
}

.language-select:hover {
  background: #089a96;
}

.language-select option {
  background: white;
  color: var(--deep-brown);
}
</style>