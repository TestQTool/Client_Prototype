class LoginPage {
  constructor(page) {
    this.page = page;
    // Locators
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.loginPageContainer = page.locator('.orangehrm-login-container');
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async verifyErrorMessage(expectedMessage) {
    await this.errorMessage.waitFor({ state: 'visible' });
    const actualMessage = await this.errorMessage.textContent();
    return actualMessage.trim() === expectedMessage;
  }

  async verifyOnLoginPage() {
    await this.loginPageContainer.waitFor({ state: 'visible' });
    return await this.loginPageContainer.isVisible();
  }

  async isLoginPageDisplayed() {
    return await this.loginPageContainer.isVisible();
  }
}

export default LoginPage;