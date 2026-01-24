export class ArticlePage {
  constructor(page) {
    this.page = page;
  }

  async getTitle() {
    return this.page.locator('h1').first();
  }

  async addComment(text) {
    await this.page.getByRole('textbox', { name: 'Write a comment' }).fill(text);
    await this.page.getByRole('button', { name: 'Post Comment' }).click();
  }

  async getComments() {
    return this.page.locator('.card-text');
  }

  async deleteArticle() {
    await this.page.getByRole('button', { name: 'Delete Article' }).first().click();
  }
}
