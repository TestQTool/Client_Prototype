const { test, expect } = require('@playwright/test');
const LeavePage = require('../pageObjects/LeavePage');

test.describe('Leave Module', () => {
    let leavePage;

    test.beforeEach(async ({ page }) => {
        leavePage = new LeavePage(page);
        await page.goto(process.env.BASE_URL || 'https://qentrix.com');
    });

    // ── @smoke tests ─────────────────────────────────────────────────────────
    test('TC-764-001: Verify Leave Module is accessible @smoke @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Verify Leave Module header is visible', async () => {
            await expect(page.locator('h1:has-text("Leave")')).toBeVisible();
        });

        await test.step('Verify page URL contains leave', async () => {
            await expect(page).toHaveURL(/leave/);
        });
    });

    test('TC-764-002: Verify Leave Balance section is displayed @smoke @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Verify Leave Balance section is visible', async () => {
            await expect(page.locator('[data-testid="leave-balance"]')).toBeVisible();
        });

        await test.step('Verify Annual Leave balance is displayed', async () => {
            await expect(page.locator('[data-testid="annual-leave-balance"]')).toBeVisible();
        });
    });

    test('TC-764-003: Verify user can submit a leave request @smoke @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Select Leave Type', async () => {
            await page.locator('select[name="leaveType"]').selectOption('Annual');
        });

        await test.step('Fill Start Date', async () => {
            await page.locator('input[name="startDate"]').fill('2025-02-01');
        });

        await test.step('Fill End Date', async () => {
            await page.locator('input[name="endDate"]').fill('2025-02-03');
        });

        await test.step('Fill Leave Reason', async () => {
            await page.locator('textarea[name="reason"]').fill('Personal vacation');
        });

        await test.step('Submit Leave Request', async () => {
            await page.locator('button[type="submit"]:has-text("Submit")').click();
        });

        await test.step('Verify success message is displayed', async () => {
            await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
        });
    });

    test('TC-764-004: Verify Leave table displays submitted requests @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Verify Leave table is visible', async () => {
            await expect(page.locator('table[data-testid="leave-table"]')).toBeVisible();
        });

        await test.step('Verify table has data rows', async () => {
            const rows = page.locator('table[data-testid="leave-table"] tbody tr');
            await expect(rows.first()).toBeVisible();
        });
    });

    test('TC-764-005: Verify user can filter leaves by status @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Select filter status as Pending', async () => {
            await page.locator('select[name="filterStatus"]').selectOption('Pending');
        });

        await test.step('Click Apply filter button', async () => {
            await page.locator('button:has-text("Apply")').click();
        });

        await test.step('Verify filtered results are displayed', async () => {
            await expect(page.locator('table[data-testid="leave-table"]')).toBeVisible();
        });
    });

    test('TC-764-006: Verify user can view leave details @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Click View button on first leave row', async () => {
            await page.locator('table[data-testid="leave-table"] tbody tr').first().locator('button:has-text("View")').click();
        });

        await test.step('Verify Leave details modal is displayed', async () => {
            await expect(page.locator('[data-testid="leave-details-modal"]')).toBeVisible();
        });
    });

    test('TC-764-007: Verify user can cancel a leave request @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Click Delete button on first leave row', async () => {
            await page.locator('table[data-testid="leave-table"] tbody tr').first().locator('button:has-text("Delete")').click();
        });

        await test.step('Verify confirmation modal is displayed', async () => {
            await expect(page.locator('[data-testid="confirm-delete-modal"]')).toBeVisible();
        });

        await test.step('Confirm deletion', async () => {
            await page.locator('button:has-text("Yes")').click();
        });

        await test.step('Verify success message is displayed', async () => {
            await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
        });
    });

    test('TC-764-008: Verify leave type dropdown has options @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Click on Leave Type dropdown', async () => {
            await page.locator('select[name="leaveType"]').click();
        });

        await test.step('Verify dropdown has multiple options', async () => {
            const options = page.locator('select[name="leaveType"] option');
            const count = await options.count();
            expect(count).toBeGreaterThan(1);
        });
    });

    test('TC-764-009: Verify validation for empty leave form submission @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Click Submit without filling form', async () => {
            await page.locator('button[type="submit"]:has-text("Submit")').click();
        });

        await test.step('Verify error message is displayed', async () => {
            await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
        });
    });

    test('TC-764-010: Verify manager can approve leave request @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Click on Pending Leaves tab', async () => {
            await page.locator('[data-testid="pending-leaves-tab"]').click();
        });

        await test.step('Click Approve button on first pending leave', async () => {
            await page.locator('table[data-testid="leave-table"] tbody tr').first().locator('button:has-text("Approve")').click();
        });

        await test.step('Add approval comments', async () => {
            await page.locator('textarea[name="approvalComments"]').fill('Approved as requested');
        });

        await test.step('Click Confirm button', async () => {
            await page.locator('button:has-text("Confirm")').click();
        });

        await test.step('Verify success message is displayed', async () => {
            await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
        });
    });

    test('TC-764-011: Verify manager can reject leave request @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Click on Pending Leaves tab', async () => {
            await page.locator('[data-testid="pending-leaves-tab"]').click();
        });

        await test.step('Click Reject button on first pending leave', async () => {
            await page.locator('table[data-testid="leave-table"] tbody tr').first().locator('button:has-text("Reject")').click();
        });

        await test.step('Add rejection comments', async () => {
            await page.locator('textarea[name="approvalComments"]').fill('Insufficient leave balance');
        });

        await test.step('Click Confirm button', async () => {
            await page.locator('button:has-text("Confirm")').click();
        });

        await test.step('Verify success message is displayed', async () => {
            await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
        });
    });

    test('TC-764-012: Verify clear filters functionality @regression', async ({ page }) => {
        await test.step('Navigate to Leave Module', async () => {
            await page.locator('a[href*="leave"]').click();
        });

        await test.step('Apply a filter', async () => {
            await page.locator('select[name="filterStatus"]').selectOption('Approved');
            await page.locator('button:has-text("Apply")').click();
        });

        await test.step('Click Clear filters button', async () => {
            await page.locator('button:has-text("Clear")').click();
        });

        await test.step('Verify filters are cleared', async () => {
            await expect(page.locator('select[name="filterStatus"]')).toHaveValue('');
        });
    });
});
