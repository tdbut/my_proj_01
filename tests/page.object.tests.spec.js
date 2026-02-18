import { test, expect } from '../fixtures/realworld.fixtures.js';
import { UserBuilder } from '../src/builders/index.js';
import { ArticleDataBuilder } from '../src/builders/index.js';

test.describe('RealWorld Functional Tests', () => {

    test.beforeEach(async ({ app }) => {
        const user = new UserBuilder().build();
        await app.loginPage.register(user.name, user.email, user.password);
    });

    test('Пользователь может создать статью', async ({ app }) => {
        const article = new ArticleDataBuilder().build();

        await app.homePage.clickNewArticle();
        await app.editorPage.fillArticle(article.title, article.description, article.body);
        await app.editorPage.publish();

        await expect(app.articlePage.title).toHaveText(article.title);
    });

    test('Пользователь может добавить комментарий', async ({ app }) => {
        const article = new ArticleDataBuilder()
            .withTitle(`Article for comment ${Date.now()}`)
            .build();

        await app.homePage.clickNewArticle();
        await app.editorPage.fillArticle(article.title, article.description, article.body);
        await app.editorPage.publish();

        await expect(app.articlePage.title).toBeVisible();

        const commentText = `Test comment ${Date.now()}`;
        await app.articlePage.addComment(commentText);

        await expect(app.articlePage.comments.first()).toContainText(commentText);
    });

    test('Пользователь может отредактировать профиль', async ({ app }) => {
        await app.homePage.clickSettings();
        await expect(app.settingsPage.bioInput).toBeVisible();

        const newBio = `Bio updated ${Date.now()}`;
        await app.settingsPage.updateBio(newBio);
        await app.settingsPage.saveSettings();

        await expect(app.settingsPage.bioInput).toHaveValue(newBio);
    });

    test('Пользователь может поставить лайк статье', async ({ app }) => {
        const article = new ArticleDataBuilder()
            .withTitle(`Article for like ${Date.now()}`)
            .build();

        await app.homePage.clickNewArticle();
        await app.editorPage.fillArticle(article.title, article.description, article.body);
        await app.editorPage.publish();

        await expect(app.articlePage.title).toBeVisible();

        await app.homePage.open();
        await app.homePage.clickGlobalFeed();

        await expect(app.homePage.firstLikeButton).toBeVisible();
        await app.homePage.clickLike();

        await expect(app.homePage.firstLikeButton).toHaveClass(/active/);
    });

    test('Пользователь может редактировать статью', async ({ app }) => {
        const article = new ArticleDataBuilder()
            .withTitle(`Article ${Date.now()}`)
            .build();

        await app.homePage.clickNewArticle();
        await app.editorPage.fillArticle(article.title, article.description, article.body);
        await app.editorPage.publish();

        await expect(app.articlePage.title).toBeVisible();

        await app.articlePage.editArticle();
        const updatedTitle = `Updated ${Date.now()}`;
        await app.editorPage.titleInput.fill(updatedTitle);
        await app.editorPage.update();

        await expect(app.articlePage.title).toHaveText(updatedTitle);
    });

});