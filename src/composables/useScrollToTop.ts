import { ref, onMounted, onUnmounted } from 'vue'

export const useScrollToTop = () => {
  const showScrollTop = ref(false)
  const scrollProgress = ref(0)

  const handleScroll = () => {
    const winScroll = document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    scrollProgress.value = (winScroll / height) * 100
    showScrollTop.value = winScroll > 400
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    showScrollTop,
    scrollProgress,
    scrollToTop
  }
} 