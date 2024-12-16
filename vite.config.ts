import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import type { UserConfig, ConfigEnv, BuildOptions, Plugin, AliasOptions } from 'vite'

interface CustomBuildOptions extends BuildOptions {
  terserOptions?: {
    compress?: {
      drop_console?: boolean
      drop_debugger?: boolean
    }
  }
}

interface CustomUserConfig extends UserConfig {
  build?: CustomBuildOptions
  plugins?: Plugin[]
  resolve?: {
    alias?: AliasOptions
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv): CustomUserConfig => {
  const commonConfig: CustomUserConfig = {
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true,
          reactivityTransform: true
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      target: 'es2015',
      minify: 'terser',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-i18n'],
            'icons': ['@iconscout/unicons']
          }
        }
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }

  if(command === 'build') {
    return {
      ...commonConfig,
      base: '/personal-resume-website',
    }
  }
  
  return {
    ...commonConfig,
    base: '/',
  }
})
