// support/e2e.js
// ─────────────────────────────────────────────────────────────────────────────
// Global Cypress support file
// ─────────────────────────────────────────────────────────────────────────────
import '@shelex/cypress-allure-plugin';

// Custom command for test.step() equivalent
Cypress.Commands.add('step', (description, fn) => {
    cy.log(`**${description}**`);
    if (typeof fn === 'function') {
        return fn();
    }
});

// Preserve cookies across tests if needed
beforeEach(() => {
    Cypress.Cookies.preserveOnce('session_id', 'authToken');
});

