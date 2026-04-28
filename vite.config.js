import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:6000',

      // ✅ Add this
      '/socket.io': {
        target: 'http://localhost:6000',
        ws: true
      }
    }
  }
})