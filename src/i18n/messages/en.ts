import type { LocaleMessages } from '../types'

const messages: LocaleMessages = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    portfolio: 'Portfolio',
    contact: 'Contact'
  },
  home: {
    title: 'Hi, I\'m Huang',
    subtitle: 'Full Stack Developer',
    introductionShort: 'I build things for the web',
    contactMe: 'Contact Me',
    scrollDown: 'Scroll down'
  },
  about: {
    title: 'About Me',
    subtitle: 'My introduction',
    description: 'Web developer, with extensive knowledge and years of experience, working in web technologies, delivering quality work. I create successful responsive websites that are fast, easy to use, and built with best practices. The main area of my expertise is front-end development, building small and medium web apps, custom plugins, features, animations, and coding interactive layouts.',
    experience: 'Experience',
    completed: 'Completed',
    support: 'Support',
    years: 'Years',
    hours: '200+',
    projects: 'Projects',
    online: 'Online'
  },
  skills: {
    title: 'Skills & Expertise',
    subtitle: 'My technical level',
    years: 'Years',
    frontend: {
      title: 'Frontend Developer',
      description: 'Expert in building modern web applications with Vue.js, React and other frontend technologies',
      experience: '{count}',
      years: 'Years',
      skills: [
        'Vue.js / React',
        'TypeScript / JavaScript',
        'HTML5 / CSS3',
        'Responsive Design',
        'UI/UX Best Practices'
      ]
    },
    backend: {
      title: 'Backend Developer',
      description: 'Experienced in building scalable backend services and RESTful APIs',
      experience: '{count}',
      years: 'Years',
      skills: [
        'Node.js / Express',
        'Python / Django',
        'Database Design',
        'API Development',
        'Cloud Services'
      ]
    }
  },
  portfolio: {
    title: 'Portfolio',
    subtitle: 'Most recent work',
    demo: 'Demo',
    source: 'Source',
    technologies: 'Technologies used'
  },
  contact: {
    title: 'Contact Me',
    subtitle: 'Get in touch',
    call: 'Call Me',
    email: 'Email',
    location: 'Location',
    form: {
      title: 'Write me your project',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      success: 'Message sent successfully!',
      errors: {
        required: 'Please fill in all fields',
        invalidEmail: 'Please enter a valid email',
        submitError: 'Error sending message. Please try again.'
      }
    }
  },
  theme: {
    light: 'Light Mode',
    dark: 'Dark Mode'
  },
  accessibility: {
    skipToContent: 'Skip to content',
    menuButton: 'Toggle menu',
    themeButton: 'Toggle theme',
    languageButton: 'Change language',
    backToTop: 'Back to top',
    loading: 'Loading'
  },
  meta: {
    title: 'Huang - Full Stack Developer',
    description: 'Personal portfolio website of Huang, a Full Stack Developer specializing in web development.',
    keywords: 'web developer, full stack, portfolio, vue, react, node.js'
  },
  errors: {
    title: 'Oops! Something went wrong',
    retry: 'Try again',
    unknown: 'An unknown error occurred'
  }
}

export default messages 