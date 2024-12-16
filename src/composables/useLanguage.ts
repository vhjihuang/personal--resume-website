import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useLanguage = () => {
  const { locale } = useI18n()
  const isChangingLocale = ref(false)

  // 切换语言
  const changeLanguage = async (lang: string) => {
    try {
      isChangingLocale.value = true
      locale.value = lang
      localStorage.setItem('locale', lang)
      document.querySelector('html')?.setAttribute('lang', lang)
    } catch (error) {
      console.error('Error changing language:', error)
    } finally {
      isChangingLocale.value = false
    }
  }

  // 监听语言变化
  watch(locale, (newLocale) => {
    document.querySelector('html')?.setAttribute('lang', newLocale)
  })

  return {
    currentLocale: locale,
    isChangingLocale,
    changeLanguage
  }
} 