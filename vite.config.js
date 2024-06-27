import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const devEndpoint = 'http://localhost:3003'
const productionEndpoint = 'https://fullstack-open-blog.onrender.com'
const baseEndpoint = process.env.NODE_ENV === 'test' ? devEndpoint : productionEndpoint

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: baseEndpoint,
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
  }
})
