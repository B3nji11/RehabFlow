import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static site: `npm run build` emits plain HTML/CSS/JS into dist/,
// which can be dropped on any static host (Vercel, Netlify, S3, nginx).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, open: true },
  build: { outDir: 'dist' },
})
