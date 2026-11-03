// Optional: run the app with Vite instead of the bundled esbuild script.
//   npm install && npm run vite:dev
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
});
