import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    viewport: { width: 402, height: 874 },
  },
  webServer: {
    command:
      'cmd /c "npm run build && npm run preview -- --port 4173 --strictPort --host 127.0.0.1"',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
