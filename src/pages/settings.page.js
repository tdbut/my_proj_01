export class SettingsPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.bioInput = page.getByRole('textbox', { name: /short bio/i }); 
    this.saveButton = page.getByRole('button', { name: 'Update Settings' });
  }

  async updateUsername(username) {
    await this.usernameInput.fill(username);
  }

  async updateBio(bio) {
    await this.bioInput.fill(bio);
  }

  async saveSettings() {
    await this.saveButton.click();
  }
}