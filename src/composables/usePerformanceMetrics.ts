import { ref, type Ref } from 'vue'

type ThresholdValues = {
  good: number
  poor: number
}

type ThresholdMetrics = {
  readonly [K in 'LCP' | 'FID' | 'CLS']: ThresholdValues
}

type MetricKey = keyof ThresholdMetrics

const WEB_VITALS_THRESHOLDS: ThresholdMetrics = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 }
} as const

interface Metrics {
  fp: number
  fcp: number
  lcp: number
  fid: number
  cls: number
  domInteractive: number
}

export function usePerformanceMetrics() {
  const metrics = ref<Metrics>({
    fp: 0,
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    domInteractive: 0
  })

  type PerformanceStatus = 'good' | 'poor' | 'needs-improvement'

  const isGoodPerformance = (metric: MetricKey, value: number): boolean => {
    return value <= WEB_VITALS_THRESHOLDS[metric].good
  }

  const isPoorPerformance = (metric: MetricKey, value: number): boolean => {
    return value >= WEB_VITALS_THRESHOLDS[metric].poor
  }

  const getPerformanceStatus = (metric: MetricKey, value: number): PerformanceStatus => {
    if (isGoodPerformance(metric, value)) return 'good'
    if (isPoorPerformance(metric, value)) return 'poor'
    return 'needs-improvement'
  }

  return {
    metrics,
    isGoodPerformance,
    isPoorPerformance,
    getPerformanceStatus,
    WEB_VITALS_THRESHOLDS
  }
} 