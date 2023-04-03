import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite';
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import';
import { viteMockServe } from 'vite-plugin-mock';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'testTitle',
        }
      }
    }),
    createStyleImportPlugin({
      resolves: [
        VxeTableResolve()
      ],
    }),
    viteMockServe({
      mockPath: 'mock',
      // localEnabled: command === 'serve',
    }),
  ],
  server:{
    host:'0.0.0.0',
    port: '9527',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "src/assets/styles/var.scss";'
      }
    },
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
            require("postcss-px2rem")({
            remUnit: 75
            })
        ]
      }
    }
  }
})
