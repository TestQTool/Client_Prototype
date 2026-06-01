class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.dashboardHeader = page.locator('h6.oxd-text--h6');
  }

  async navigate(baseUrl) {
    await this.page.goto(baseUrl);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.dashboardHeader.waitFor({ state: 'visible' });
  }

  async isLoggedIn() {
    return await this.dashboardHeader.isVisible();
  }
}

module.exports = { LoginPage };