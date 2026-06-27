// cypress/support/commands.js
// ─────────────────────────────────────────────────────────────────────────────
// Custom Cypress commands — reusable across all specs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Custom command to fill a field and verify the value.
 */
Cypress.Commands.add('fillAndVerify', (selector, value) => {
  cy.get(selector).clear().type(value);
  cy.get(selector).should('have.value', value);
});

/**
 * Custom command to click and wait for navigation.
 */
Cypress.Commands.add('clickAndWait', (selector, waitTime = 500) => {
  cy.get(selector).click();
  cy.wait(waitTime);
});

/**
 * Custom command to verify element visibility with timeout.
 */
Cypress.Commands.add('shouldBeVisibleWithin', (selector, timeout = 5000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

/**
 * Custom command to verify URL contains expected fragment.
 */
Cypress.Commands.add('verifyUrlContains', (fragment) => {
  cy.url().should('include', fragment);
});

