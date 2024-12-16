<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TheNavigation from '@/components/TheNavigation.vue'
import LocaleSwitch from '@/components/LocaleSwitch.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import { useScrollToTop } from '@/composables/useScrollToTop'

const { showScrollTop, scrollProgress } = useScrollToTop()
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-background">
    <header 
      class="fixed w-full top-0 left-0 z-50 border-b border-gray-800 transition-all duration-300"
      :class="{ 'shadow-sm': scrollProgress > 0 }"
    >
      <nav class="container mx-auto px-4 h-16 flex items-center justify-between">
        <slot name="nav-brand" />
        <div class="flex items-center gap-8">
          <TheNavigation />
          <LocaleSwitch />
          <ThemeToggle />
        </div>
      </nav>
    </header>

    <main class="pt-16">
      <slot />
    </main>

    <ScrollToTop 
      :show="showScrollTop"
      :progress="scrollProgress"
    />
  </div>
</template> 