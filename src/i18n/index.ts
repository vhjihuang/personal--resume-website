import { createI18n } from 'vue-i18n'
import type { LocaleMessages, SupportedLocales } from './types'
import en from './messages/en'
import zh from './messages/zh'
import ja from './messages/ja'
import { fallbackLocale } from './fallback'
import { validateMessages } from './utils/validateMessages'
import { getDefaultLocale } from './utils/locale'

if (import.meta.env.DEV) {
  const errors = validateMessages({ en, zh, ja })
  if (errors.length > 0) {
    console.warn('翻译验证错误:', errors)
  }
}

export const i18n = createI18n<[LocaleMessages], SupportedLocales>({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale,
  globalInjection: true,
  useScope: 'global',
  allowComposition: true,
  sync: true,
  silentTranslationWarn: false,
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    en,
    zh,
    ja
  } as Record<SupportedLocales, LocaleMessages>
})
