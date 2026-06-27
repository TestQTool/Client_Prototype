const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://192.168.10.124:4001',
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    specPattern: 'tests/**/*.spec.js',
    supportFile: 'support/e2e.js',
    env: {
      allure: true,
      allureResultsPath: 'allure-results'
    }
  }
});

