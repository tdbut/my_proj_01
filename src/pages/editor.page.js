export class EditorPage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
    this.descriptionInput = page.getByRole('textbox', { name: "What's this article about?" });
    this.bodyInput = page.getByRole('textbox', { name: 'Write your article' });
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.updateButton = page.getByRole('button', { name: 'Update Article' });
  }

  async fillArticle(title, description, body) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);
  }

  async publish() {
    await this.publishButton.click();
  }

  async update() {
    await this.updateButton.click();
  }
}
