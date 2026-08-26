import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// Static multi-page site: `npm run build` emits plain HTML/CSS/JS into dist/,
// which can be dropped on any static host (Vercel, Netlify, S3, nginx).
//
// Each page is its own HTML entry - no router, no client-side routing, no
// SPA fallback rule needed on the host. Add a page by creating
// <name>/index.html + src/<name>.jsx and adding one line to `input` below.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, open: true },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about/index.html'), // -> /about/
      },
    },
  },
})
