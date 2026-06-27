const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://192.168.10.124:4001',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    retries: {
      runMode: 1,
      openMode: 0
    },
    setupNodeEvents(on, config) {
      allureCypress(on, {
        resultsDir: 'allure-results'
      });
      return config;
    }
  },
  env: {
    BASE_URL: process.env.BASE_URL || 'http://192.168.10.124:4001',
    HEADLESS: process.env.HEADLESS || 'true'
  }
});

