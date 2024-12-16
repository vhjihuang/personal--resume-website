import { DefineLocaleMessage } from 'vue-i18n'

declare module 'vue-i18n' {
  // 定义消息模式以获得类型检查和自动完成
  export interface DefineLocaleMessage {
    nav: {
      home: string
      about: string
      skills: string
      portfolio: string
      contact: string
    }
    home: {
      title: string
      subtitle: string
      introductionShort: string
      contactMe: string
    }
    about: {
      title: string
      subtitle: string
      description: string
      years: string
      experience: string
      projects: string
      completed: string
      hours: string
      support: string
      downloadCV: string
    }
    skills: {
      title: string
      subtitle: string
      frontend: {
        title: string
        years: string
      }
      backend: {
        title: string
        years: string
      }
    }
    portfolio: {
      title: string
      subtitle: string
      viewMore: string
    }
    contact: {
      title: string
      subtitle: string
      call: string
      email: string
      location: string
      form: {
        name: string
        email: string
        message: string
        send: string
      }
    }
  }
} 