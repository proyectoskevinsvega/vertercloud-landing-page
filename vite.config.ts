import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '127.0.0.1',
    port: 3006,
    allowedHosts: ['bravexcolombia.com'],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8082',
        changeOrigin: true,
      },
    },
    hmr: {
      host: 'bravexcolombia.com',
      protocol: 'wss',
    },
  },
  preview: {
    host: '127.0.0.1',
    port: 3006,
    allowedHosts: ['bravexcolombia.com'],
  },
})
