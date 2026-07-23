import { defineConfig } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  timeout: Number(process.env.TEST_TIMEOUT || 30000),
  retries: Number(process.env.TEST_RETRIES || 0),
  use: {
    baseURL: process.env.BASE_URL || '',
    headless: String(process.env.HEADLESS || 'true').toLowerCase() !== 'false',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [['list'], ['html', { outputFolder: 'Reports/html-report', open: 'never' }]]
});
