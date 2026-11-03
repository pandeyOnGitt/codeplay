// Optional: run the app with Vite instead of the bundled esbuild script.
//   npm install && npm run vite:dev
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = (env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
  return {
    plugins: [react(), tailwindcss()],
    base: './',
    define: {
      'process.env.VITE_API_URL': JSON.stringify(apiUrl),
    },
  };
});
