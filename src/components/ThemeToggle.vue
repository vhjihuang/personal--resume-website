<script setup lang="ts">
import { defineOptions } from 'vue'
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'ThemeToggle'
})

const { theme, toggleTheme } = useTheme()
const isTransitioning = ref(false)
const { t } = useI18n({
  useScope: 'global'
})

const handleThemeToggle = () => {
  if (isTransitioning.value) return
  
  isTransitioning.value = true
  toggleTheme()
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 200)
}
</script>

<template>
  <button
    @click="handleThemeToggle"
    class="p-2 rounded-lg transition-all duration-200 transform"
    :class="[
      theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800',
      isTransitioning ? 'scale-90' : 'hover:scale-110'
    ]"
    :aria-label="t(theme === 'dark' ? 'theme.light' : 'theme.dark')"
    :disabled="isTransitioning"
  >
    <i :class="theme === 'dark' ? 'uil-sun' : 'uil-moon'" class="uil text-xl"></i>
  </button>
</template>

<style scoped>
button {
  -webkit-tap-highlight-color: transparent;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style> 