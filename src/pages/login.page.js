export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://realworld.qa.guru/#/login');
  }

  async login(email, password) {
  await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
  await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  await this.page.getByRole('button', { name: 'Login' }).click();
  await this.page.getByRole('link', { name: 'New Article' }).waitFor();
}
}
