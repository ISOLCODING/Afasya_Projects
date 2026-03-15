import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
// import compression from 'vite-plugin-compression'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      tailwindcss(),
      react(),
      VitePWA({ 
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Afasya Projects',
          short_name: 'Afasya',
          description: 'Website Company Profile untuk Jasa Pembuatan Website Profesional UMKM Indonesia',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      }),
      // compression()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // Base URL - bisa dikustomisasi via env VITE_BASE_URL
    base: env.VITE_BASE_URL || '/',
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        'lucide-react',
        '@tanstack/react-query',
        '@radix-ui/react-slot',
        '@radix-ui/react-navigation-menu',
        '@radix-ui/react-icons',
        'class-variance-authority'
      ],
      force: true
    },
    server: {
      port: 3000,
      host: true,
      proxy: {
        // Proxy /api → Laravel backend (development only)
        '/api': {
          target: env.VITE_API_URL || 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
        }
      }
    },
    build: {
      target: 'es2020',
      // minify: 'terser',
      cssMinify: true,
      // Output ke dist/ (default)
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['framer-motion', 'react-icons', 'lucide-react'],
            'utils-vendor': ['axios', 'date-fns', 'zod', 'zustand']
          }
        }
      }
    }
  }
})
