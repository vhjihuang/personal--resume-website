<script setup lang="ts">
import { useI18n } from 'vue-i18n'

defineProps<{
  showScrollTop: boolean
}>()

const emit = defineEmits<{
  (e: 'scrollToTop'): void
}>()

const { t } = useI18n({
  useScope: 'global'
})
</script>

<template>
  <button 
    @click="emit('scrollToTop')"
    class="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-purple-500/50 hover:shadow-xl hover:bg-purple-500 motion-safe:hover:animate-bounce-slow"
    :class="{ 'translate-y-20 opacity-0': !showScrollTop, 'translate-y-0 opacity-100': showScrollTop }"
    :aria-label="t('accessibility.backToTop')"
  >
    <i class="uil uil-arrow-up text-2xl motion-safe:animate-pulse-slow"></i>
  </button>
</template> 