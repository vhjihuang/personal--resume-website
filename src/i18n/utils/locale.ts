// 定义支持的语言类型
export type SupportedLocales = 'en' | 'zh' | 'ja'

// 定义语言配置类型
interface LocaleConfig {
  name: string
  flag: string
  dir: 'ltr' | 'rtl'
}

// 核心配置
const CONFIG = {
  storage: {
    key: 'locale',
    ttl: 24 * 60 * 60 * 1000
  },
  animation: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  retry: {
    attempts: 3,
    delay: 1000
  }
} as const

// 支持的语言配置
const LOCALE_CONFIG: Record<SupportedLocales, LocaleConfig> = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    dir: 'ltr'
  },
  zh: {
    name: '中文',
    flag: '🇨🇳', 
    dir: 'ltr'
  },
  ja: {
    name: '日本語',
    flag: '🇯🇵',
    dir: 'ltr'
  }
} as const

// 错误处理
export class LocaleError extends Error {
  constructor(
    message: string,
    public locale: string,
    public recoverable = true
  ) {
    super(message)
    this.name = 'LocaleError'
  }
}

// 设置语言
export async function setLocale(locale: SupportedLocales): Promise<void> {
  try {
    if (!isValidLocale(locale)) {
      throw new LocaleError(`Invalid locale: ${locale}`, locale, false)
    }

    document.documentElement.lang = locale
    localStorage.setItem(CONFIG.storage.key, locale)

    window.dispatchEvent(new CustomEvent('localeChange', {
      detail: { locale }
    }))

  } catch (error) {
    console.error('Failed to set locale:', error)
    throw error
  }
}

// 获取默认语言
export function getDefaultLocale(): SupportedLocales {
  const stored = localStorage.getItem(CONFIG.storage.key)
  if (stored && isValidLocale(stored)) {
    return stored as SupportedLocales
  }
  
  const browserLang = navigator.language.split('-')[0]
  return isValidLocale(browserLang) ? browserLang as SupportedLocales : 'en'
}

// 验证语言
function isValidLocale(locale: string): locale is SupportedLocales {
  return locale in LOCALE_CONFIG
}

// 获取语言名称
export function getLocaleName(locale: SupportedLocales): string {
  return LOCALE_CONFIG[locale].name
}

// 获取语言图标
export function getLocaleFlag(locale: SupportedLocales): string {
  return LOCALE_CONFIG[locale].flag
}

// 获取语言方向
export function getLocaleDir(locale: SupportedLocales): 'ltr' | 'rtl' {
  return LOCALE_CONFIG[locale].dir
}

// 获取所有支持的语言
export function getSupportedLocales(): SupportedLocales[] {
  return Object.keys(LOCALE_CONFIG) as SupportedLocales[]
}

// 获取当前语言
export function getCurrentLocale(): SupportedLocales {
  return localStorage.getItem(CONFIG.storage.key) as SupportedLocales || getDefaultLocale()
}