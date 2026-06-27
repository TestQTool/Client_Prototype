// cypress/support/e2e.js
// ─────────────────────────────────────────────────────────────────────────────
// Global Cypress support file — loads before every spec
// ─────────────────────────────────────────────────────────────────────────────
import '@shelex/cypress-allure-plugin';
import './commands.js';

// Preserve Cypress.on() event handlers
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  return false;
});

// Custom step command for readable test orchestration
Cypress.Commands.add('step', (message, fn) => {
  cy.log(`**${message}**`);
  if (typeof fn === 'function') {
    return fn();
  }
});

