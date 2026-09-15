import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Root-level username.github.io site, not a project page — must stay '/', never a subpath.
  base: '/',
  plugins: [react()],
})
