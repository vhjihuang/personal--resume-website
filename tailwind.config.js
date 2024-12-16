/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
      },
      fontSize: {
        'mobile-xs': '0.75rem',    // 12px
        'mobile-sm': '0.875rem',   // 14px
        'mobile-base': '1rem',     // 16px
        'mobile-lg': '1.125rem',   // 18px
        'mobile-xl': '1.25rem',    // 20px
      },
      spacing: {
        'mobile-4': '1rem',
        'mobile-6': '1.5rem',
        'mobile-8': '2rem',
        'mobile-12': '3rem',
      },
      screens: {
        'xs': '375px',    // 小型手机
        'sm': '640px',    // 平板和大型手机
        'md': '768px',    // 小型笔记本
        'lg': '1024px',   // 桌面显示器
        'xl': '1280px',   // 大型显示器
        '2xl': '1536px'   // 超大显示器
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      height: {
        'screen-safe': ['100vh', '100dvh'],
        'screen-small': ['100vh', '100svh'],
        'screen-large': ['100vh', '100lvh'],
      },
      maxWidth: {
        'mobile': '440px',
        'tablet': '640px',
      },
      zIndex: {
        'mobile-nav': 1000,
        'mobile-modal': 1100,
      },
      animation: {
        'mobile-slide-up': 'slide-up 0.3s ease-out',
        'mobile-slide-down': 'slide-down 0.3s ease-out',
        'mobile-fade': 'fade 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'scale': 'scale 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'fade': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scale': {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        'pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        'bounce': {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        }
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        '200': '200ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'theme': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

