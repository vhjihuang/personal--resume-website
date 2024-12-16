<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  useScope: 'global'
})

interface MenuItem {
  id: string
  label: () => string
}

const menuItems: MenuItem[] = [
  { id: 'home', label: () => t('nav.home') },
  { id: 'about', label: () => t('nav.about') },
  { id: 'skills', label: () => t('nav.skills') },
  { id: 'portfolio', label: () => t('nav.portfolio') },
  { id: 'contact', label: () => t('nav.contact') }
]

defineProps<{
  activeSection: string
  isMenuOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'closeMenu'): void
}>()
</script>

<template>
  <div 
    class="nav_menu fixed md:static bg-[#0A192F] md:bg-transparent shadow-xl md:shadow-none"
    :class="[
      isMenuOpen ? 'right-0 top-16 h-[calc(100vh-4rem)] w-64 p-4' : '-right-full',
      'md:static md:right-auto md:w-auto md:h-auto md:p-0'
    ]"
  >
    <ul class="nav_list grid md:flex md:items-center md:space-x-4">
      <li 
        v-for="item in menuItems" 
        :key="item.id"
        class="nav_item"
      >
        <a 
          :href="'#' + item.id"
          class="nav_link text-base font-medium whitespace-nowrap text-white hover:text-purple-400 transition-colors px-3 py-2"
          :class="{ 'active-nav-link': activeSection === item.id }"
          @click="emit('closeMenu')"
        >
          {{ item.label() }}
        </a>
      </li>
    </ul>
  </div>
</template> 