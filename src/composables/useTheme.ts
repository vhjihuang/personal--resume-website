import { ref, watch, onUnmounted } from 'vue'

type Theme = 'light' | 'dark'

export const useTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

  const theme = ref<Theme>(
    localStorage.getItem('theme') as Theme || 
    (prefersDark.matches ? 'dark' : 'light')
  )

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark' as Theme
    localStorage.setItem('theme', theme.value)
    document.documentElement.classList.toggle('dark')
  }

  watch(theme, (newTheme) => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(newTheme)
    localStorage.setItem('theme', newTheme)
  }, { immediate: true })

  // 监听系统主题变化
  const handleThemeChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem('theme')) {
      theme.value = e.matches ? 'dark' : 'light'
    }
  }

  prefersDark.addEventListener('change', handleThemeChange)

  onUnmounted(() => {
    prefersDark.removeEventListener('change', handleThemeChange)
  })

  return {
    theme,
    toggleTheme
  }
} 