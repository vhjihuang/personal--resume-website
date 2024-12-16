import { onMounted } from 'vue'

export const usePerformance = () => {
  const measurePerformance = () => {
    if (window.performance && performance.getEntriesByType) {
      try {
        const paintMetrics = performance.getEntriesByType('paint')
        if (paintMetrics && paintMetrics.length > 0) {
          const firstPaint = paintMetrics.find(
            (entry) => entry.name === 'first-paint'
          )
          const firstContentfulPaint = paintMetrics.find(
            (entry) => entry.name === 'first-contentful-paint'
          )

          if (firstPaint) {
            console.log('First Paint:', firstPaint.startTime)
          }
          if (firstContentfulPaint) {
            console.log('First Contentful Paint:', firstContentfulPaint.startTime)
          }
        }

        // 测量TTI (Time to Interactive)
        if (performance.timing) {
          const tti = performance.timing.domInteractive - performance.timing.navigationStart
          console.log('Time to Interactive:', tti)
        }
      } catch (error) {
        console.warn('Performance metrics not available:', error)
      }
    }
  }

  onMounted(() => {
    measurePerformance()
  })

  return {
    measurePerformance
  }
} 