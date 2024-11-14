import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /^\/pelicula\/.*$/, to: '/index.html' },
        { from: /./, to: '/index.html' }
      ],
    },
    port: 5173,
    host: true, // Necesario para acceder desde otros dispositivos en la red
    strictPort: true, // Fuerza el uso del puerto especificado
    open: true, // Abre el navegador automáticamente
    cors: true, // Habilita CORS
    proxy: {
      // Configura proxy si necesitas hacer llamadas a APIs externas
      '/api': {
        target: 'https://api.themoviedb.org/3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    watch: {
      usePolling: true, // Mejora la detección de cambios en algunos sistemas
    },
    hmr: {
      overlay: true, // Muestra errores en pantalla durante el desarrollo
    }
  },
  resolve: {
    alias: {
      '@': '/src' // Permite usar @ como alias para la carpeta src
    }
  }
})