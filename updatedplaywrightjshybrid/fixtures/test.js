import { test as base } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export const test = base.extend({
  baseURL: async ({}, use) => {
    await use(process.env.BASE_URL || 'https://parabank.parasoft.com/parabank/index.htm');
  },
  testUsername: async ({}, use) => {
    await use(process.env.TEST_USERNAME || 'testuser');
  },
  testPassword: async ({}, use) => {
    await use(process.env.TEST_PASSWORD || 'testpass');
  }
});

export { expect } from '@playwright/test';

