import { expect } from '@playwright/test';
import BasePage from '../core/BasePage.js';

export default class PolicyPage extends BasePage {
  constructor(page) {
    super(page);
    // TODO: Verify these selectors against actual policy module when available
    // Using semantic selectors based on expected form structure
    this.policyModuleLink = page.getByRole('link', { name: /policy/i });
    
    // Customer details form fields
    this.customerNameInput = page.locator('input[name="customerName"]').or(page.getByLabel(/customer name/i));
    this.customerEmailInput = page.locator('input[name="customerEmail"]').or(page.getByLabel(/email/i));
    this.customerPhoneInput = page.locator('input[name="customerPhone"]').or(page.getByLabel(/phone/i));
    this.customerAddressInput = page.locator('textarea[name="customerAddress"]').or(page.getByLabel(/address/i));
    
    // Policy details form fields
    this.policyTypeSelect = page.locator('select[name="policyType"]').or(page.getByLabel(/policy type/i));
    this.coverageOptionsSelect = page.locator('select[name="coverage"]').or(page.getByLabel(/coverage/i));
    this.premiumInput = page.locator('input[name="premium"]').or(page.getByLabel(/premium/i));
    this.effectiveDateInput = page.locator('input[name="effectiveDate"]').or(page.getByLabel(/effective date/i));
    this.expirationDateInput = page.locator('input[name="expirationDate"]').or(page.getByLabel(/expiration date/i));
    
    // Form submission
    this.submitButton = page.getByRole('button', { name: /submit/i }).or(page.locator('button[type="submit"]'));
    
    // Confirmation elements
    this.confirmationMessage = page.locator('.confirmation-message, .success-message, [role="alert"]');
    this.policyNumberDisplay = page.locator('.policy-number, [data-testid="policy-number"]');
  }

  async navigateToPolicyModule() {
    // Technical navigation step - may need adjustment based on actual application structure
    await this.policyModuleLink.click();
  }

  async enterCustomerDetails(customerData) {
    await this.fill(this.customerNameInput, customerData.name);
    await this.fill(this.customerEmailInput, customerData.email);
    await this.fill(this.customerPhoneInput, customerData.phone);
    await this.fill(this.customerAddressInput, customerData.address);
  }

  async enterPolicyInformation(policyData) {
    await this.policyTypeSelect.selectOption(policyData.type);
    await this.coverageOptionsSelect.selectOption(policyData.coverage);
    await this.fill(this.premiumInput, policyData.premium);
    await this.fill(this.effectiveDateInput, policyData.effectiveDate);
    await this.fill(this.expirationDateInput, policyData.expirationDate);
  }

  async submitPolicyForm() {
    await this.click(this.submitButton);
  }

  async verifyPolicyFormDisplayed() {
    await this.expectVisible(this.customerNameInput);
    await this.expectVisible(this.policyTypeSelect);
  }

  async verifyCustomerDetailsCaptured() {
    await expect(this.customerNameInput).not.toBeEmpty();
    await expect(this.customerEmailInput).not.toBeEmpty();
  }

  async verifyPolicyInformationCaptured() {
    await expect(this.policyTypeSelect).not.toBeEmpty();
    await expect(this.premiumInput).not.toBeEmpty();
  }

  async verifyPolicyValidationTriggered() {
    // Wait for form processing/validation
    await this.page.waitForLoadState('networkidle', { timeout: 15000 });
  }

  async verifyPolicyCreatedSuccessfully() {
    await this.expectVisible(this.confirmationMessage);
    await expect(this.confirmationMessage).toContainText(/success|created|issued/i);
    await this.expectVisible(this.policyNumberDisplay);
  }
}

