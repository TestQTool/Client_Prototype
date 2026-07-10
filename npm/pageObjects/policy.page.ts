import BasePage from './base.page';

class PolicyPage extends BasePage {
  get customerNameInput() {
    return $('input[name="customerName"]');
  }

  get policyTypeDropdown() {
    return $('select[name="policyType"]');
  }

  get coverageAmountInput() {
    return $('input[name="coverageAmount"]');
  }

  get premiumAmountInput() {
    return $('input[name="premiumAmount"]');
  }

  get effectiveDateInput() {
    return $('input[name="effectiveDate"]');
  }

  get submitButton() {
    return $('button[type="submit"]');
  }

  get validationErrorMessage() {
    return $('.error-message');
  }

  get confirmationMessage() {
    return $('.confirmation-message');
  }

  get policyNumberDisplay() {
    return $('.policy-number');
  }

  async fillPolicyForm(data: {
    customerName?: string;
    policyType?: string;
    coverageAmount?: string;
    premiumAmount?: string;
    effectiveDate?: string;
  }) {
    if (data.customerName !== undefined) {
      await this.customerNameInput.setValue(data.customerName);
    }
    if (data.policyType) {
      await this.policyTypeDropdown.selectByVisibleText(data.policyType);
    }
    if (data.coverageAmount) {
      await this.coverageAmountInput.setValue(data.coverageAmount);
    }
    if (data.premiumAmount !== undefined) {
      await this.premiumAmountInput.setValue(data.premiumAmount);
    }
    if (data.effectiveDate) {
      await this.effectiveDateInput.setValue(data.effectiveDate);
    }
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async getValidationError(): Promise<string> {
    await this.validationErrorMessage.waitForDisplayed();
    return await this.validationErrorMessage.getText();
  }

  async getConfirmationMessage(): Promise<string> {
    await this.confirmationMessage.waitForDisplayed();
    return await this.confirmationMessage.getText();
  }

  async getPolicyNumber(): Promise<string> {
    await this.policyNumberDisplay.waitForDisplayed();
    return await this.policyNumberDisplay.getText();
  }

  async getPageLoadTime(): Promise<number> {
    const startTime = Date.now();
    await this.customerNameInput.waitForDisplayed({ timeout: 5000 });
    return Date.now() - startTime;
  }
}

export default new PolicyPage();
