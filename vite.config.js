import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/Product': path.resolve(__dirname, './src/Product'),
      '@/Shared': path.resolve(__dirname, './src/Shared'),
      '@/UI': path.resolve(__dirname, './src/UI'),
    },
  },
  optimizeDeps: {
    include: ['rxjs'],
  },
})
