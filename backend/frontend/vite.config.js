import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/static/',  // Important for Django static files
  build: {
    outDir: '../backend/static', // Output to Django's static folder
    emptyOutDir: true,
    manifest: true,  // Generates manifest.json for Django
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8000',  // Proxy API requests to Django
    }
  }
})