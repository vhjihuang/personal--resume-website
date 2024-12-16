import { ref, onMounted, onUnmounted } from 'vue'

export const useActiveSection = (menuItems: { id: string }[]) => {
  const activeSection = ref('home')

  const observeSections = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionClass = Array.from(entry.target.classList).find(
              (className) => menuItems.some((item) => item.id === className)
            )
            if (sectionClass) {
              activeSection.value = sectionClass
            }
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: '-50% 0px -50% 0px'
      }
    )

    menuItems.forEach((item) => {
      const section = document.querySelector(`.${item.id}`)
      if (section) {
        observer.observe(section)
      }
    })

    return observer
  }

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = observeSections()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    activeSection
  }
} 