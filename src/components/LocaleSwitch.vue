<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { SupportedLocales } from '@/i18n/types'
import { getLocaleName, getLocaleFlag, setLocale } from '@/i18n/utils/locale'

const { t, locale } = useI18n({
  useScope: 'global'
})
const showDropdown = ref(false)

const locales: SupportedLocales[] = ['en', 'zh', 'ja']

const currentLocale = computed(() => ({
  code: locale.value,
  name: getLocaleName(locale.value as SupportedLocales),
  flag: getLocaleFlag(locale.value as SupportedLocales)
}))

function changeLocale(newLocale: SupportedLocales) {
  locale.value = newLocale
  setLocale(newLocale)
  showDropdown.value = false
}

// 点击外部关闭下拉菜单
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.locale-switch')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="locale-switch relative">
    <button
      @click="showDropdown = !showDropdown"
      class="flex items-center gap-2 px-3 py-2 text-white hover:text-purple-400 transition-all duration-300 hover:scale-105 active:scale-95"
      :aria-label="t('accessibility.languageButton')"
    >
      <span class="text-xl">{{ currentLocale.flag }}</span>
      <span class="hidden sm:inline">{{ currentLocale.name }}</span>
      <i class="uil uil-angle-down transition-transform duration-300" :class="{ 'rotate-180': showDropdown }"></i>
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="showDropdown"
        class="absolute right-0 mt-2 py-2 w-48 bg-[#112240] rounded-lg shadow-xl z-50 border border-gray-700"
      >
        <button
          v-for="code in locales"
          :key="code"
          @click="changeLocale(code)"
          class="w-full px-4 py-2 text-left text-white hover:bg-[#1a2f50] transition-all duration-300 flex items-center gap-2 hover:pl-6"
          :class="{ 'text-purple-400': code === locale }"
        >
          <span class="text-xl">{{ getLocaleFlag(code) }}</span>
          <span>{{ getLocaleName(code) }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template> 