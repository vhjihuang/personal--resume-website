import type { Ref } from 'vue'

// 定义深度必需类型
type DeepRequiredType<T> = {
  [K in keyof T]-?: T[K] extends object
    ? DeepRequiredType<T[K]>
    : T[K]
}

// 基础的翻译键类型
type BaseTranslationKey = {
  title: string
  subtitle: string
}

// 定义错误消息类型
interface ErrorMessages {
  required: string
  invalidEmail: string
  submitError: string
}

// 定义表单消息类型
interface FormMessages {
  title: string
  name: string
  email: string
  message: string
  send: string
  success: string
  errors: ErrorMessages
}

// 定义技能项类型
interface SkillItem {
  title: string
  description: string
  experience: string
  years: string
  skills: string[]
}

export interface TranslationMessages {
  nav: {
    home: string
    about: string
    skills: string
    portfolio: string
    contact: string
  }
  home: BaseTranslationKey & {
    introductionShort: string
    contactMe: string
    scrollDown: string
  }
  about: BaseTranslationKey & {
    description: string
    experience: string
    completed: string
    support: string
    years: string
    hours: string
    projects: string
    online: string
  }
  skills: BaseTranslationKey & {
    years: string
    frontend: SkillItem
    backend: SkillItem
  }
  portfolio: BaseTranslationKey & {
    demo: string
    source: string
    technologies: string
  }
  contact: BaseTranslationKey & {
    call: string
    email: string
    location: string
    form: FormMessages
  }
  theme: {
    light: string
    dark: string
  }
  accessibility: {
    skipToContent: string
    menuButton: string
    themeButton: string
    languageButton: string
    backToTop: string
    loading: string
  }
  meta: {
    title: string
    description: string
    keywords: string
  }
  errors: {
    title: string
    retry: string
    unknown: string
  }
}

export type LocaleMessages = DeepRequiredType<TranslationMessages>

export type SupportedLocales = 'en' | 'zh' | 'ja' 

export interface DateTimeFormat {
  short: {
    year: 'numeric'
    month: 'short' | 'long'
    day: 'numeric'
  }
}

export type DateTimeFormats = Record<SupportedLocales, DateTimeFormat>

// 定义语言配置类型
export interface LanguageConfig {
  name: string
  flag: string
  dir: 'ltr' | 'rtl'
}

// 定义翻译验证错误类型
export interface TranslationError {
  key: string
  type: 'missing' | 'extra' | 'format'
  message: string
  locale: SupportedLocales
  severity: 'error' | 'warning'
}

// 定义翻译验证配置类型
export interface ValidationConfig {
  ignoredKeys: string[]
  ignoredPrefixes: string[]
  allowExtraKeys: boolean
  strictFormat: boolean
}

// 定义加载状态类型
export interface LoadingState {
  isLoading: boolean
  progress: number
  phase: 'idle' | 'loading' | 'error'
  message: string
  locale: SupportedLocales | null
}

// 工具类型：提取翻译键路径
export type TranslationPath = keyof TranslationMessages | 
  `${keyof TranslationMessages}.${string}`

// 工具类型：获取翻译值类型
export type TranslationValue<
  P extends TranslationPath
> = P extends keyof TranslationMessages 
  ? TranslationMessages[P]
  : P extends `${infer K}.${infer Rest}`
    ? K extends keyof TranslationMessages
      ? Rest extends keyof TranslationMessages[K]
        ? TranslationMessages[K][Rest]
        : never
      : never
    : never

// 定义语言方向类型
export type LanguageDirection = 'ltr' | 'rtl'

// 定义数字格式化配置
export interface NumberFormatConfig {
  decimal: string
  thousand: string
  currency: string
}

// 定义完整的语言配置
export interface LocaleConfig extends LanguageConfig {
  dateFormat: string
  timeFormat: string
  numberFormat: NumberFormatConfig
}

// 定义验证阶段类型
export type ValidationPhase = 'initial' | 'loading' | 'success' | 'error'

// 定义验证结果类型
export interface ValidationResult {
  isValid: boolean
  errors: TranslationError[]
  warnings: TranslationError[]
}

// 定义资源类型
export type ResourceType = 'fonts' | 'images' | 'translations'

// 定义资源加载配置
export interface ResourceLoadConfig {
  priority: 'high' | 'low'
  timeout: number
  concurrent: number
}

// 定义缓存配置
export interface CacheConfig {
  version: string
  ttl: number
  maxSize: number
  compression: boolean
}

