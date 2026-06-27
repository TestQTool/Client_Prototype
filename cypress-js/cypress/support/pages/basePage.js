// cypress/support/pages/basePage.js
// ─────────────────────────────────────────────────────────────────────────────
// BasePage — Parent class for all page objects
// Provides test data loading and common utilities
// NextGenAI: This is framework-level. Do NOT modify for client-specific logic.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

class BasePage {
    constructor() {
        // Load static test data (expected values, messages, URLs)
        const testdataPath = path.resolve('cypress/fixtures/testdata.json');
        this.testData = fs.existsSync(testdataPath)
            ? JSON.parse(fs.readFileSync(testdataPath, 'utf-8'))
            : {};

        // Load credentials from CSV
        const credPath = path.resolve('test-data/credentials.csv');
        this.loginData = fs.existsSync(credPath)
            ? parse(fs.readFileSync(credPath, 'utf-8'), { columns: true, skip_empty_lines: true })
            : [];
    }

    /**
     * Get credentials for a given role.
     * @param {string} roleName — must match RoleName column in credentials.csv
     * @returns {{ Username, Password, FullName, RoleName }}
     */
    getLoginDataByRole(roleName) {
        const row = this.loginData.find(r => r.RoleName?.trim() === roleName?.trim());
        if (!row) {
            throw new Error(`No credentials found for role: "${roleName}". Check test-data/credentials.csv`);
        }
        return this.normalizeCredentialRow(row);
    }

    /**
     * Get all users from credentials CSV.
     */
    getAllUsers() {
        return this.loginData.map(row => this.normalizeCredentialRow(row));
    }

    /**
     * Open the application base URL from env or testdata.
     */
    openApp() {
        const url = Cypress.env('BASE_URL') || this.testData.baseUrl || 'http://192.168.10.124:4001';
        cy.visit(url);
        return this.waitForPageLoad();
    }

    /**
     * Wait for page load (Cypress handles this automatically, but kept for API consistency).
     */
    waitForPageLoad() {
        cy.document().should('have.property', 'readyState', 'complete');
        return cy.wait(200);
    }

    /**
     * Normalize CSV credential rows.
     */
    normalizeCredentialRow(row = {}) {
        const normalized = {
            ...row,
            username: row.Username?.trim() || row.username?.trim() || '',
            password: row.Password?.trim() || row.password?.trim() || '',
            fullName: row.FullName?.trim() || row.fullName?.trim() || '',
            roleName: row.RoleName?.trim() || row.roleName?.trim() || ''
        };
        normalized.Username = normalized.Username || normalized.username;
        normalized.Password = normalized.Password || normalized.password;
        normalized.FullName = normalized.FullName || normalized.fullName;
        normalized.RoleName = normalized.RoleName || normalized.roleName;
        return normalized;
    }

    /**
     * Generate random alphanumeric string.
     */
    generateAlphaNumeric(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}

export default BasePage;

