import WebActions from '../utils/WebActions.js';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

class BasePage {
    constructor(page) {
        this.page = page;
        this.actions = new WebActions(page);
        this.testData = this.loadTestData();
    }

    loadTestData() {
        try {
            const dataPath = path.join(process.cwd(), 'utils', 'testdata.json');
            const data = fs.readFileSync(dataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.warn('Test data file not found, using empty object');
            return {};
        }
    }

    getLoginDataByRole(roleName) {
        try {
            const csvPath = path.join(process.cwd(), 'test-data', 'credentials.csv');
            const fileContent = fs.readFileSync(csvPath, 'utf8');
            const records = parse(fileContent, {
                columns: true,
                skip_empty_lines: true
            });
            return records.find(record => record.role === roleName);
        } catch (error) {
            console.warn('Credentials file not found');
            return null;
        }
    }

    async open(url) {
        return await this.actions.navigateTo(url);
    }

    async waitAndClick(selector) {
        return await this.actions.clickElement(selector);
    }

    async waitAndFill(selector, text) {
        return await this.actions.fillElement(selector, text);
    }

    async waitForPageLoad() {
        return await this.actions.waitForPageLoad();
    }

    async waitforNetworkIdle() {
        return await this.actions.waitForNetworkIdle();
    }

    async isElementVisible(selector) {
        return await this.actions.isVisible(selector);
    }

    async verifyElementText(selector, expectedText) {
        return await this.actions.verifyText(selector, expectedText);
    }

    async verifyElementContainsText(selector, expectedText) {
        return await this.actions.verifyContainsText(selector, expectedText);
    }

    async getUrl() {
        return await this.actions.getCurrentUrl();
    }

    async getCount(selector) {
        return await this.actions.getElementCount(selector);
    }

    async wait(milliseconds = 500) {
        return await this.actions.wait(milliseconds);
    }
}

export default BasePage;

