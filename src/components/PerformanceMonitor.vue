<script setup lang="ts">
import { onMounted, inject, ref, onUnmounted, defineOptions } from 'vue'
import { usePerformanceMetrics } from '../composables/usePerformanceMetrics'

defineOptions({
  name: 'PerformanceMonitor'
})

interface PerformanceEntry {
  startTime: number
  name: string
  duration?: number
  entryType: string
  renderTime?: number
  loadTime?: number
  size?: number
  processingStart?: number
  hadRecentInput?: boolean
  value?: number
}

interface PerformanceEntryList {
  getEntries(): Array<PerformanceEntry>
}

type PerformanceEntryType = 'paint' | 'largest-contentful-paint' | 'first-input' | 'layout-shift'
type PerformanceObserverCallback = (list: PerformanceEntryList) => void

interface PerformanceObserverType {
  observe: (options: { entryTypes: PerformanceEntryType[] }) => void
  disconnect: () => void
}

declare global {
  interface Window {
    PerformanceObserver: {
      prototype: PerformanceObserverType
      new(callback: PerformanceObserverCallback): PerformanceObserverType
    }
    performance: {
      getEntriesByType(type: PerformanceEntryType): PerformanceEntry[]
      timing?: {
        domInteractive: number
        navigationStart: number
      }
    }
  }
}

const { metrics, isGoodPerformance } = usePerformanceMetrics()
const isDev = inject<boolean>('isDev', false)
const isCollapsed = ref(false)

type ObserverInstance = InstanceType<Window['PerformanceObserver']>
const observers = ref<ObserverInstance[]>([])

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

onMounted(() => {
  try {
    if (window.performance && performance.getEntriesByType) {
      const paintMetrics = performance.getEntriesByType('paint')
      if (paintMetrics && paintMetrics.length > 0) {
        const firstPaint = paintMetrics.find(entry => entry.name === 'first-paint')
        const firstContentfulPaint = paintMetrics.find(entry => entry.name === 'first-contentful-paint')
        
        if (firstPaint) {
          metrics.value.fp = firstPaint.startTime
        }
        if (firstContentfulPaint) {
          metrics.value.fcp = firstContentfulPaint.startTime
        }
      }
      
      if (performance.timing) {
        const timing = performance.timing
        metrics.value.domInteractive = timing.domInteractive - timing.navigationStart
      }
    }
  } catch (error) {
    if (isDev) {
      console.warn('Performance monitoring failed:', error)
    }
  }
})

onUnmounted(() => {
  observers.value.forEach(observer => observer.disconnect())
  observers.value = []
})
</script>

<template>
  <div v-if="isDev" class="fixed bottom-4 left-4 z-50">
    <div class="bg-black/80 text-white p-4 rounded-lg text-xs space-y-1 backdrop-blur-sm min-w-[160px]">
      <div class="flex items-center justify-between mb-2 pb-2 border-b border-gray-700">
        <span class="font-medium">Performance</span>
        <button 
          @click="toggleCollapse" 
          class="text-gray-400 hover:text-white transition-colors"
        >
          <i :class="[isCollapsed ? 'uil-angle-up' : 'uil-angle-down']" class="uil text-lg"></i>
        </button>
      </div>
      <div 
        class="transition-all duration-300 overflow-hidden"
        :style="{ maxHeight: isCollapsed ? '0' : '200px' }"
      >
        <div class="flex items-center justify-between">
          <span>FCP:</span>
          <span>{{ metrics.fcp.toFixed(2) }}ms</span>
        </div>
        <div class="flex items-center justify-between">
          <span>LCP:</span>
          <span :class="isGoodPerformance('LCP', metrics.lcp) ? 'text-green-400' : 'text-red-400'">
            {{ metrics.lcp.toFixed(2) }}ms
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span>FID:</span>
          <span :class="isGoodPerformance('FID', metrics.fid) ? 'text-green-400' : 'text-red-400'">
            {{ metrics.fid.toFixed(2) }}ms
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span>CLS:</span>
          <span :class="isGoodPerformance('CLS', metrics.cls) ? 'text-green-400' : 'text-red-400'">
            {{ metrics.cls.toFixed(4) }}
          </span>
        </div>
        <div class="mt-2 pt-2 border-t border-gray-700 text-[10px] text-gray-400">
          <div class="flex justify-between items-center">
            <span>Core Web Vitals</span>
            <div class="flex gap-2">
              <span :class="isGoodPerformance('LCP', metrics.lcp) ? 'text-green-400' : 'text-red-400'">LCP</span>
              <span :class="isGoodPerformance('FID', metrics.fid) ? 'text-green-400' : 'text-red-400'">FID</span>
              <span :class="isGoodPerformance('CLS', metrics.cls) ? 'text-green-400' : 'text-red-400'">CLS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop-blur-sm {
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style> 