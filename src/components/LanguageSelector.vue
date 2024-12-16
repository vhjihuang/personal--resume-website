<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
]

const { locale } = useI18n()

const currentLanguage = computed(() => 
  languages.find(lang => lang.code === locale.value)
)

defineProps<{
  showMenu: boolean
}>()

const emit = defineEmits<{
  (e: 'changeLanguage', code: string): void
  (e: 'toggleMenu'): void
}>()
</script>

<template>
  <div class="relative language-selector">
    <button
      @click="emit('toggleMenu')"
      class="flex items-center gap-2 px-3 py-2 text-white hover:text-purple-400 transition-colors"
    >
      <span>{{ currentLanguage?.flag }}</span>
      <span>{{ currentLanguage?.name }}</span>
      <i class="uil uil-angle-down"></i>
    </button>

    <div
      v-if="showMenu"
      class="absolute right-0 mt-2 py-2 w-48 bg-[#112240] rounded-lg shadow-xl z-50"
    >
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="emit('changeLanguage', lang.code)"
        class="w-full px-4 py-2 text-left text-white hover:bg-[#1a2f50] transition-colors flex items-center gap-2"
      >
        <span>{{ lang.flag }}</span>
        <span>{{ lang.name }}</span>
      </button>
    </div>
  </div>
</template> 