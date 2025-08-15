// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import { defineConfig } from 'vitest/config';
import packageJson from './package.json' with { type: 'json' };
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
   plugins: [
      react(),
      visualizer({
         open: true,
      }),
   ],
   server: {
      open: true,
      port: 3000,
   },
   resolve: {
      alias: {
         '@': path.resolve(__dirname, 'src'),
      },
   },
   test: {
      root: import.meta.dirname,
      name: packageJson.name,
      environment: 'jsdom',
      typecheck: {
         enabled: true,
         tsconfig: path.join(import.meta.dirname, 'tsconfig.json'),
      },
      globals: true,
      watch: false,
      setupFiles: ['./src/setupTests.ts'],
      include: ['src/tests/**/**/*.test.{ts,tsx}'],
   },
   build: {
      minify: 'esbuild',
      sourcemap: true,
      rollupOptions: {
         output: {
            manualChunks: {
               'react-vendors': ['react', 'react-dom'],
               'redux-vendors': ['@reduxjs/toolkit', 'react-redux'],
               'react-router': ['react-router-dom'],
               apollo: ['@apollo/client'],
               graphql: ['graphql'],
               zod: ['zod'],
               'ts-belt': ['@mobily/ts-belt'],
            },
         },
      },
   },
});
