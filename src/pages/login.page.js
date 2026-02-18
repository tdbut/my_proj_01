export class LoginPage {
    constructor(page) {
        this.page = page;

        this.usernameInput = page.getByRole('textbox', { name: 'Your Name' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });

        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });

        this.newArticleLink = page.getByRole('link', { name: 'New Article' });
    }

    async open() {
        await this.page.goto('/#/login');
    }

    async register(username, email, password) {
        await this.page.goto('/#/register');

        await this.usernameInput.fill(username);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signUpButton.click();

        await this.newArticleLink.waitFor({ state: 'visible', timeout: 10000 });
    }

    async login(email, password) {
        await this.open();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}