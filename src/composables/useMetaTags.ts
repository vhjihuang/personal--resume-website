import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface MetaOptions {
  siteName: string
  defaultImage: string
  defaultDescription: string
  baseUrl: string
}

export const useMetaTags = (options: MetaOptions) => {
  const { t, locale } = useI18n()

  const updateMetaTags = (path: string = '') => {
    const title = t('meta.title')
    const description = t('meta.description')
    const image = `${options.baseUrl}${options.defaultImage}`
    const url = `${options.baseUrl}${path}`

    // 更新标题
    document.title = `${title} | ${options.siteName}`

    // 更新 meta 标签
    const metaTags = {
      description: description,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:site_name': options.siteName,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image
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
  }

  // 监听语言变化时更新 meta 标签
  watch(locale, () => {
    updateMetaTags()
  })

  return {
    updateMetaTags
  }
} 