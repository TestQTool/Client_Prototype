import { expect } from '@playwright/test';
import test from '../testFixtures/fixture.js';

test.describe('LoginPageObject', () => {

    test.describe.configure({ mode: 'parallel' });

    test('5: To Test Login Form with Valid Data @smoke @regression', async ({ LoginPageObjectPage }) => {
        await test.step('Navigate to 192.168.10.124:4001', async () => {
            await LoginPageObjectPage.waitForPageLoad();
            await LoginPageObjectPage.navigate();
        });
    });

});