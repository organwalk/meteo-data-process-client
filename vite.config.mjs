import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const elementPlusResolver = ElementPlusResolver({
  importStyle: 'css',
})

export default defineConfig(() => {
  const isTest = process.env.VITEST === 'true'
  const plugins = [vue()]

  if (!isTest) {
    plugins.push(
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [elementPlusResolver],
        vueTemplate: true,
      }),
      Components({
        dirs: [],
        resolvers: [elementPlusResolver],
      }),
    )
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./vitest.setup.js'],
      coverage: {
        reporter: ['text', 'html'],
        include: ['src/**/*.{js,vue}'],
      },
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/vue') || id.includes('node_modules/vue-router') || id.includes('node_modules/pinia')) {
              return 'vendor-vue'
            }

            if (id.includes('node_modules/element-plus') || id.includes('@element-plus')) {
              return 'vendor-element-plus'
            }

            if (id.includes('node_modules/echarts')) {
              return 'vendor-echarts'
            }

            if (id.includes('node_modules/zrender')) {
              return 'vendor-zrender'
            }

            if (id.includes('node_modules/axios')) {
              return 'vendor-axios'
            }

            return undefined
          },
        },
      },
    },
  }
})
