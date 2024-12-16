<script setup lang="ts">
import { ref, onErrorCaptured, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'global'
})
const error = ref<Error | null>(null)

onErrorCaptured((err: Error) => {
  error.value = err
  return false
})

const retry = () => {
  error.value = null
  window.location.reload()
}

const errorTitle = computed(() => t('errors.title'))
const retryText = computed(() => t('errors.retry'))
const unknownError = computed(() => t('errors.unknown'))
</script>

<template>
  <div v-if="error" class="error-boundary">
    <div class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div class="bg-[#112240] p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="flex items-center gap-3 mb-4">
          <i class="uil uil-exclamation-triangle text-red-400 text-2xl"></i>
          <h2 class="text-xl font-semibold text-white">{{ errorTitle }}</h2>
        </div>
        <p class="text-gray-300 mb-6">{{ error?.message || unknownError }}</p>
        <button 
          @click="retry"
          class="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-500 
          transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <i class="uil uil-redo"></i>
          {{ retryText }}
        </button>
      </div>
    </div>
  </div>
  <slot v-else></slot>
</template>