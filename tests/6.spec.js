import { test, expect } from '@playwright/test';

import { LoginPage } from '../src/pages/login.page.js';
import { HomePage } from '../src/pages/home.page.js';
import { EditorPage } from '../src/pages/editor.page.js';
import { ArticlePage } from '../src/pages/article.page.js';
import { SettingsPage } from '../src/pages/settings.page.js';

test.describe('RealWorld Functional Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('raiyskiy2@ya.ru', '85-36');
  });

 
  test('Создание статьи', async ({ page }) => {
    const homePage = new HomePage(page);
    const editorPage = new EditorPage(page);
    const articlePage = new ArticlePage(page);

    await homePage.clickNewArticle();
    
    const title = 'Test Article ' + Date.now();
    await editorPage.fillArticle(title, 'Description', 'Article body text');
    await editorPage.publish();

    const articleTitle = await articlePage.getTitle();
    await expect(articleTitle).toHaveText(title);
  });

 
test('Добавление комментария', async ({ page }) => {
  const homePage = new HomePage(page);
  const articlePage = new ArticlePage(page);

  await homePage.open();
  await page.getByRole('button', { name: 'Global Feed' }).click();
  await homePage.clickFirstArticle();

  const commentText = 'Test comment ' + Date.now();
  await articlePage.addComment(commentText);

  const comments = await articlePage.getComments();
  await expect(comments.first()).toContainText(commentText);
});

 
  test('Редактирование профиля', async ({ page }) => {
    const homePage = new HomePage(page);
    const settingsPage = new SettingsPage(page);

    await homePage.open();
    await homePage.clickSettings();

    const newBio = 'Bio updated ' + Date.now();
    await settingsPage.updateBio(newBio);
    await settingsPage.saveSettings();

    await expect(page.getByRole('textbox', { name: 'Short bio' })).toHaveValue(newBio);
  });


test('Лайк статьи', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.open();
  await page.getByRole('button', { name: 'Global Feed' }).click();
  
  const likeButton = await homePage.getLikeCount();
  const countBefore = await likeButton.textContent();
  
  await homePage.clickLike();
  await page.waitForTimeout(500);
  
  const countAfter = await likeButton.textContent();
  expect(countBefore).not.toBe(countAfter);
});


test('Редактирование статьи', async ({ page }) => {
  const homePage = new HomePage(page);
  const editorPage = new EditorPage(page);
  const articlePage = new ArticlePage(page);


  await homePage.clickNewArticle();
  const title = 'Article ' + Date.now();
  await editorPage.fillArticle(title, 'Description', 'Body');
  await editorPage.publish();

  await page.getByRole('button', { name: 'Edit Article' }).first().click();
  const newTitle = 'Updated ' + Date.now();
  await page.getByRole('textbox', { name: 'Article Title' }).fill(newTitle);
  await editorPage.update();  // вместо publish()


  await expect(page.locator('h1').first()).toHaveText(newTitle);
});
});
