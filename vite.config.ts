import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons, presetTypography, presetWebFonts } from 'unocss'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'fish-icon.svg', 'vite.svg'],
      manifest: {
        name: 'Bloque Fishing Game',
        short_name: 'FishGame',
        description: 'A fishing game web application',
        theme_color: '#eab308',
        icons: [
          {
            src: 'fish-icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'fish-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
    UnoCSS({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
          provider: 'google',
          fonts: {
            pixel: 'Press Start 2P',
          },
        }),
      ],
      shortcuts: {
        'pixel-border': 'border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]',
        'pixel-button': 'bg-yellow-400 hover:bg-yellow-300 transition-colors px-4 py-2 pixel-border active:translate-y-1 active:translate-x-1 active:shadow-none',
        'pixel-container': 'bg-gray-100 p-4 pixel-border',
      },
      theme: {
        colors: {
          'primary': '#eab308',
          'secondary': '#22c55e',
        },
      },
    }),
  ],
})
