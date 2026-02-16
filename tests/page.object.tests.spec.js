import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page.js';
import { HomePage } from '../src/pages/home.page.js';
import { EditorPage } from '../src/pages/editor.page.js';
import { ArticlePage } from '../src/pages/article.page.js';
import { SettingsPage } from '../src/pages/settings.page.js';

test.describe('RealWorld Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    const id = Date.now();
    const name = 'User' + id;
    const email = 'user' + id + '@test.com';
    const pass = '12345';

    await loginPage.register(name, email, pass);
  });

  test('Пользователь может создать статью', async ({ page }) => {
    const homePage = new HomePage(page);
    const editorPage = new EditorPage(page);
    const articlePage = new ArticlePage(page);

    await homePage.clickNewArticle();

    const title = 'Test Article ' + Date.now();
    await editorPage.fillArticle(title, 'Description', 'Article body text');
    await editorPage.publish();

    await expect(articlePage.title).toHaveText(title);
  });

  test('Пользователь может добавить комментарий', async ({ page }) => {
    const homePage = new HomePage(page);
    const editorPage = new EditorPage(page);
    const articlePage = new ArticlePage(page);

    await homePage.clickNewArticle();
    const title = 'Article for comment ' + Date.now();
    await editorPage.fillArticle(title, 'Description', 'Body');
    await editorPage.publish();

    await expect(articlePage.title).toBeVisible();

    const commentText = 'Test comment ' + Date.now();
    await articlePage.addComment(commentText);

    await expect(articlePage.comments.first()).toContainText(commentText);
  });

  test('Пользователь может отредактировать профиль', async ({ page }) => {
    const homePage = new HomePage(page);
    const settingsPage = new SettingsPage(page);

    await homePage.clickSettings();
    await expect(settingsPage.bioInput).toBeVisible();

    const newBio = 'Bio updated ' + Date.now();
    await settingsPage.updateBio(newBio);
    await settingsPage.saveSettings();

    await expect(settingsPage.bioInput).toHaveValue(newBio);
  });

  test('Пользователь может поставить лайк статье', async ({ page }) => {
  const homePage = new HomePage(page);
  const editorPage = new EditorPage(page);
  const articlePage = new ArticlePage(page);

  await homePage.clickNewArticle();
  const title = 'Article for like ' + Date.now();
  await editorPage.fillArticle(title, 'Description', 'Body');
  await editorPage.publish();

  await expect(articlePage.title).toBeVisible();

  await homePage.open();
  await homePage.clickGlobalFeed();

  await expect(homePage.firstLikeButton).toBeVisible();
  await homePage.clickLike();

  await expect(homePage.firstLikeButton).toHaveClass(/active/);
});

  test('Пользователь может редактировать статью', async ({ page }) => {
    const homePage = new HomePage(page);
    const editorPage = new EditorPage(page);
    const articlePage = new ArticlePage(page);

    await homePage.clickNewArticle();
    const title = 'Article ' + Date.now();
    await editorPage.fillArticle(title, 'Description', 'Body');
    await editorPage.publish();

    await expect(articlePage.title).toBeVisible();

    await articlePage.editArticle();
    const newTitle = 'Updated ' + Date.now();
    await editorPage.titleInput.fill(newTitle);
    await editorPage.update();

    await expect(articlePage.title).toHaveText(newTitle);
  });

});