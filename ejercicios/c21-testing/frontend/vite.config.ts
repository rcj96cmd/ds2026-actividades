import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // En Docker sobre Windows los cambios de archivos no llegan como eventos
    watch: { usePolling: true },
  },
})
