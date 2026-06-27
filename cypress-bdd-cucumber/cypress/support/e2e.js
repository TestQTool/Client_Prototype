import './commands';
import '@shelex/cypress-allure-plugin';

// Global before hook
before(() => {
  cy.log('Starting AG-Helix test suite');
});

// Global after hook
after(() => {
  cy.log('Completed AG-Helix test suite');
});

// Error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  // Log the error for debugging
  console.error('Uncaught exception:', err.message);
  return false;
});

