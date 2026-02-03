
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // تمرير مفتاح الـ API لـ Gemini من البيئة
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    // دعم Google Auth URLs والمتغيرات الأخرى لـ Render
    'process.env.GOOGLE_CLIENT_ID': JSON.stringify(process.env.GOOGLE_CLIENT_ID || '413172724194-1tjqdcb8bv56f4ae1qlsetcr3t5ocvmt.apps.googleusercontent.com'),
    'process.env.NEXTAUTH_URL': JSON.stringify(process.env.NEXTAUTH_URL || 'https://hyfn-czzv.onrender.com'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true // ضروري لـ Render Web Service
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  }
});
