import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goTo() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }
  
  // Assuming this is the landing page
  async verifyLoginSuccess() {
    await this.page.locator('.title').waitFor();
    const pageTitle = await this.page.locator('.title').innerText();
    if (pageTitle === 'Products') {
      console.log('Product page is displayed');
    } else {
      console.log(`Expected Products page but found: ${pageTitle}`);
    }
  }
}