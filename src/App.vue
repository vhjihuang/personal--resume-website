<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import MobileLoader from './components/MobileLoader.vue'
import SeoHead from './components/SeoHead.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import PerformanceMonitor from './components/PerformanceMonitor.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import TheNavigation from './components/TheNavigation.vue'
import LocaleSwitch from './components/LocaleSwitch.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import ContactForm from './components/ContactForm.vue'
import { setLocale } from '@/i18n/utils/locale'
import { useActiveSection } from '@/composables/useActiveSection'
import { useScrollToTop } from '@/composables/useScrollToTop'
import { useSkills } from '@/composables/useSkills'
import { useContactForm } from '@/composables/useContactForm'

// 定义菜单项类型
interface MenuItem {
  id: string
  label: () => string
}

// 定义菜单项
const menuItems: MenuItem[] = [
  { id: 'home', label: () => t('nav.home') },
  { id: 'about', label: () => t('nav.about') },
  { id: 'skills', label: () => t('nav.skills') },
  { id: 'portfolio', label: () => t('nav.portfolio') },
  { id: 'contact', label: () => t('nav.contact') }
]

const { t, locale } = useI18n({
  useScope: 'global'
})

const isMenuOpen = ref(false)
const { activeSection } = useActiveSection(menuItems)
const { showScrollTop, scrollProgress, scrollToTop } = useScrollToTop()
const { frontendOpen, backendOpen, toggleSkills } = useSkills()
const { form, isSubmitting, submitError, handleSubmit } = useContactForm()

// 定义技能类型
interface Skill {
  name: string
  level: number
}

// 前端技能数据
const frontendSkills = shallowRef<Skill[]>([
  { name: 'HTML', level: 90 },
  { name: 'CSS', level: 85 },
  { name: 'JavaScript', level: 85 },
  { name: 'Vue', level: 80 },
  { name: 'React', level: 75 },
  { name: 'TypeScript', level: 75 }
])

// 后端技能数据
const backendSkills = shallowRef<Skill[]>([
  { name: 'Node.js', level: 70 },
  { name: 'Python', level: 65 },
  { name: 'MySQL', level: 70 },
  { name: 'MongoDB', level: 65 }
])

// 切换菜单
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 定义观察器类型
let sectionsObserver: IntersectionObserver | null = null
let elementsObserver: IntersectionObserver | null = null

// 观察各个部分
const observeSections = () => {
  sectionsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionClass = Array.from(entry.target.classList)
          .find(className => menuItems.some(item => item.id === className))
        if (sectionClass) {
          activeSection.value = sectionClass
        }
      }
    })
  }, {
    threshold: 0.5,
    rootMargin: '-50% 0px -50% 0px'
  })

  menuItems.forEach(item => {
    const section = document.querySelector(`.${item.id}`)
    if (section) {
      sectionsObserver?.observe(section)
    }
  })
}

// 滚动动画
const observeElements = () => {
  elementsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
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
  }, {
    threshold: 0.1,
    rootMargin: '0px'
  })

  document.querySelectorAll('.scroll-animation').forEach((el) => {
    elementsObserver?.observe(el)
  })
}

onMounted(() => {
  observeElements()
  observeSections()
})

onUnmounted(() => {
  sectionsObserver?.disconnect()
  elementsObserver?.disconnect()
})

// 监听语言变化并保存到 localStorage
watch(locale, (newLocale) => {
  setLocale(newLocale)
})

// 监听语言变化
watch(() => locale.value, (newLocale) => {
  document.documentElement.lang = newLocale
}, { immediate: true })

// 定义项目类型
interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  demo: string
  github: string
}

// Portfolio 项目数据
const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Personal Resume Website',
    description: 'A responsive personal portfolio website built with Vue 3 and Tailwind CSS',
    image: '/assets/img/projects/resume.jpg',
    technologies: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'i18n'],
    demo: 'https://vhjihuang.github.io/personal-resume-website',
    github: 'https://github.com/vhjihuang/personal-resume-website'
  }
])
</script>

