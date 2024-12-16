export const CONFIG = {
  animation: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  },
  social: {
    github: 'https://github.com/vhjihuang',
    linkedin: 'https://linkedin.com/in/yourprofile'
  }
} as const

export const SKILLS = {
  frontend: [
    { id: 1, name: 'HTML', level: 90 },
    { id: 2, name: 'CSS', level: 85 },
    { id: 3, name: 'JavaScript', level: 85 },
    { id: 4, name: 'Vue', level: 80 },
    { id: 5, name: 'React', level: 75 },
    { id: 6, name: 'TypeScript', level: 75 }
  ],
  backend: [
    { id: 7, name: 'Node.js', level: 70 },
    { id: 8, name: 'Python', level: 65 },
    { id: 9, name: 'MySQL', level: 70 },
    { id: 10, name: 'MongoDB', level: 65 }
  ]
} as const 