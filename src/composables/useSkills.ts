import { ref, computed } from 'vue'
import type { Skill } from '@/types'
import { SKILLS } from '@/constants'

export function useSkills() {
  const frontendOpen = ref(true)
  const backendOpen = ref(false)

  const frontendSkills = computed(() => SKILLS.frontend)
  const backendSkills = computed(() => SKILLS.backend)

  const toggleSkills = (type: 'frontend' | 'backend') => {
    if (type === 'frontend') {
      frontendOpen.value = !frontendOpen.value
    } else {
      backendOpen.value = !backendOpen.value
    }
  }

  const getSkillLevel = (skill: Skill) => {
    return {
      width: `${skill.level}%`,
      transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }

  return {
    frontendOpen,
    backendOpen,
    frontendSkills,
    backendSkills,
    toggleSkills,
    getSkillLevel
  }
} 