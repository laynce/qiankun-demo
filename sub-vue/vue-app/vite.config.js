import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { qiankunLegancy } from './qiankunLegancy'
import pg from './package.json'

export default defineConfig({
  server: {
    port: 5000
  },
  define: {
    "process.env.vite": true
  },
  plugins: [
    vue(),
    vueJsx(),
    createHtmlPlugin({
      template: '/index.html',
      entry: "/src/main.jsx",
      inject: {
        data: {
          title: 'qinakunvue子应用',
          htmlWebpackPlugin: ''
        }
      }
    }),
    qiankunLegancy(pg.name)
  ]
})
