import { LoginPage } from './login.page.js';
import { HomePage } from './home.page.js';
import { EditorPage } from './editor.page.js';
import { ArticlePage } from './article.page.js';
import { SettingsPage } from './settings.page.js';

export class App {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.editorPage = new EditorPage(page);
        this.articlePage = new ArticlePage(page);
        this.settingsPage = new SettingsPage(page);
    }
}