import { createApp } from 'vue'
import './styles/tailwind.css'
import './styles/animations.css'
import './styles/transitions.css'
import App from './App.vue'
import '@iconscout/unicons/css/line.css'
import { i18n } from './i18n'

const app = createApp(App)
app.use(i18n)
app.provide('isDev', import.meta.env.DEV)
app.mount('#app')
