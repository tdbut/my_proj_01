export class RegisterPage {
    constructor(page) {
        this.page = page;

        this.genderMale = page.locator('#gender-male');
        this.genderFemale = page.locator('#gender-female');
        this.firstNameInput = page.locator('#FirstName');
        this.lastNameInput = page.locator('#LastName');
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.confirmPasswordInput = page.locator('#ConfirmPassword');
        this.registerButton = page.locator('#register-button');
        this.resultMessage = page.locator('.result');
        this.continueButton = page.locator('.register-continue-button');
    }

    async goto() {
        await this.page.goto('/register');
    }

    async register(userData) {
        await this.goto();

        if (userData.gender === 'M') {
            await this.genderMale.check();
        } else {
            await this.genderFemale.check();
        }

        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.emailInput.fill(userData.email);
        await this.passwordInput.fill(userData.password);
        await this.confirmPasswordInput.fill(userData.password);
        await this.registerButton.click();

        await this.resultMessage.waitFor({ state: 'visible' });

        if (await this.continueButton.isVisible()) {
            await this.continueButton.click();
        }
    }
}
