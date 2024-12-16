// 基础类型定义
export interface BaseItem {
  id: string | number
  name: string
}

// 技能类型
export interface Skill extends BaseItem {
  level: number
  category: 'frontend' | 'backend'
}

// 项目类型
export interface Project extends BaseItem {
  description: string
  image: string
  technologies: string[]
  demo: string
  github: string
}

// 菜单项类型
export interface MenuItem {
  id: string
  label: () => string
  icon?: string
}

// 表单类型
export interface ContactForm {
  name: string
  email: string
  message: string
} 