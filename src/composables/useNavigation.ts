import { ref } from 'vue'

export const useNavigation = () => {
  const isMenuOpen = ref(false)

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
    if (isMenuOpen.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }

  const closeMenu = () => {
    isMenuOpen.value = false
    document.body.style.overflow = ''
  }

  const handleNavClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const link = target.closest('a')
    if (link?.classList.contains('nav_link')) {
      closeMenu()
      // 平滑滚动到目标位置
      const href = link.getAttribute('href')
      if (href && href.startsWith('#')) {
        event.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
    handleNavClick
  }
} 