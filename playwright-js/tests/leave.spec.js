import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe('Leave Module', () => {
    test.beforeEach(async ({ leavePage }) => {
        await leavePage.openApp();
    });

    test('"Leave Module" @smoke @regression', async ({ leavePage }) => {
    });

});