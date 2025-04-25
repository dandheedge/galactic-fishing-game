import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons, presetTypography, presetWebFonts } from 'unocss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
