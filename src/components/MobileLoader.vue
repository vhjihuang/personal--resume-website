<script setup lang="ts">
import { defineOptions } from 'vue'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'MobileLoader'
})

const { t } = useI18n({
  useScope: 'global'
})

interface Props {
  loading: boolean
  size?: 'small' | 'medium' | 'large'
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: true,
  size: 'medium',
  color: 'text-purple-500'
})
</script>

<template>
  <div
    v-if="loading"
    class="loader"
    :class="[size === 'small' ? 'w-4 h-4' : 'w-8 h-8']"
    role="status"
    :aria-label="t('accessibility.loading')"
  >
    <div class="loader-inner"></div>
  </div>
</template>

<style scoped>
.loader {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
}

.loader-inner {
  width: 100%;
  height: 100%;
  border: 2px solid #e2e8f0;
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  will-change: transform;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loader-inner {
    animation-duration: 1.5s;
  }
}
</style> 