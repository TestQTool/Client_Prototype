import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;

  private selectors = {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button[type="submit"]'
  };

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async enterCredentials(username: string, password: string) {
    await this.page.fill(this.selectors.usernameInput, username);
    await this.page.fill(this.selectors.passwordInput, password);
  }

  async clickLogin() {
    await this.page.click(this.selectors.loginButton);
  }

  async login(url: string, username: string, password: string) {
    await this.navigate(url);
    await this.enterCredentials(username, password);
    await this.clickLogin();
  }
}
