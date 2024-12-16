<script setup lang="ts">
import { defineOptions, ref } from 'vue'
import { useColorTheme } from '../composables/useColorTheme'

defineOptions({
  name: 'ColorThemeToggle'
})

const { themes, currentTheme, applyTheme } = useColorTheme()
const isOpen = ref(false)

const handleThemeChange = (theme: typeof themes[0]) => {
  applyTheme(theme)
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="p-2 rounded-lg transition-all duration-200 hover:scale-110 flex items-center gap-2"
      :style="{ backgroundColor: currentTheme.colors.primary }"
    >
      <i class="uil uil-palette text-white text-xl"></i>
    </button>
    
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 p-3 bg-[#112240] rounded-lg shadow-xl z-50 min-w-[160px]"
    >
      <div class="space-y-2">
        <button
          v-for="theme in themes"
          :key="theme.id"
          @click="handleThemeChange(theme)"
          class="w-full flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-[#1a2f50]"
          :class="{ 'bg-[#1a2f50]': currentTheme.id === theme.id }"
        >
          <div 
            class="w-6 h-6 rounded-full"
            :style="{ backgroundColor: theme.colors.primary }"
          />
          <span class="text-sm text-white">{{ theme.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  -webkit-tap-highlight-color: transparent;
}
</style> 