import { ref, onMounted, watch } from 'vue'

export interface ColorTheme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    hover: string
    background: string
    surface: string
    text: string
  }
}

const themes: ColorTheme[] = [
  {
    id: 'purple',
    name: '紫色主题',
    colors: {
      primary: '#6a58d8',
      secondary: '#8b7dff',
      accent: '#ff6b6b',
      hover: '#7c6ee6',
      background: '#0A192F',
      surface: '#112240',
      text: '#ffffff'
    }
  },
  {
    id: 'blue',
    name: '蓝色主题',
    colors: {
      primary: '#0066cc',
      secondary: '#0080ff',
      accent: '#00b4d8',
      hover: '#0073e6',
      background: '#1a365d',
      surface: '#2d3748',
      text: '#ffffff'
    }
  },
  {
    id: 'green',
    name: '绿色主题',
    colors: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#059669',
      hover: '#0d9668',
      background: '#064e3b',
      surface: '#065f46',
      text: '#ffffff'
    }
  },
  {
    id: 'orange',
    name: '橙色主题',
    colors: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#ea580c',
      hover: '#ea580c',
      background: '#7c2d12',
      surface: '#9a3412',
      text: '#ffffff'
    }
  }
]

export function useColorTheme() {
  const currentTheme = ref<ColorTheme>(themes[0])

  const applyTheme = (theme: ColorTheme) => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', theme.colors.primary)
    root.style.setProperty('--color-secondary', theme.colors.secondary)
    root.style.setProperty('--color-accent', theme.colors.accent)
    root.style.setProperty('--color-hover', theme.colors.hover)
    root.style.setProperty('--color-background', theme.colors.background)
    root.style.setProperty('--color-surface', theme.colors.surface)
    root.style.setProperty('--color-text', theme.colors.text)
    root.style.setProperty('--tw-gradient-from', theme.colors.primary)
    root.style.setProperty('--tw-gradient-to', theme.colors.secondary)
    root.style.setProperty('--tw-gradient-stops', 'var(--tw-gradient-from), var(--tw-gradient-to)')
    currentTheme.value = theme
    localStorage.setItem('color-theme', JSON.stringify(theme))
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('color-theme')
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme)
        const foundTheme = themes.find(t => t.id === theme.id)
        if (foundTheme) {
          applyTheme(foundTheme)
        }
      } catch (error) {
        console.error('Error parsing saved theme:', error)
        applyTheme(themes[0])
      }
    }
  }

  onMounted(initTheme)

  return {
    themes,
    currentTheme,
    applyTheme
  }
} 