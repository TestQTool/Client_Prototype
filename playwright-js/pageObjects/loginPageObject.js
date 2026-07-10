class LoginPageObject {
  constructor(page) {
    this.page = page;
    
    // Selectors
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
    this.errorMessage = '.oxd-alert-content';
    this.loginPageTitle = '.orangehrm-login-title';
  }

  async navigateToLoginPage() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.page.waitForSelector(this.usernameInput, { state: 'visible' });
  }

  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
    await this.page.waitForTimeout(1000);
  }

  async isErrorMessageDisplayed() {
    try {
      await this.page.waitForSelector(this.errorMessage, { timeout: 5000 });
      return await this.page.isVisible(this.errorMessage);
    } catch (error) {
      return false;
    }
  }

  async getErrorMessageText() {
    if (await this.isErrorMessageDisplayed()) {
      return await this.page.textContent(this.errorMessage);
    }
    return '';
  }

  async isOnLoginPage() {
    try {
      const isVisible = await this.page.isVisible(this.loginPageTitle);
      const currentUrl = this.page.url();
      return isVisible && currentUrl.includes('/auth/login');
    } catch (error) {
      return false;
    }
  }
}

module.exports = { LoginPageObject };