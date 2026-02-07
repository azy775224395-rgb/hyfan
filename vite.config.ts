import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Prioritize the loaded env, fallback to process.env, then empty string
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || ''),
      // We do NOT polyfill the entire process.env object as it causes issues in browser
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
  };
});