import WebActions from '../utils/WebActions.js';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

class BasePage extends WebActions {
  constructor(page) {
    super(page);
    this.page = page;
    this.loadTestData();
  }

  loadTestData() {
    try {
      const testDataPath = path.resolve('./utils/testdata.json');
      this.testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
    } catch (error) {
      console.warn('Test data file not found, using empty object');
      this.testData = {};
    }
  }

  getLoginDataByRole(roleName) {
    try {
      const credentialsPath = path.resolve('./test-data/credentials.csv');
      const fileContent = fs.readFileSync(credentialsPath, 'utf-8');
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
      });
      const roleData = records.find(record => record.role === roleName);
      if (!roleData) {
        throw new Error(`Role ${roleName} not found in credentials.csv`);
      }
      return roleData;
    } catch (error) {
      console.error('Error loading credentials:', error.message);
      throw error;
    }
  }
}

export default BasePage;

