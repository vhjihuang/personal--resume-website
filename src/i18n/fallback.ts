import type { FallbackLocale } from 'vue-i18n'

// 定义回退规则
export const fallbackLocale: FallbackLocale = {
  'zh': ['en'],
  'ja': ['en'],
  'default': ['en']
}

// 定义始终使用英文的键
export const alwaysEnglishKeys = [
  'meta.keywords'
] 