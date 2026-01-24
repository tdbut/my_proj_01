 export class HomePage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://realworld.qa.guru/');
  }

  async clickNewArticle() {
    await this.page.getByRole('link', { name: 'New Article' }).click();
  }

 async clickSettings() {
  await this.page.goto('https://realworld.qa.guru/#/settings');
  }

  async clickFirstArticle() {
    await this.page.locator('.preview-link').first().click();
  }

  async clickLike() {
    await this.page.locator('.article-preview button').first().click();
  }

  async getLikeCount() {
    return this.page.locator('.article-preview button').first();
  }
}


