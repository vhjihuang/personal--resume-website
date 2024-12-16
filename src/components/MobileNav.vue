<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{
  activeSection: string
}>()

const navItems = [
  { id: 'home', icon: 'uil-estate', label: () => t('nav.home') },
  { id: 'about', icon: 'uil-user', label: () => t('nav.about') },
  { id: 'skills', icon: 'uil-file-alt', label: () => t('nav.skills') },
  { id: 'portfolio', icon: 'uil-scenery', label: () => t('nav.portfolio') },
  { id: 'contact', icon: 'uil-message', label: () => t('nav.contact') }
]

const isActive = computed(() => (id: string) => props.activeSection === id)

defineExpose({
  navItems,
  isActive
})
</script>

<template>
  <nav class="mobile-nav md:hidden">
    <div class="flex justify-around items-center">
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="`#${item.id}`"
        class="flex flex-col items-center gap-1 p-2 transition-colors"
        :class="isActive(item.id) ? 'text-purple-400' : 'text-gray-400'"
      >
        <i :class="['text-xl', item.icon]"></i>
        <span class="text-xs">{{ item.label() }}</span>
      </a>
    </div>
  </nav>
</template> 