// 定义性能指标类型
export interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  resourceCount: number
  cacheHits: number
  cacheMisses: number
  errors: number
}

// 工具类型：递归部分类型
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

// 工具类型：递归只读类型
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// 工具类型：提取嵌套键路径
export type NestedKeyOf<T> = T extends object
  ? keyof T extends string
    ? keyof T | `${keyof T}.${NestedKeyOf<T[keyof T]>}`
    : never
  : never

// 常量：支持的语言列表
export const SUPPORTED_LOCALES = ['en', 'zh', 'ja'] as const

// 常量：默认配置
export const DEFAULT_CONFIG = {
  fallbackLocale: 'en',
  loadingTimeout: 5000,
  retryAttempts: 3,
  retryDelay: 1000,
  cachePrefix: 'i18n-cache',
  cacheTTL: 24 * 60 * 60 * 1000
} as const

// 定义错误类型
export class LocaleError extends Error {
  constructor(
    message: string,
    public locale: SupportedLocales,
    public code: string,
    public recoverable = true
  ) {
    super(message)
    this.name = 'LocaleError'
  }
}

// 定义错误码
export const ErrorCodes = {
  LOAD_FAILED: 'LOAD_FAILED',
  INVALID_LOCALE: 'INVALID_LOCALE',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  CACHE_ERROR: 'CACHE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR'
} as const

// 定义错误处理器类型
export type ErrorHandler = (error: LocaleError) => void | Promise<void>

// 定义事件类型
export interface LocaleEvents {
  'locale:change': { locale: SupportedLocales }
  'locale:loading': LoadingState
  'locale:error': { error: LocaleError }
  'locale:ready': { locale: SupportedLocales }
}

// 定义事件处理器类型
export type EventHandler<T extends keyof LocaleEvents> = (
  event: LocaleEvents[T]
) => void

// 定义事件发布订阅类型
export interface EventEmitter {
  on<T extends keyof LocaleEvents>(
    event: T,
    handler: EventHandler<T>
  ): void
  off<T extends keyof LocaleEvents>(
    event: T,
    handler: EventHandler<T>
  ): void
  emit<T extends keyof LocaleEvents>(
    event: T,
    data: LocaleEvents[T]
  ): void
}

// 定义缓存项类型
export interface CacheEntry<T> {
  data: T
  timestamp: number
  version: string
  size: number
}

// 定义缓存接口
export interface Cache {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
  clear(): Promise<void>
}

// 定义性能监控接口
export interface PerformanceMonitor {
  startMark(name: string): void
  endMark(name: string): number
  recordMetric<K extends keyof PerformanceMetrics>(
    key: K,
    value: PerformanceMetrics[K]
  ): void
  getMetrics(): Readonly<PerformanceMetrics>
}

// 工具类型：提取事件名称
export type EventNames = keyof LocaleEvents

// 工具类型：提取事件数据
export type EventData<T extends EventNames> = LocaleEvents[T]

// 工具类型：提取错误码
export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes]

// 定义国际化配置选项
export interface I18nOptions {
  locale: SupportedLocales
  fallbackLocale: SupportedLocales
  messages: Record<SupportedLocales, LocaleMessages>
  datetimeFormats?: DateTimeFormats
  numberFormats?: Record<SupportedLocales, NumberFormatConfig>
  loadingDelay?: number
  cache?: boolean
  debug?: boolean
}

// 定义国际化实例接口
export interface I18nInstance {
  locale: SupportedLocales
  t(key: TranslationPath, ...args: any[]): string
  d(date: Date, format?: string): string
  n(num: number, options?: Intl.NumberFormatOptions): string
  setLocale(locale: SupportedLocales): Promise<void>
  getLocaleMessage(locale: SupportedLocales): LocaleMessages
  mergeLocaleMessage(locale: SupportedLocales, message: DeepPartial<LocaleMessages>): void
}

// 定义路由元数据
export interface RouteMetaI18n {
  title: TranslationPath
  description?: TranslationPath
  keywords?: TranslationPath
}

// 定义组件国际化属性
export interface ComponentI18nProps {
  t: I18nInstance['t']
  locale: SupportedLocales
  availableLocales: SupportedLocales[]
  loading: boolean
}

// 定义国际化上下文
export interface I18nContext {
  instance: I18nInstance
  t: I18nInstance['t']
  locale: SupportedLocales
  setLocale: (locale: SupportedLocales) => Promise<void>
  loading: boolean
}

