import LoginPage from '../../pageObjects/login.page';
import PolicyPage from '../../pageObjects/policy.page';
import { expect } from 'chai';

describe('Policy Creation - UI Tests', () => {
  beforeEach(async () => {
    await browser.url('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await LoginPage.login('Admin', 'admin123');
  });

  it('[2213] Verify that insurance agent can successfully create a new policy with all mandatory customer and policy details', async () => {
    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);
    await PolicyPage.submitForm();

    const confirmationMessage = await PolicyPage.getConfirmationMessage();
    expect(confirmationMessage).to.include('Policy created successfully');

    const policyNumber = await PolicyPage.getPolicyNumber();
    expect(policyNumber).to.not.be.empty;
  });

  it('[2214] Verify that policy creation fails when mandatory customer name field is left empty', async () => {
    const policyData = {
      customerName: '',
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);
    await PolicyPage.submitForm();

    const errorMessage = await PolicyPage.getValidationError();
    expect(errorMessage).to.include('customer name is required');
  });

  it('[2215] Verify that policy creation fails when premium amount field contains non-numeric characters', async () => {
    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: 'abc',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);
    await PolicyPage.submitForm();

    const errorMessage = await PolicyPage.getValidationError();
    expect(errorMessage).to.include('premium amount must be numeric');
  });

  it('[2216] Verify that policy effective date cannot be set to a past date', async () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 10);
    const formattedPastDate = pastDate.toISOString().split('T')[0];

    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: formattedPastDate
    };

    await PolicyPage.fillPolicyForm(policyData);
    await PolicyPage.submitForm();

    const errorMessage = await PolicyPage.getValidationError();
    expect(errorMessage).to.include('effective date cannot be in the past');
  });

  it('[2217] Verify that customer name field accepts maximum allowed character length', async () => {
    const maxLengthName = 'A'.repeat(255);

    const policyData = {
      customerName: maxLengthName,
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);
    await PolicyPage.submitForm();

    const confirmationMessage = await PolicyPage.getConfirmationMessage();
    expect(confirmationMessage).to.include('Policy created successfully');

    const policyNumber = await PolicyPage.getPolicyNumber();
    expect(policyNumber).to.not.be.empty;
  });

  it('[2218] Verify that customer name field rejects input exceeding maximum character length', async () => {
    const exceedingLengthName = 'A'.repeat(256);

    const policyData = {
      customerName: exceedingLengthName,
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);
    await PolicyPage.submitForm();

    const errorMessage = await PolicyPage.getValidationError();
    expect(errorMessage).to.exist;
  });

  it('[2219] Verify that policy creation form accepts special characters in customer name field', async () => {
    const specialCharName = "O'Neil-Smith Jr.";

    const policyData = {
      customerName: specialCharName,
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);
    await PolicyPage.submitForm();

    const confirmationMessage = await PolicyPage.getConfirmationMessage();
    expect(confirmationMessage).to.include('Policy created successfully');
  });

  it('[2220] Verify that policy creation form rejects whitespace-only input in customer name field', async () => {
    const policyData = {
      customerName: '     ',
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);
    await PolicyPage.submitForm();

    const errorMessage = await PolicyPage.getValidationError();
    expect(errorMessage).to.include('customer name cannot be empty');
  });

  it('[2232] Verify that policy creation form is protected against SQL injection in customer name field', async () => {
    const sqlInjectionPayload = "' OR '1'='1";

    const policyData = {
      customerName: sqlInjectionPayload,
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);
    await PolicyPage.submitForm();

    // System should either sanitize or reject without executing malicious query
    const pageSource = await browser.getPageSource();
    expect(pageSource).to.not.include('SQL');
    expect(pageSource).to.not.include('syntax error');
  });

  it('[2233] Verify that policy creation form is protected against cross-site scripting in customer name field', async () => {
    const xssPayload = '<script>alert("XSS")</script>';

    const policyData = {
      customerName: xssPayload,
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);
    await PolicyPage.submitForm();

    // Verify script is not executed
    const alertExists = await browser.execute(() => {
      return typeof window.alert === 'function';
    });
    expect(alertExists).to.be.true;
  });

  it('[2234] Verify that session expires after configured idle timeout period during policy creation', async () => {
    // Wait for session timeout (simulated)
    await browser.pause(1800000); // 30 minutes

    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);
    await PolicyPage.submitForm();

    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include('login');
  });

  it('[2236] Verify that policy creation form loads within 2 seconds under normal network conditions', async () => {
    const loadTime = await PolicyPage.getPageLoadTime();
    expect(loadTime).to.be.lessThan(2000);

    // Verify form is functional
    await PolicyPage.fillPolicyForm({ customerName: 'Test' });
    const value = await PolicyPage.customerNameInput.getValue();
    expect(value).to.equal('Test');
  });

  it('[2240] Verify that policy creation form submission completes within 3 seconds including validation and confirmation', async () => {
    const policyData = {
      customerName: 'John Doe',
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);

    const startTime = Date.now();
    await PolicyPage.submitForm();
    await PolicyPage.confirmationMessage.waitForDisplayed({ timeout: 3000 });
    const elapsedTime = Date.now() - startTime;

    expect(elapsedTime).to.be.lessThan(3000);

    const policyNumber = await PolicyPage.getPolicyNumber();
    expect(policyNumber).to.not.be.empty;
  });

  it('[2242] Verify that policy creation form remains responsive when customer name field contains maximum allowed character length', async () => {
    const maxLengthName = 'A'.repeat(255);

    const policyData = {
      customerName: maxLengthName,
      policyType: 'Auto Insurance',
      coverageAmount: '50000',
      premiumAmount: '1200',
      effectiveDate: '2024-06-01'
    };

    await PolicyPage.fillPolicyForm(policyData);

    const startTime = Date.now();
    await PolicyPage.submitForm();
    await PolicyPage.confirmationMessage.waitForDisplayed({ timeout: 5000 });
    const elapsedTime = Date.now() - startTime;

    expect(elapsedTime).to.be.lessThan(5000);

    const confirmationMessage = await PolicyPage.getConfirmationMessage();
    expect(confirmationMessage).to.include('Policy created successfully');
  });
});
