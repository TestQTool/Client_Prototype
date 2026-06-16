import { CommonActions } from "../utils/WebActions.js";
import fs from "fs";
import { parse } from "csv-parse/sync";

/**
 * BasePage — extends CommonActions with test data loading.
 * All page classes extend this.
 * 
 * NextGenAI: This class is framework-level. Do NOT modify for client-specific logic.
 * Client-specific behavior goes in the feature page class.
 */
class BasePage extends CommonActions {
    constructor(page) {
        super(page);

        // Load static test data (expected values, messages, URLs)
        const testdataPath = "./utils/testdata.json";
        this.testData = fs.existsSync(testdataPath)
            ? JSON.parse(fs.readFileSync(testdataPath, "utf-8"))
            : {};

        // Load credentials from CSV
        const credPath = "./test-data/credentials.csv";
        this.loginData = fs.existsSync(credPath)
            ? parse(fs.readFileSync(credPath), { columns: true, skip_empty_lines: true })
            : [];
    }

    /**
     * Get credentials for a given role.
     * @param {string} roleName — must match RoleName column in credentials.csv
     * @returns {{ Username, Password, FullName }}
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
    async getAllUsers() {
        return this.loginData.map(row => this.normalizeCredentialRow(row));
    }

    /**
     * Open the application base URL from env or testdata.
     */
    async openApp() {
        const url = process.env.BASE_URL || this.testData.baseUrl || "http://localhost:3000";
        await super.open(url);
        return await super.waitForPageLoad();
    }

    /**
     * Normalize CSV credential rows so generated page classes can use either
     * framework column names or common lower-case aliases.
     */
    normalizeCredentialRow(row = {}) {
        const normalized = {
            ...row,
            username: row.Username?.trim() || row.username?.trim() || "",
            password: row.Password?.trim() || row.password?.trim() || "",
            fullName: row.FullName?.trim() || row.fullName?.trim() || "",
            roleName: row.RoleName?.trim() || row.roleName?.trim() || "",
        };
        normalized.Username = normalized.Username || normalized.username;
        normalized.Password = normalized.Password || normalized.password;
        normalized.FullName = normalized.FullName || normalized.fullName;
        normalized.RoleName = normalized.RoleName || normalized.roleName;
        return normalized;
    }
}

export default BasePage;
