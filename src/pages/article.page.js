export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('h1').first();
    this.commentInput = page.getByRole('textbox', { name: 'Write a comment' });
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    this.comments = page.locator('.card-text');
    this.deleteButton = page.getByRole('button', { name: 'Delete Article' }).first();
    this.editButton = page.getByRole('button', { name: 'Edit Article' }).first();
    this.favoriteButton = page.getByRole('button', { name: 'Favorite' }).first();
  }

  async getTitle() {
     return this.page.locator('h1').first();
  }

  async addComment(text) {
    await this.commentInput.fill(text);
    await this.postCommentButton.click();
  }

  async getComments() {
    return this.comments;
  }

  async deleteArticle() {
    await this.deleteButton.click();
  }

  async editArticle() {
    await this.editButton.click();
  }

  async likeArticle() {
    await this.favoriteButton.click();
  }
}

