// cypress/support/pages/loginPage.js
// ─────────────────────────────────────────────────────────────────────────────
// Login Page — Actions and Assertions
// Extends BasePage | Uses locators from pageObjects/loginPage.js
// ─────────────────────────────────────────────────────────────────────────────
import BasePage from './basePage.js';
import {
    emailInput,
    usernameInput,
    passwordInput,
    loginButton,
    loginButtonAlt,
    registerLink,
    errorMessage,
    errorMessageAlt,
    authErrorMessage,
    missingUsernameError,
    missingPasswordError,
    dashboardIndicator,
    loginPageHeading,
    loginFormContainer
} from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
    constructor() {
        super();
    }

    // ── Navigation ────────────────────────────────────────────────────────────
    navigate() {
        const baseUrl = Cypress.env('BASE_URL') || this.testData.baseUrl || 'http://192.168.10.124:4001';
        cy.visit(baseUrl);
        return this.waitForPageLoad();
    }

    // ── Actions ───────────────────────────────────────────────────────────────

    fillUsername(username) {
        cy.get(usernameInput).clear().type(username, { log: false });
    }

    fillEmail(email) {
        cy.get(emailInput).clear().type(email, { log: false });
    }

    fillPassword(password) {
        cy.get(passwordInput).clear().type(password, { log: false });
    }

    clickLogin() {
        cy.get(loginButton).first().click();
        cy.wait(500);
    }

    submitEmptyForm() {
        cy.get(loginButton).first().click();
        cy.wait(300);
    }

    /**
     * Login with credentials from test-data/credentials.csv by role name.
     * Never hardcode credentials — always use getLoginDataByRole().
     */
    loginAs(roleName) {
        const creds = this.getLoginDataByRole(roleName);
        this.navigate();
        this.fillUsername(creds.Username);
        this.fillPassword(creds.Password);
        this.clickLogin();
    }

    /**
     * Login using username and password directly (for negative tests).
     */
    loginWith(username, password) {
        this.navigate();
        if (username) {
            this.fillUsername(username);
        }
        if (password) {
            this.fillPassword(password);
        }
        this.clickLogin();
    }

    /**
     * API-based login using /login endpoint for faster test setup.
     */
    loginViaAPI(username, password) {
        const baseUrl = Cypress.env('BASE_URL') || this.testData.baseUrl || 'http://192.168.10.124:4001';
        return cy.request({
            method: 'POST',
            url: `${baseUrl}/login`,
            body: { username, password },
            failOnStatusCode: false
        });
    }

    // ── Assertions ────────────────────────────────────────────────────────────

    verifyLoginPageLoaded() {
        cy.get(loginFormContainer).should('be.visible');
        cy.url().should('include', '192.168.10.124:4001');
    }

    verifyLoginPageElements() {
        cy.get(usernameInput).should('be.visible');
        cy.get(passwordInput).should('be.visible');
        cy.get(loginButton).should('be.visible');
        cy.get(registerLink).should('be.visible');
    }

    verifyLoginSuccess() {
        cy.url().should('not.include', '/login');
        cy.url().should('include', '192.168.10.124:4001');
    }

    verifyAuthenticationError() {
        cy.get(errorMessage).should('be.visible');
    }

    verifyInvalidCredentialsMessage() {
        cy.contains('Invalid credentials').should('be.visible');
    }

    verifyMissingUsernameError() {
        cy.get(missingUsernameError).should('be.visible');
    }

    verifyMissingPasswordError() {
        cy.get(missingPasswordError).should('be.visible');
    }

    verifyResponseStatus(response, expectedStatus) {
        expect(response.status).to.eq(expectedStatus);
    }

    verifyResponseContainsToken(response) {
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.not.be.empty;
    }

    verifyResponseContainsError(response, errorText) {
        expect(response.body).to.have.property('error');
        if (errorText) {
            expect(response.body.error).to.include(errorText);
        }
    }
}

export default LoginPage;

