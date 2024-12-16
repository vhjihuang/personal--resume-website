<script setup lang="ts">
import { ref } from 'vue'

const startX = ref(0)
const startY = ref(0)
const threshold = 50 // 触发阈值

const emit = defineEmits<{
  (e: 'swipeLeft'): void
  (e: 'swipeRight'): void
  (e: 'swipeUp'): void
  (e: 'swipeDown'): void
}>()

const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX
  startY.value = e.touches[0].clientY
}

const handleTouchEnd = (e: TouchEvent) => {
  const deltaX = e.changedTouches[0].clientX - startX.value
  const deltaY = e.changedTouches[0].clientY - startY.value
  
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // 水平滑动
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        emit('swipeRight')
      } else {
        emit('swipeLeft')
      }
    }
  } else {
    // 垂直滑动
    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        emit('swipeDown')
      } else {
        emit('swipeUp')
      }
    }
  }
}
</script>

<template>
  <div
    class="touch-handler"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <slot />
  </div>
</template>

<style scoped>
.touch-handler {
  touch-action: pan-x pan-y;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}
</style> 