import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import allureWriter from '@shelex/cypress-allure-plugin/writer';

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://192.168.10.124:4001',
    specPattern: 'cypress/e2e/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    retries: {
      runMode: 1,
      openMode: 0
    },
    env: {
      VALID_USERNAME: process.env.VALID_USERNAME || 'admin',
      VALID_PASSWORD: process.env.VALID_PASSWORD || 'admin123',
      allureReuseAfterSpec: true
    },
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)]
        })
      );

      return config;
    }
  }
});

