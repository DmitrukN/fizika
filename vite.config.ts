import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    // KaTeX — половина бандла; 503 КБ сырых, 153 КБ gzip. Это осознанная цена
    // за набор формул без картинок, а не забытый код.
    chunkSizeWarningLimit: 600,
  },
});
