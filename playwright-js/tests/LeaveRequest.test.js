import test from '../testFixtures/fixture.js';

test.describe.parallel('Leave Request Module @regression', () => {

    test('[1569] Verify that employee can submit a leave request with valid details @smoke', async ({ page, loginPage, leaveRequestPage }) => {
        await test.step('Navigate to url "https://www.saucedemo.com/"', async () => {
            await loginPage.navigateToApplication();
        });

        await test.step('Enter username "standard_user" and password "secret_sauce"', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
        });

        await test.step('Select start date and end date', async () => {
            await leaveRequestPage.enterStartDate('2024-06-01');
            await leaveRequestPage.enterEndDate('2024-06-05');
        });

        await test.step('Enter reason for leave and click Submit', async () => {
            await leaveRequestPage.enterReason('Vacation');
            await leaveRequestPage.clickSubmitButton();
        });

        await test.step('Verify leave request submitted successfully and confirmation message displayed', async () => {
            await leaveRequestPage.verifyConfirmationMessage();
        });
    });

    test('[1570] Verify that employee can view submitted leave request status @smoke', async ({ page, loginPage, leaveRequestPage }) => {
        await test.step('Navigate to url "https://www.saucedemo.com/"', async () => {
            await loginPage.navigateToApplication();
        });

        await test.step('Enter username "standard_user" and password "secret_sauce"', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
        });

        await test.step('Locate the submitted leave request', async () => {
            const isVisible = await leaveRequestPage.locateSubmittedLeaveRequest();
            test.expect(isVisible).toBe(true);
        });

        await test.step('Verify status is displayed as Pending, Approved, or Rejected', async () => {
            await leaveRequestPage.verifyLeaveRequestStatus('Pending');
        });
    });

    test('[1571] Verify that system calculates total leave days correctly for single day leave @regression', async ({ page, loginPage, leaveRequestPage }) => {
        await test.step('Navigate to url "https://www.saucedemo.com/"', async () => {
            await loginPage.navigateToApplication();
        });

        await test.step('Enter username "standard_user" and password "secret_sauce"', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
        });

        await test.step('Select same date for start date and end date', async () => {
            await leaveRequestPage.enterStartDate('2024-06-01');
            await leaveRequestPage.enterEndDate('2024-06-01');
        });

        await test.step('Verify total leave days is calculated as 1 day', async () => {
            await leaveRequestPage.verifyTotalLeaveDays('1');
        });
    });

    test('[1572] Verify that employee cannot submit leave request without selecting leave type @regression', async ({ page, loginPage, leaveRequestPage }) => {
        await test.step('Navigate to url "https://www.saucedemo.com/"', async () => {
            await loginPage.navigateToApplication();
        });

        await test.step('Enter username "standard_user" and password "secret_sauce"', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
        });

        await test.step('Select start date and end date and enter reason', async () => {
            await leaveRequestPage.enterStartDate('2024-06-01');
            await leaveRequestPage.enterEndDate('2024-06-05');
            await leaveRequestPage.enterReason('Personal');
        });

        await test.step('Click Submit button', async () => {
            await leaveRequestPage.clickSubmitButton();
        });

        await test.step('Verify validation error displayed indicating leave type is required', async () => {
            await leaveRequestPage.verifyValidationError('leave type is required');
        });
    });

    test('[1573] Verify that employee cannot submit leave request without selecting start date @regression', async ({ page, loginPage, leaveRequestPage }) => {
        await test.step('Navigate to url "https://www.saucedemo.com/"', async () => {
            await loginPage.navigateToApplication();
        });

        await test.step('Enter username "standard_user" and password "secret_sauce"', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
        });

        await test.step('Leave start date empty and select end date', async () => {
            await leaveRequestPage.enterEndDate('2024-06-05');
        });

        await test.step('Click Submit button', async () => {
            await leaveRequestPage.clickSubmitButton();
        });

        await test.step('Verify validation error displayed indicating start date is required', async () => {
            await leaveRequestPage.verifyValidationError('start date is required');
        });
    });

    test('[1574] Verify that employee cannot submit leave request with end date before start date @regression', async ({ page, loginPage, leaveRequestPage }) => {
        await test.step('Navigate to url "https://www.saucedemo.com/"', async () => {
            await loginPage.navigateToApplication();
        });

        await test.step('Enter username "standard_user" and password "secret_sauce"', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
        });

        await test.step('Select end date earlier than start date', async () => {
            await leaveRequestPage.enterStartDate('2024-06-10');
            await leaveRequestPage.enterEndDate('2024-06-05');
        });

        await test.step('Click Submit button', async () => {
            await leaveRequestPage.clickSubmitButton();
        });

        await test.step('Verify validation error displayed indicating end date cannot be before start date', async () => {
            await leaveRequestPage.verifyValidationError('end date cannot be before start date');
        });
    });

    test('[1575] Verify that employee can submit leave request with maximum allowed character length in reason field @regression', async ({ page, loginPage, leaveRequestPage }) => {
        await test.step('Navigate to url "https://www.saucedemo.com/"', async () => {
            await loginPage.navigateToApplication();
        });

        await test.step('Enter username "standard_user" and password "secret_sauce"', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
        });

        await test.step('Enter maximum allowed characters in reason field', async () => {
            await leaveRequestPage.enterMaximumCharactersInReason();
        });

        await test.step('Click Submit button', async () => {
            await leaveRequestPage.clickSubmitButton();
        });

        await test.step('Verify leave request submitted successfully', async () => {
            await leaveRequestPage.verifyConfirmationMessage();
        });
    });

    test('[1576] Verify that employee cannot submit leave request with special characters in reason field @regression', async ({ page, loginPage, leaveRequestPage }) => {
        await test.step('Navigate to url "https://www.saucedemo.com/"', async () => {
            await loginPage.navigateToApplication();
        });

        await test.step('Enter username "standard_user" and password "secret_sauce"', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
        });

        await test.step('Enter special characters in reason field', async () => {
            await leaveRequestPage.enterSpecialCharactersInReason();
        });

        await test.step('Click Submit button', async () => {
            await leaveRequestPage.clickSubmitButton();
        });

        await test.step('Verify validation error displayed or special characters sanitized', async () => {
            await leaveRequestPage.verifyValidationError('invalid characters');
        });
    });

});

