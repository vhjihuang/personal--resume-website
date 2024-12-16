import type { LocaleMessages, SupportedLocales } from '../types'

function getAllKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.keys(obj).reduce((keys: string[], key) => {
    const newPrefix = prefix ? `${prefix}.${key}` : key
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      return [...keys, ...getAllKeys(obj[key] as Record<string, unknown>, newPrefix)]
    }
    return [...keys, newPrefix]
  }, [])
}

type ValidationResult = {
  locale: string
  type: 'missing' | 'extra'
  keys: string[]
}

function validateMessages(
  messages: Record<SupportedLocales, LocaleMessages>,
  baseLocale = 'en'
): ValidationResult[] {
  const baseKeys = getAllKeys(messages[baseLocale])
  const errors: ValidationResult[] = []

  Object.entries(messages).forEach(([locale, msg]) => {
    if (locale === baseLocale) return

    const currentKeys = getAllKeys(msg)
    const missingKeys = baseKeys.filter(key => !currentKeys.includes(key))
    const extraKeys = currentKeys.filter(key => !baseKeys.includes(key))

    if (missingKeys.length > 0) {
      errors.push({
        locale,
        type: 'missing',
        keys: missingKeys
      })
    }

    if (extraKeys.length > 0) {
      errors.push({
        locale,
        type: 'extra',
        keys: extraKeys
      })
    }
  })

  return errors
}

export { validateMessages } 