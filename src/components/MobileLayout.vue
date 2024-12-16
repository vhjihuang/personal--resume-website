<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import MobileNav from './MobileNav.vue'
import TouchHandler from './TouchHandler.vue'
import MobileLoader from './MobileLoader.vue'

interface Props {
  activeSection: string
  loading?: boolean
}

const props = defineProps<Props>()

const isScrollingUp = ref(false)
const lastScrollTop = ref(0)
const showLoader = ref(props.loading || false)

watch(() => props.loading, (newValue) => {
  showLoader.value = newValue || false
})

const handleScroll = () => {
  const st = window.pageYOffset || document.documentElement.scrollTop
  isScrollingUp.value = st < lastScrollTop.value
  lastScrollTop.value = st <= 0 ? 0 : st
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleSwipeUp = () => {
  // 处理向上滑动
  console.log('Swipe up')
}

const handleSwipeDown = () => {
  // 处理向下滑动
  console.log('Swipe down')
}
</script>

<template>
  <div class="min-h-screen-safe flex flex-col">
    <slot name="header" :is-scrolling-up="isScrollingUp" />
    <TouchHandler
      class="flex-1"
      @swipe-up="handleSwipeUp"
      @swipe-down="handleSwipeDown"
    >
      <main class="scroll-smooth">
        <slot />
      </main>
    </TouchHandler>
    <MobileNav :active-section="activeSection" />
    <div class="safe-area-bottom mobile-only" />
    <MobileLoader
      v-if="showLoader"
      class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      size="large"
    />
  </div>
</template> 