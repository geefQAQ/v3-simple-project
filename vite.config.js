import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      resolves: [
        VxeTableResolve()
      ],
    })
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
