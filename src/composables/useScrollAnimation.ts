import { onMounted, onUnmounted } from 'vue'

export const useScrollAnimation = () => {
  const observeElements = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            if (entry.target.classList.contains('stagger-animation')) {
              const children = entry.target.children
              Array.from(children).forEach((child, index) => {
                ;(child as HTMLElement).style.transitionDelay = `${index * 0.1}s`
              })
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    )

    document.querySelectorAll('.scroll-animation').forEach((el) => {
      observer.observe(el)
    })

    return observer
  }

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = observeElements()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    observeElements
  }
} 