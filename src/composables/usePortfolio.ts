import { ref, computed } from 'vue'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  demo: string
  github: string
}

export const usePortfolio = (initialProjects: Project[]) => {
  const projects = ref(initialProjects)
  const selectedTech = ref<string | null>(null)

  const filteredProjects = computed(() => {
    if (!selectedTech.value) return projects.value
    return projects.value.filter(project => 
      project.technologies.includes(selectedTech.value!)
    )
  })

  const filterByTech = (tech: string | null) => {
    selectedTech.value = tech
  }

  const allTechnologies = computed(() => {
    const techSet = new Set<string>()
    projects.value.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech))
    })
    return Array.from(techSet)
  })

  return {
    projects: filteredProjects,
    allTechnologies,
    selectedTech,
    filterByTech
  }
} 