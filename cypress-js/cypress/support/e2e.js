// cypress/support/e2e.js
// ─────────────────────────────────────────────────────────────────────────────
// Global support file loaded before all test files
// ─────────────────────────────────────────────────────────────────────────────
import 'allure-cypress';

// Custom commands
Cypress.Commands.add('step', (message, fn) => {
    cy.log(`**${message}**`);
    return fn();
});

// Preserve cookies across tests if needed
Cypress.Cookies.defaults({
    preserve: ['session_id', 'token']
});

