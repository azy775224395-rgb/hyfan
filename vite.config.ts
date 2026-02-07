
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
    'process.env': process.env, // Ensure other env vars are passed if needed
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
          utils: ['@google/genai', '@supabase/supabase-js']
        }
      },
    },
    chunkSizeWarningLimit: 1000,
  }
});
