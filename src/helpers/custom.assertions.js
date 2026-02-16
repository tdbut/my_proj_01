import { expect } from '@playwright/test';

export class CustomAssertions {
    constructor(page) {
        this.page = page;
    }

    async assertPageTitle(expectedTitle) {
        const title = await this.page.title();
        expect(title).toContain(expectedTitle);
        return this;
    }

    async assertElementVisible(locator) {
        await expect(locator).toBeVisible();
        return this;
    }

    async assertElementHidden(locator) {
        await expect(locator).toBeHidden();
        return this;
    }

    async assertElementContainsText(locator, text) {
        await expect(locator).toContainText(text);
        return this;
    }

    async assertElementHasText(locator, text) {
        await expect(locator).toHaveText(text);
        return this;
    }

    async assertElementEnabled(locator) {
        await expect(locator).toBeEnabled();
        return this;
    }

    async assertElementDisabled(locator) {
        await expect(locator).toBeDisabled();
        return this;
    }

    async assertElementCount(locator, count) {
        await expect(locator).toHaveCount(count);
        return this;
    }

    async assertElementCountGreaterThan(locator, count) {
        const actualCount = await locator.count();
        expect(actualCount).toBeGreaterThan(count);
        return this;
    }

    async assertUrlContains(substring) {
        const url = this.page.url();
        expect(url).toContain(substring);
        return this;
    }

    async assertUrlEquals(expectedUrl) {
        const url = this.page.url();
        expect(url).toBe(expectedUrl);
        return this;
    }

    async assertSuccessMessage(message) {
        const successBar = this.page.locator('.bar-notification.success');
        await expect(successBar).toBeVisible();
        await expect(successBar).toContainText(message);
        return this;
    }

    async assertErrorMessage(message) {
        const errorBar = this.page.locator('.message-error, .bar-notification.error');
        await expect(errorBar).toBeVisible();
        await expect(errorBar).toContainText(message);
        return this;
    }

    async assertCartItemCount(count) {
        const cartQty = this.page.locator('.cart-qty');
        await expect(cartQty).toContainText(`(${count})`);
        return this;
    }
}