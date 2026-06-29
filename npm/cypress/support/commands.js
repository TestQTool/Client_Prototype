// Custom commands for login functionality

Cypress.Commands.add('visitLoginPage', () => {
  const baseUrl = Cypress.config('baseUrl') || Cypress.env('BASE_URL');
  cy.visit(`${baseUrl}/login`);
});

Cypress.Commands.add('login', (username, password) => {
  cy.visitLoginPage();
  cy.get('[data-testid="username"], #username, input[name="username"]').type(username);
  cy.get('[data-testid="password"], #password, input[name="password"]').type(password);
  cy.get('[data-testid="login-button"], button[type="submit"]').click();
});

Cypress.Commands.add('loginWithValidCredentials', () => {
  cy.fixture('loginData').then((data) => {
    cy.login(data.validCredentials.username, data.validCredentials.password);
  });
});

Cypress.Commands.add('tab', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).trigger('keydown', { keyCode: 9, which: 9 });
});

