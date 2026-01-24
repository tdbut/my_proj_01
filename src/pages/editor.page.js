export class EditorPage {
  constructor(page) {
    this.page = page;
  }

  async fillArticle(title, description, body) {
    await this.page.getByRole('textbox', { name: 'Article Title' }).fill(title);
    await this.page.getByRole('textbox', { name: "What's this article about?" }).fill(description);
    await this.page.getByRole('textbox', { name: 'Write your article' }).fill(body);
  }

  async publish() {
    await this.page.getByRole('button', { name: 'Publish Article' }).click();
  }

  async update() {
    await this.page.getByRole('button', { name: 'Update Article' }).click();
  }
}
