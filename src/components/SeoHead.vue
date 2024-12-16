<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n({
  useScope: 'global'
})

const props = defineProps<{
  title?: string
  description?: string
  image?: string
  url?: string
}>()

const metaTitle = computed(() => props.title || t('meta.title'))
const metaDescription = computed(() => {
  try {
    return t('meta.description')
  } catch {
    return t('meta.description', {}, { locale: 'en' })
  }
})
const metaImage = computed(() => props.image || '/assets/img/og-image.jpg')
const metaUrl = computed(() => props.url || window.location.href)

const updateMetaTags = () => {
  // 更新标题
  document.title = metaTitle.value

  // 更新或创建 meta 标签
  const metaTags = {
    'description': metaDescription.value,
    'og:type': 'website',
    'og:url': metaUrl.value,
    'og:title': metaTitle.value,
    'og:description': metaDescription.value,
    'og:image': metaImage.value,
    'twitter:card': 'summary_large_image',
    'twitter:url': metaUrl.value,
    'twitter:title': metaTitle.value,
    'twitter:description': metaDescription.value,
    'twitter:image': metaImage.value,
    'og:locale': locale.value
  }

  Object.entries(metaTags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[property="${name}"]`) ||
               document.querySelector(`meta[name="${name}"]`)
    
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute(name.startsWith('og:') ? 'property' : 'name', name)
      document.head.appendChild(meta)
    }
    
    meta.setAttribute('content', content)
  })

  // 更新语言标签
  let link = document.querySelector(`link[rel="alternate"][hreflang="${locale.value}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'alternate')
    document.head.appendChild(link)
  }
  link.setAttribute('href', metaUrl.value)
  link.setAttribute('hreflang', locale.value)
}

// 监听属性变化
watch([metaTitle, metaDescription, metaImage, metaUrl, locale], () => {
  updateMetaTags()
})

// 初始化
onMounted(() => {
  updateMetaTags()
})
</script>

<template>
  <div class="hidden" aria-hidden="true"></div>
</template> 