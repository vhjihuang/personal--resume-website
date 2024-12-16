declare interface PerformanceEntryWithProcessing extends PerformanceEntry {
  processingStart?: number
  hadRecentInput?: boolean
  value?: number
}

declare interface PerformanceMetrics {
  fcp: number
  lcp: number
  fid: number
  cls: number
}

declare interface WebVitalsThresholds {
  LCP: {
    good: number
    poor: number
  }
  FID: {
    good: number
    poor: number
  }
  CLS: {
    good: number
    poor: number
  }
} 