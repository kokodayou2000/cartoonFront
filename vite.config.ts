import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/

export const OMEN = 'http://10.12.39.67/:8080'
export const LOCAL = 'http://127.0.0.1:8080'

// const SERVER_ADDR = '10.12.0.143'
const LOCAL_ADDR = '0.0.0.0'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    port: 8777,
    host: LOCAL_ADDR,
    // proxy: {
    //   '/api': {
    //     // 这里填写后端地址
    //     target: OMEN,
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, ''),
    //   },
    // },
  },
})
