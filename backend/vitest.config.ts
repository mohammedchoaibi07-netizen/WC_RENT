import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    setupFiles: ['./test/vitest.setup.ts'],
    environment: 'node',
  },
});
