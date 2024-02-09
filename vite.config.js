import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://jayneet639.pythonanywhere.com',
        changeOrigin: false,
        // ws: true,
      },
      '/users': {
        target: 'https://jayneet639.pythonanywhere.com',
        changeOrigin: false,
        // ws: true,
      },
    },
    
  },
});