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
  /* Remove native arrow and add custom arrow for better spacing control */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /* White chevron to match the button text color */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='white' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  /* Keep some gap to the right of the arrow */
  background-position: right 0.8rem center;
  /* Ensure text doesn't overlap the arrow */
  padding-right: 2rem;
}

.language-select:hover {
  background-color: #089a96;
}

.language-select option {
  background: white;
  color: black;
}
</style>