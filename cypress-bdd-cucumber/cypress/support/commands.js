// Custom commands for AG-Helix project

/**
 * Login command with credentials from environment or defaults
 */
Cypress.Commands.add('login', (username, password) => {
  const user = username || Cypress.env('VALID_USERNAME') || 'admin';
  const pass = password || Cypress.env('VALID_PASSWORD') || 'admin123';
  const baseUrl = Cypress.env('BASE_URL') || Cypress.config('baseUrl') || 'http://192.168.10.124:4001';

  cy.request({
    method: 'POST',
    url: `${baseUrl}/login`,
    body: { username: user, password: pass },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 200 && response.body.token) {
      window.localStorage.setItem('authToken', response.body.token);
    }
  });
});

/**
 * API request helper with authentication
 */
Cypress.Commands.add('apiRequest', (method, endpoint, body = null) => {
  const baseUrl = Cypress.env('BASE_URL') || Cypress.config('baseUrl') || 'http://192.168.10.124:4001';
  const token = window.localStorage.getItem('authToken');

  const options = {
    method,
    url: `${baseUrl}${endpoint}`,
    failOnStatusCode: false
  };

  if (token) {
    options.headers = { Authorization: `Bearer ${token}` };
  }

  if (body) {
    options.body = body;
  }

  return cy.request(options);
});

/**
 * Wait for element and perform action
 */
Cypress.Commands.add('waitAndClick', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible').click();
});

Cypress.Commands.add('waitAndType', (selector, text, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible').clear().type(text);
});

