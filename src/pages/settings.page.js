export class SettingsPage {
  constructor(page) {
    this.page = page;
  }

  async updateUsername(username) {
    await this.page.getByRole('textbox', { name: 'Username' }).clear();
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
  }

  async updateBio(bio) {
    await this.page.getByRole('textbox', { name: 'Short bio' }).clear();
    await this.page.getByRole('textbox', { name: 'Short bio' }).fill(bio);
  }

  async saveSettings() {
    await this.page.getByRole('button', { name: 'Update Settings' }).click();
  }
}
