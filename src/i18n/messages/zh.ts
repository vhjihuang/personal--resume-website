import type { LocaleMessages } from '../types'

const messages: LocaleMessages = {
  nav: {
    home: '首页',
    about: '关于',
    skills: '技能',
    portfolio: '作品',
    contact: '联系'
  },
  home: {
    title: '你好，我是黄',
    subtitle: '全栈开发工程师',
    introductionShort: '我专注于网站开发',
    contactMe: '联系我',
    scrollDown: '向下滚动'
  },
  about: {
    title: '关于我',
    subtitle: '个人简介',
    description: '作为一名全栈开发工程师，我拥有丰富的经验和专业知识，专注于使用现代网络技术提供高质量的开发服务。我擅长创建快速、易用且遵循最佳实践的响应式网站，注重性能优化和用户体验。我的核心专长是前端开发，包括构建中小型 Web 应用、组件库开发、性能优化、动画效果和交互式界面设计。同时在后端开发和云服务部署方面也有丰富经验。',
    experience: '经验',
    completed: '已完成',
    support: '支持',
    years: '年',
    hours: '200+',
    projects: '项目',
    online: '在线'
  },
  skills: {
    title: '专业技能',
    subtitle: '专业水平',
    years: '年',
    frontend: {
      title: '前端开发',
      description: '精通使用 Vue.js、React 等前端技术构建现代网页应用',
      experience: '{count}',
      years: '年',
      skills: [
        'Vue.js / React',
        'TypeScript / JavaScript',
        'HTML5 / CSS3',
        '响应式设计',
        'UI/UX 最佳实践'
      ]
    },
    backend: {
      title: '后端开发',
      description: '擅长构建可扩展的后端服务和 RESTful 接口',
      experience: '{count}',
      years: '年',
      skills: [
        'Node.js / Express',
        'Python / Django',
        '数据库设计',
        'API 开发',
        '云服务'
      ]
    }
  },
  portfolio: {
    title: '作品集',
    subtitle: '最新作品',
    demo: '演示',
    source: '源码',
    technologies: '使用技术'
  },
  contact: {
    title: '联系我',
    subtitle: '保持联系',
    call: '电话',
    email: '邮箱',
    location: '地址',
    form: {
      title: '写下你的项目需求',
      name: '姓名',
      email: '邮箱',
      message: '留言',
      send: '发送消息',
      success: '消息发送成功！',
      errors: {
        required: '请填��所有字段',
        invalidEmail: '请输入有效的邮箱地址',
        submitError: '发送消息失败，请重试。'
      }
    }
  },
  theme: {
    light: '浅色模式',
    dark: '深色模式'
  },
  accessibility: {
    skipToContent: '跳转到内容',
    menuButton: '切换菜单',
    themeButton: '切换主题',
    languageButton: '切换语言',
    backToTop: '返回顶部',
    loading: '加载中'
  },
  meta: {
    title: '黄 - 全栈开发工程师',
    description: '黄的个人作品集网站，专注于全栈网站开发。',
    keywords: '网站开发, 全栈开发, 作品集, vue, react, node.js'
  },
  errors: {
    title: '糟糕！出错了',
    retry: '重试',
    unknown: '发生未知错误'
  }
}

export default messages 