import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import { copyFileSync } from 'fs';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  dotenv.config();
  mode = process.env.NODE_ENV || 'development';
  console.info(`Run with mode: ${mode}`);
  if (mode !== 'development') {
    console.info(`Sourcing ENV from template in: ${mode}`);
    copyFileSync('.env.example', '.env');
  }
  return {
    build: {
      target: 'esnext',
      chunkSizeWarningLimit: 300,
      rollupOptions: {
        output: {
          strict: true,
          manualChunks: {
            base: ['react'],
            dom: ['react-dom'],
            router: ['react-router-dom'],
            ui: ['react-hook-form', 'react-i18next', 'framer-motion'],
            utils: ['moment', 'markdown-it', 'react-google-recaptcha-v3'],
          },
        },
      },
    },
    plugins: [
      tsconfigPaths(),
      createHtmlPlugin({
        minify: true,
      }),
      viteCompression(),
      react(),
    ],
    define: {
      'process.env': JSON.stringify(process.env),
    },
    envDir: '.env',
    server: {
      port: Number(process.env.PORT),
    },
    preview: {
      port: Number(process.env.PORT),
    },
  };
});
