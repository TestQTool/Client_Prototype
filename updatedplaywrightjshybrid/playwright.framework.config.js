import { defineConfig } from '@playwright/test';
import applicationConfig from './playwright.config.js';

export default defineConfig({
  ...applicationConfig,
  testDir: './framework-tests'
});
