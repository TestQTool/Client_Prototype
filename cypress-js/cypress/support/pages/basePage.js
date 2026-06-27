// cypress/support/pages/basePage.js
// ─────────────────────────────────────────────────────────────────────────────
// BasePage — shared logic for all page classes
// NextGenAI: This class is framework-level. Do NOT modify for client-specific logic.
// ─────────────────────────────────────────────────────────────────────────────

class BasePage {
    constructor() {
        this.testData = this.loadTestData();
        this.loginData = this.loadCredentials();
    }

    /**
     * Load static test data from fixture
     */
    loadTestData() {
        let data = {};
        cy.fixture('testdata.json').then((json) => {
            data = json;
        });
        return data;
    }

    /**
     * Load credentials from CSV fixture
     */
    loadCredentials() {
        let creds = [];
        cy.fixture('credentials.csv').then((csv) => {
            creds = this.parseCSV(csv);
        });
        return creds;
    }

    /**
     * Parse CSV content into array of objects
     */
    parseCSV(csv) {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',');
        return lines.slice(1).map(line => {
            const values = line.split(',');
            const obj = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = values[index]?.trim() || '';
            });
            return obj;
        });
    }

    /**
     * Get credentials for a given role
     */
    getLoginDataByRole(roleName) {
        cy.fixture('credentials.csv').then((csv) => {
            const rows = this.parseCSV(csv);
            const row = rows.find(r => r.RoleName?.trim() === roleName?.trim());
            if (!row) {
                throw new Error(`No credentials found for role: "${roleName}". Check cypress/fixtures/credentials.csv`);
            }
            return this.normalizeCredentialRow(row);
        });
    }

    /**
     * Normalize credential row for consistent property access
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
     * Open application base URL
     */
    openApp() {
        const url = Cypress.env('BASE_URL') || Cypress.config('baseUrl') || 'http://192.168.10.124:4001';
        cy.visit(url);
    }

    /**
     * Wait for page load
     */
    waitForPageLoad() {
        cy.window().should('have.property', 'document');
    }

    /**
     * Generate random alphanumeric string
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

