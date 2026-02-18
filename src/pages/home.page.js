export class HomePage {
    constructor(page) {
        this.page = page;
        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
        this.globalFeedButton = page.getByRole('button', { name: 'Global Feed' });
        this.firstArticle = page.locator('.preview-link').first();
        this.firstLikeButton = page.locator('.article-preview button').first();
    }

    async open() {
        await this.page.goto('/');
    }

    async clickNewArticle() {
        await this.newArticleLink.click();
    }

    async clickGlobalFeed() {
        await this.globalFeedButton.click();
    }

    async clickFirstArticle() {
        await this.firstArticle.click();
    }

    async clickLike() {
        await this.firstLikeButton.click();
    }

    async getLikeCount() {
        return this.firstLikeButton;
    }

    async clickSettings() {
        await this.page.goto('/#/settings');
    }
}
      