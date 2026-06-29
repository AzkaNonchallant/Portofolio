
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,       
      },
      mangle: true,
    },

    
    chunkSizeWarningLimit: 400,

    rollupOptions: {
      output: {
        manualChunks(id) {
         
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }

         
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router'
          }

 
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons'
          }

          
          if (id.includes('node_modules')) {
            return 'vendor-misc'
          }

          if (id.includes('/desktop/')) {
            return 'chunk-desktop'
          }

     
          if (
            id.includes('AboutSection') ||
            id.includes('ProjectSection') ||
            id.includes('ContactSection')
          ) {
            return 'chunk-windows'
          }
        },
      },
    },
  },
})