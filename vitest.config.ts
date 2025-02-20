import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup-tests.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      all: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        './src',
      ),
    },
  },
});