// 定义国际化插件选项
export interface I18nPluginOptions {
  router?: boolean
  seo?: boolean
  storage?: boolean
  debug?: boolean
  strictMode?: boolean
}

// 定义国际化钩子返回值
export interface UseI18nReturn {
  t: I18nInstance['t']
  d: I18nInstance['d']
  n: I18nInstance['n']
  locale: Ref<SupportedLocales>
  availableLocales: SupportedLocales[]
  loading: Ref<boolean>
  setLocale: (locale: SupportedLocales) => Promise<void>
}

// 定义国际化工具函数类型
export interface I18nUtils {
  interpolate(message: string, values: Record<string, any>): string
  pluralize(count: number, messages: string[]): string
  formatNumber(num: number, locale: SupportedLocales): string
  formatDate(date: Date, locale: SupportedLocales): string
  formatTime(time: Date, locale: SupportedLocales): string
}

// 定义国际化存储接口
export interface I18nStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

// 定义语言配置常量
export const LOCALE_CONFIG = {
  STORAGE_KEY: 'locale',
  CACHE_PREFIX: 'i18n-cache',
  TRANSITION_DURATION: 300,
  DEBOUNCE_WAIT: 500,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  CACHE_TTL: 24 * 60 * 60 * 1000, // 24小时
  PERFORMANCE_THRESHOLDS: {
    SLOW: 300,
    CRITICAL: 1000
  }
} as const

// 定义加载阶段类型
export type LoadingPhase = 
  | 'initial'
  | 'loading'
  | 'transitioning'
  | 'error'
  | 'success'

// 定义加载状态更新
export interface LoadingStateUpdate {
  phase?: LoadingPhase
  progress?: number
  message?: string
  error?: Error | null
}

// 定义性能报告类型
export interface PerformanceReport {
  metrics: PerformanceMetrics
  timestamp: number
  locale: SupportedLocales
  success: boolean
  warnings: string[]
}

// 定义用户消息类型
export interface UserMessage {
  type: 'info' | 'warning' | 'error'
  content: string
  timestamp: number
  duration?: number
}

// 定义动画配置类型
export interface AnimationConfig {
  duration: number
  easing: string
  delay: number
  threshold: number
}

// 定义动画状态类型
export type AnimationState = 
  | 'idle'
  | 'entering'
  | 'entered' 
  | 'exiting'
  | 'exited'

// 定义资源优先级类型
export interface ResourcePriority {
  type: ResourceType
  priority: 'high' | 'low'
  timeout: number
}

// 定义资源加载状态类型
export interface ResourceLoadState {
  total: number
  loaded: number
  failed: number
  progress: number
}

// 定义路由导航守卫类型
export interface I18nRouteGuard {
  beforeEach?: (to: any, from: any, next: any) => void
  afterEach?: (to: any, from: any) => void
}

// 定义SEO相关类型
export interface I18nSeoConfig {
  titleTemplate?: string
  defaultTitle?: string
  defaultDescription?: string
  defaultKeywords?: string
  separator?: string
}

// 定义本地化数字格式
export interface LocaleNumberFormat {
  currency: {
    style: 'currency'
    currency: string
  }
  decimal: {
    minimumFractionDigits: number
    maximumFractionDigits: number
  }
  percent: {
    style: 'percent'
    minimumFractionDigits: number
  }
}

// 定义本地化日期时间格式
export interface LocaleDateTimeFormat {
  short: {
    year: 'numeric'
    month: 'short'
    day: 'numeric'
  }
  long: {
    year: 'numeric'
    month: 'long'
    day: 'numeric'
    weekday: 'long'
  }
  time: {
    hour: 'numeric'
    minute: 'numeric'
    hour12?: boolean
  }
}

// 定义本地化选项
export interface LocaleOptions {
  numberFormats: Record<SupportedLocales, LocaleNumberFormat>
  dateTimeFormats: Record<SupportedLocales, LocaleDateTimeFormat>
  fallbackLocale: SupportedLocales
  messages: Record<SupportedLocales, LocaleMessages>
}

// 定义本地化上下文
export interface LocaleContext {
  locale: Ref<SupportedLocales>
  t: I18nInstance['t']
  n: I18nInstance['n']
  d: I18nInstance['d']
  setLocale: (locale: SupportedLocales) => Promise<void>
  getLocaleMessage: (locale: SupportedLocales) => LocaleMessages
}

// 定义本地化插件
export interface LocalePlugin {
  install: (app: any, options?: I18nPluginOptions) => void
  global: LocaleContext
}

