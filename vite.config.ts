
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // @ts-ignore
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(
        env.API_KEY || 
        env.VITE_API_KEY || 
        env.VITE_GEMINI_API_KEY || 
        process.env.API_KEY || 
        ''
      ),
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
      minify: 'esbuild', // Use esbuild for faster and efficient minification
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-ui': ['framer-motion', 'lucide-react'],
            'vendor-utils': ['@google/genai', '@supabase/supabase-js'],
          }
        },
      },
      chunkSizeWarningLimit: 1000,
    }
  };
});
