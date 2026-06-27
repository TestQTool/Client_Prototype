// cypress/support/pages/loginPage.js
// ─────────────────────────────────────────────────────────────────────────────
// Login page actions and assertions
// ─────────────────────────────────────────────────────────────────────────────
import BasePage from './basePage.js';
import {
    usernameInput,
    emailInput,
    passwordInput,
    loginButton,
    registerLink,
    pageHeading,
    loginFormContainer,
    errorMessage,
    successMessage,
    invalidCredentialsError,
    missingUsernameError,
    missingPasswordError,
    dashboardIndicator,
    authTokenElement
} from '../pageObjects/loginPage.js';

class LoginPage extends BasePage {
    constructor() {
        super();
        this.loginEndpoint = '/login';
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    navigate() {
        const baseUrl = Cypress.env('BASE_URL') || Cypress.config('baseUrl') || 'http://192.168.10.124:4001';
        cy.visit(baseUrl);
        cy.url().should('include', baseUrl);
    }

    // ── Actions ───────────────────────────────────────────────────────────────

    fillUsername(username) {
        cy.get(usernameInput).clear().type(username);
    }

    fillEmail(email) {
        cy.get(emailInput).clear().type(email);
    }

    fillPassword(password) {
        cy.get(passwordInput).clear().type(password);
    }

    clickLogin() {
        cy.get(loginButton).click();
    }

    clickRegister() {
        cy.get(registerLink).click();
    }

    /**
     * API-based login for faster test execution
     */
    loginViaAPI(username, password) {
        const baseUrl = Cypress.env('BASE_URL') || Cypress.config('baseUrl') || 'http://192.168.10.124:4001';
        return cy.request({
            method: 'POST',
            url: `${baseUrl}${this.loginEndpoint}`,
            body: { username, password },
            failOnStatusCode: false
        });
    }

    /**
     * UI-based login
     */
    login(username, password) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLogin();
    }

    /**
     * Login using role from credentials
     */
    loginAs(roleName) {
        const creds = this.getLoginDataByRole(roleName);
        this.login(creds.Username, creds.Password);
    }

    // ── Assertions ────────────────────────────────────────────────────────────

    verifyLoginPageLoaded() {
        cy.get(loginFormContainer).should('be.visible');
        cy.get(usernameInput).should('be.visible');
        cy.get(passwordInput).should('be.visible');
        cy.get(loginButton).should('be.visible');
        cy.get(registerLink).should('be.visible');
    }

    verifyLoginSuccess() {
        cy.url().should('not.include', '/login');
    }

    verifyDashboardVisible() {
        cy.get(dashboardIndicator, { timeout: 10000 }).should('be.visible');
    }

    verifyInvalidCredentialsError() {
        cy.get(invalidCredentialsError, { timeout: 5000 }).should('be.visible');
    }

    verifyMissingUsernameError() {
        cy.get(missingUsernameError, { timeout: 5000 }).should('be.visible');
    }

    verifyMissingPasswordError() {
        cy.get(missingPasswordError, { timeout: 5000 }).should('be.visible');
    }

    verifyErrorMessage(expectedText) {
        if (expectedText) {
            cy.get(errorMessage).should('contain.text', expectedText);
        } else {
            cy.get(errorMessage).should('be.visible');
        }
    }

    verifyResponseStatus(response, expectedStatus) {
        expect(response.status).to.equal(expectedStatus);
    }

    verifyResponseContainsToken(response) {
        expect(response.body).to.have.property('token');
        expect(response.body.token).to.not.be.empty;
    }

    verifyResponseErrorMessage(response, expectedMessage) {
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.contain(expectedMessage);
    }
}

export default LoginPage;