<template>
  <SeoHead />
  <ErrorBoundary>
    <div class="w-full">
      <header 
        class="header fixed w-full top-0 left-0 z-50 border-b border-gray-800 transition-all duration-300"
        :style="{ backgroundColor: 'var(--color-background)' }"
        :class="{ 'shadow-sm': scrollProgress > 0 }"
      >
        <div class="mx-auto max-w-[30rem] md:max-w-[48rem] lg:max-w-[64rem] px-4">
          <nav class="h-16 flex items-center justify-between">
            <a href="#" class="nav_logo text-xl font-medium text-white hover:text-purple-400 transition-colors">
              Huang
            </a>

            <div class="flex items-center gap-8">
              <TheNavigation
                :active-section="activeSection"
                :is-menu-open="isMenuOpen"
                @close-menu="isMenuOpen = false"
              />

              <button 
                class="md:hidden p-2 text-white hover:text-purple-400 transition-colors" 
                @click="toggleMenu"
              >
                <i class="uil text-2xl" :class="isMenuOpen ? 'uil-times' : 'uil-bars'"></i>
              </button>

              <LocaleSwitch />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main class="pt-16">
        <!-- Home -->
        <section class="home min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div class="mx-auto max-w-[30rem] md:max-w-[48rem] lg:max-w-[64rem] px-4">
            <div class="home_content flex flex-col md:flex-row gap-4 md:gap-12 items-center justify-center">
              <!-- 个人图片和移动端社交链接 -->
              <div class="flex items-start justify-between w-full md:w-auto order-first md:order-last pt-4 md:pt-0">
                <!-- 移动端社交链接 -->
                <div class="flex md:hidden flex-col items-center gap-4 scroll-animation fade-up mt-4">
                  <a href="https://github.com/vhjihuang" target="_blank" class="text-xl text-white hover:text-purple-600 transition-all hover:scale-125 will-change-transform">
                    <i class="uil uil-github-alt"></i>
                  </a>
                  <a href="https://github.com/vhjihuang" target="_blank" class="text-xl text-white hover:text-purple-600 transition-all hover:scale-125 will-change-transform">
                    <i class="uil uil-linkedin-alt"></i>
                  </a>
                </div>
                <!-- 个人图片 -->
                <div class="home_img scroll-animation fade-up ml-auto">
                  <svg class="home__blob w-[180px] sm:w-[220px] md:w-[320px] fill-[#6a58d8] transition-transform hover:scale-105 duration-300" viewBox="0 0 200 187" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <mask id="mask0" mask-type="alpha">
                      <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"></path>
                    </mask>
                    <g mask="url(#mask0)">
                      <path d="M190.312 36.4879C206.582 62.1187 201.309 102.826 182.328 134.186C163.346 165.547 130.807 187.559 100.226 186.353C69.6454 185.297 41.0228 161.023 21.7403 129.362C2.45775 97.8511 -7.48481 59.1033 6.67581 34.5279C20.9871 10.1032 59.7028 -0.149132 97.9666 0.00163737C136.23 0.303176 174.193 10.857 190.312 36.4879Z"></path>
                      <image class="home__blob-img w-[200px] sm:w-[220px]" x="0" y="-30" href="./assets/img/cat.png"></image>
                    </g>
                  </svg>
                </div>
              </div>

              <!-- 社交链接 - PC端 -->
              <div class="home_social hidden md:flex flex-col items-center md:items-start scroll-animation fade-up">
                <a href="https://github.com/vhjihuang" target="_blank" class="text-xl text-white hover:text-purple-600 transition-all hover:scale-125 will-change-transform">
                  <i class="uil uil-github-alt"></i>
                </a>
                <a href="https://github.com/vhjihuang" target="_blank" class="text-xl text-white hover:text-purple-600 transition-all hover:scale-125 will-change-transform">
                  <i class="uil uil-linkedin-alt"></i>
                </a>
              </div>

              <!-- 个人介绍 -->
              <div class="home_data scroll-animation fade-up text-center bg-[#0A192F] p-6 md:p-8 rounded-lg shadow-lg">
                <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight text-white">
                  {{ t('home.title') }}
                </h1>
                <h3 class="text-xl sm:text-2xl mb-3 text-white italic">
                  {{ t('home.subtitle') }}
                </h3>
                <p class="text-sm sm:text-base mb-4 text-white">
                  {{ t('home.introductionShort') }}
                </p>
                <a 
                  href="#contact" 
                  class="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all rounded-lg 
                  bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 hover:scale-105"
                >
                  {{ t('home.contactMe') }}
                  <i class="text-lg uil uil-message"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- About -->
        <section class="about py-16">
          <div class="mx-auto max-w-[30rem] md:max-w-[48rem] lg:max-w-[64rem] px-4">
            <h2 class="section_title text-center text-2xl md:text-3xl font-semibold mb-1 scroll-animation fade-up text-white">
              {{ t('about.title') }}
            </h2>
            <span class="section_subtitle text-center text-white block mb-12 scroll-animation fade-up">
              {{ t('about.subtitle') }}
            </span>
            <div class="about_content grid md:grid-cols-[1fr,1fr] gap-12 items-center">
              <!-- 图片 -->
              <div class="about_img relative w-[250px] h-[250px] justify-self-center md:justify-self-auto scroll-animation slide-right">
                <!-- <img 
                  src="/assets/img/about.jpg" 
                  alt="About image"
                  class="w-full rounded-2xl"
                /> -->
                <!-- 装性背景 -->
                <div class="absolute inset-0 border-2 border-purple-600 rounded-2xl -z-10 translate-x-6 translate-y-6 mx-auto"></div>
                <!-- 添加一个空的占位元素来保持尺寸 -->
                <div class="w-full h-full bg-[#0A192F] rounded-2xl"></div>
              </div>

              <!-- 描述部分 -->
              <div class="about_data scroll-animation slide-left">
                <div class="about_description space-y-4 text-gray-300 mb-8">
                  <p>{{ t('about.description') }}</p>
                </div>

                <!-- 经验数据 -->
                <div class="about_info grid grid-cols-3 gap-2 mb-8">
                  <div class="about_box flex flex-col items-center py-3 px-2 bg-[#112240] rounded-lg shadow hover:shadow-md transition-all hover:bg-[#1a2f50]">
                    <i class="about_icon uil uil-award text-xl text-purple-500 mb-1"></i>
                    <h3 class="about_title text-sm font-medium text-white mb-0.5">{{ t('about.years') }}</h3>
                    <span class="about_subtitle text-xs text-gray-400">{{ t('about.experience') }}</span>
                  </div>

                  <div class="about_box flex flex-col items-center py-3 px-2 bg-[#112240] rounded-lg shadow hover:shadow-md transition-all hover:bg-[#1a2f50]">
                    <i class="about_icon uil uil-briefcase-alt text-xl text-purple-500 mb-1"></i>
                    <h3 class="about_title text-sm font-medium text-white mb-0.5">{{ t('about.projects') }}</h3>
                    <span class="about_subtitle text-xs text-gray-400">{{ t('about.completed') }}</span>
                  </div>

                  <div class="about_box flex flex-col items-center py-3 px-2 bg-[#112240] rounded-lg shadow hover:shadow-md transition-all hover:bg-[#1a2f50]">
                    <i class="about_icon uil uil-headphones text-xl text-purple-500 mb-1"></i>
                    <h3 class="about_title text-sm font-medium text-white mb-0.5">{{ t('about.hours') }}</h3>
                    <span class="about_subtitle text-xs text-gray-400">{{ t('about.support') }}</span>
                  </div>
                </div>

                <!-- 下载简历按钮 -->
                <div class="scroll-animation fade-up" style="transition-delay: 0.2s">
                  <!-- <a 
                    href="/assets/pdf/Resume.pdf" 
                    download
                    class="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all hover:scale-105 will-change-transform"
                  >
                    {{ t('about.downloadCV') }}
                    <i class="uil uil-download-alt text-xl"></i>
                  </a> -->
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills -->
        <section class="skills py-16">
          <div class="mx-auto max-w-[30rem] md:max-w-[48rem] lg:max-w-[64rem] px-4">
            <h2 class="section_title text-center text-2xl md:text-3xl font-semibold mb-1 scroll-animation fade-up text-white">
              {{ t('skills.title') }}
            </h2>
            <span class="section_subtitle text-center text-white block mb-12 scroll-animation fade-up">
              {{ t('skills.subtitle') }}
            </span>
            <div class="skills_content grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <!-- 前端技能 -->
              <div class="skills_area scroll-animation slide-right">
                <div 
                  class="skills_header flex items-center mb-8 cursor-pointer select-none"
                  @click="toggleSkills('frontend')"
                >
                  <i class="uil uil-brackets-curly text-3xl text-purple-600 mr-3"></i>
                  <div>
                    <h3 class="skills_title text-lg font-medium text-white">{{ t('skills.frontend.title') }}</h3>
                    <span class="skills_subtitle text-sm text-white">{{ t('skills.frontend.years') }}</span>
                  </div>
                  <i 
                    class="uil ml-auto text-2xl transition-transform duration-300"
                    :class="[frontendOpen ? 'uil-angle-up' : 'uil-angle-down']"
                  ></i>
                </div>

                <div 
                  class="skills_list grid gap-6 overflow-hidden transition-all duration-300"
                  :style="{ maxHeight: frontendOpen ? '1000px' : '0px' }"
                >
                  <div 
                    v-for="skill in frontendSkills" 
                    :key="skill.name"
                    class="skills_data"
                  >
                    <div class="flex justify-between mb-2">
                      <h3 class="skills_name font-medium text-white">{{ skill.name }}</h3>
                      <span class="text-sm text-white">{{ skill.level }}%</span>
                    </div>
                    <div class="skills_bar h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        class="skills_percentage h-full bg-purple-600 rounded-full transition-all duration-1000"
                        :style="{ width: frontendOpen ? `${skill.level}%` : '0%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 后端技能 -->
              <div class="skills_area scroll-animation slide-left">
                <div 
                  class="skills_header flex items-center mb-8 cursor-pointer select-none"
                  @click="toggleSkills('backend')"
                >
                  <i class="uil uil-server-network text-3xl text-purple-600 mr-3"></i>
                  <div>
                    <h3 class="skills_title text-lg font-medium text-white">{{ t('skills.backend.title') }}</h3>
                    <span class="skills_subtitle text-sm text-white">{{ t('skills.backend.years') }}</span>
                  </div>
                  <i 
                    class="uil ml-auto text-2xl transition-transform duration-300"
                    :class="[backendOpen ? 'uil-angle-up' : 'uil-angle-down']"
                  ></i>
                </div>

                <div 
                  class="skills_list grid gap-6 overflow-hidden transition-all duration-300"
                  :style="{ maxHeight: backendOpen ? '1000px' : '0px' }"
                >
                  <div 
                    v-for="skill in backendSkills" 
                    :key="skill.name"
                    class="skills_data"
                  >
                    <div class="flex justify-between mb-2">
                      <h3 class="skills_name font-medium text-white">{{ skill.name }}</h3>
                      <span class="text-sm text-white">{{ skill.level }}%</span>
                    </div>
                    <div class="skills_bar h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        class="skills_percentage h-full bg-purple-600 rounded-full transition-all duration-1000"
                        :style="{ width: backendOpen ? `${skill.level}%` : '0%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Portfolio -->
        <section class="portfolio py-16">
          <div class="mx-auto max-w-[30rem] md:max-w-[48rem] lg:max-w-[64rem] px-4">
            <h2 class="section_title text-center text-2xl md:text-3xl font-semibold mb-1 scroll-animation fade-up text-white">
              {{ t('portfolio.title') }}
            </h2>
            <span class="section_subtitle text-center text-white block mb-12 scroll-animation fade-up">
              {{ t('portfolio.subtitle') }}
            </span>
            
            <!-- 项目展示网格 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-animation fade-up">
              <div v-for="project in projects" :key="project.id" 
                class="project-card bg-[#112240] rounded-lg shadow-lg hover:shadow-xl transition-all hover:bg-[#1a2f50] overflow-hidden group">
                <div class="relative aspect-video overflow-hidden">
                  <img :src="project.image" :alt="project.title" 
                    class="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300">
                </div>
                <div class="p-6">
                  <h3 class="text-lg font-medium text-white mb-2">{{ project.title }}</h3>
                  <p class="text-sm text-gray-400 mb-4">{{ project.description }}</p>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span v-for="tech in project.technologies" :key="tech"
                      class="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                      {{ tech }}
                    </span>
                  </div>
                  <div class="flex justify-center gap-4">
                    <a :href="project.demo" target="_blank" rel="noopener noreferrer"
                      class="text-sm text-white hover:text-purple-400 transition-colors">
                      <i class="uil uil-eye mr-1"></i> Demo
                    </a>
                    <a :href="project.github" target="_blank" rel="noopener noreferrer"
                      class="text-sm text-white hover:text-purple-400 transition-colors">
                      <i class="uil uil-github mr-1"></i> Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact -->
        <section class="contact py-16">
          <div class="mx-auto max-w-[30rem] md:max-w-[48rem] lg:max-w-[64rem] px-4">
            <h2 class="section_title text-center text-2xl md:text-3xl font-semibold mb-1 scroll-animation fade-up text-white">
              {{ t('contact.title') }}
            </h2>
            <span class="section_subtitle text-center text-white block mb-12 scroll-animation fade-up">
              {{ t('contact.subtitle') }}
            </span>

            <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <!-- 联系信息 -->
              <div class="scroll-animation slide-right bg-[#112240] rounded-lg p-6 md:p-8">
                <div class="space-y-6">
                  <div class="flex items-center gap-4 hover:bg-[#1a2f50] p-4 rounded-lg transition-colors">
                    <div class="w-12 h-12 flex items-center justify-center bg-purple-500/20 rounded-lg">
                      <i class="uil uil-phone text-2xl text-purple-400"></i>
                    </div>
                    <div class="text-left">
                      <h3 class="text-sm font-medium text-white">{{ t('contact.call') }}</h3>
                      <p class="text-sm text-gray-400">+86 xxx-xxxx-xxxx</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-4 hover:bg-[#1a2f50] p-4 rounded-lg transition-colors">
                    <div class="w-12 h-12 flex items-center justify-center bg-purple-500/20 rounded-lg">
                      <i class="uil uil-envelope text-2xl text-purple-400"></i>
                    </div>
                    <div class="text-left">
                      <h3 class="text-sm font-medium text-white">{{ t('contact.email') }}</h3>
                      <p class="text-sm text-gray-400">example@example.com</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-4 hover:bg-[#1a2f50] p-4 rounded-lg transition-colors">
                    <div class="w-12 h-12 flex items-center justify-center bg-purple-500/20 rounded-lg">
                      <i class="uil uil-map-marker text-2xl text-purple-400"></i>
                    </div>
                    <div class="text-left">
                      <h3 class="text-sm font-medium text-white">{{ t('contact.location') }}</h3>
                      <p class="text-sm text-gray-400">Guangzhou, China</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 联系表单 -->
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <!-- 回到顶部按��� -->
      <ScrollToTop 
        :show-scroll-top="showScrollTop"
        @scroll-to-top="scrollToTop"
      />
    </div>
  </ErrorBoundary>
  <PerformanceMonitor />
</template>

<style>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.scroll-animation {
  @apply opacity-0 transition-all duration-600 ease-out will-change-transform;
}

.fade-up {
  @apply translate-y-12;
}

.slide-right {
  @apply translate-x-12;
}

.rotate-animation {
  @apply animate-[float_6s_ease-in-out_infinite];
}

.show {
  @apply opacity-100 translate-y-0 translate-x-0;
}
</style>