// 定义路由相关类型
export interface I18nRoute {
  path: string
  name?: string
  meta?: {
    title?: TranslationPath
    description?: TranslationPath
    keywords?: TranslationPath
  }
}

// 定义本地化路由配置
export interface LocaleRouteConfig {
  routes: I18nRoute[]
  mode?: 'prefix' | 'query'
  defaultLocale?: SupportedLocales
  syncTitle?: boolean
}

// 定义本地化组件选项
export interface LocaleComponentOptions {
  inheritLocale?: boolean
  useScope?: 'global' | 'local' | 'parent'
  sync?: boolean
  messages?: Record<SupportedLocales, Record<string, any>>
}

// 定义本地化指令选项
export interface LocaleDirectiveOptions {
  modifiers?: {
    html?: boolean
    number?: boolean
    date?: boolean
  }
  value?: string | number | Date
  arg?: string
}

// 定义本地化过滤器
export interface LocaleFilters {
  translate: (key: string, ...args: any[]) => string
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string
  formatDate: (value: Date, format?: string) => string
  formatTime: (value: Date, format?: string) => string
  formatCurrency: (value: number, currency?: string) => string
}

// 定义本地化辅助函数
export interface LocaleHelpers {
  getLocaleFromRoute: (route: any) => SupportedLocales
  setDocumentLang: (locale: SupportedLocales) => void
  setDocumentDir: (locale: SupportedLocales) => void
  loadLocaleMessages: (locale: SupportedLocales) => Promise<LocaleMessages>
  mergeLocaleMessages: (locale: SupportedLocales, messages: DeepPartial<LocaleMessages>) => void
}

// 定义本地化钩子函数
export interface LocaleHooks {
  beforeLocaleChange?: (locale: SupportedLocales) => boolean | Promise<boolean>
  afterLocaleChange?: (locale: SupportedLocales) => void
  onLocaleError?: (error: LocaleError) => void
  onLocaleLoading?: (state: LoadingState) => void
  onLocaleReady?: (locale: SupportedLocales) => void
}

// 定义本地化中间件类型
export interface LocaleMiddleware {
  before?: (locale: SupportedLocales) => Promise<void> | void
  after?: (locale: SupportedLocales) => Promise<void> | void
  error?: (error: LocaleError) => Promise<void> | void
}

// 定义本地化插件上下文
export interface LocalePluginContext {
  app: any
  i18n: I18nInstance
  router?: any
  store?: any
  options: I18nPluginOptions
}

// 定义本地化服务接口
export interface LocaleService {
  // 基础方法
  getCurrentLocale(): SupportedLocales
  setLocale(locale: SupportedLocales): Promise<void>
  getAvailableLocales(): SupportedLocales[]
  
  // 翻译法
  translate(key: TranslationPath, ...args: any[]): string
  translateWithFallback(key: TranslationPath, fallback: string): string
  hasTranslation(key: TranslationPath): boolean
  
  // 格式化方法
  formatNumber(value: number, options?: Intl.NumberFormatOptions): string
  formatDate(value: Date, format?: string): string
  formatTime(value: Date, format?: string): string
  formatCurrency(value: number, currency?: string): string
  
  // 资源管理
  loadMessages(locale: SupportedLocales): Promise<LocaleMessages>
  mergeMessages(locale: SupportedLocales, messages: DeepPartial<LocaleMessages>): void
  clearMessages(locale: SupportedLocales): void
  
  // 事件处理
  onLocaleChange(handler: (locale: SupportedLocales) => void): void
  offLocaleChange(handler: (locale: SupportedLocales) => void): void
  
  // 工具方法
  getDocumentLang(): string
  setDocumentLang(locale: SupportedLocales): void
  getDocumentDir(): LanguageDirection
  setDocumentDir(locale: SupportedLocales): void
}

// 定义本地化状态管理
export interface LocaleState {
  locale: SupportedLocales
  loading: boolean
  error: LocaleError | null
  messages: Record<SupportedLocales, LocaleMessages>
  fallbackLocale: SupportedLocales
  availableLocales: SupportedLocales[]
}

// 定义本地存储策略
export interface LocaleStorageStrategy {
  type: 'localStorage' | 'sessionStorage' | 'cookie' | 'custom'
  options?: {
    prefix?: string
    ttl?: number
    path?: string
    domain?: string
    secure?: boolean
  }
  customStorage?: I18nStorage
}