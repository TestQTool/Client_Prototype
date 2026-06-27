// support/commands.js
// ─────────────────────────────────────────────────────────────────────────────
// Custom Cypress commands
// ─────────────────────────────────────────────────────────────────────────────

// Example: Login command
Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('BASE_URL')}/login`,
        body: { username, password }
    }).then(response => {
        window.localStorage.setItem('authToken', response.body.token);
    });
});

// Example: API request with auth token
Cypress.Commands.add('authenticatedRequest', (method, url, body = {}) => {
    const token = window.localStorage.getItem('authToken');
    return cy.request({
        method,
        url: `${Cypress.env('BASE_URL')}${url}`,
        headers: { Authorization: `Bearer ${token}` },
        body,
        failOnStatusCode: false
    });
});

