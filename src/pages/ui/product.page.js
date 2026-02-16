export class ProductPage {
    constructor(page) {
        this.page = page;

        this.productName = page.locator('.product-name h1');
        this.productPrice = page.locator('.product-price span');
        this.addToCartButton = page.locator('.add-to-cart-button');
        this.addToWishlistButton = page.locator('.add-to-wishlist-button');
        this.productImage = page.locator('.picture img');
        this.quantityInput = page.locator('.qty-input');
        this.barNotification = page.locator('.bar-notification');
    }

    async verifyProductName() {
        const text = await this.productName.textContent();
        return {
            locator: this.productName,
            text: text?.trim() ?? '',
            hasText: (text?.trim().length ?? 0) > 0,
        };
    }

    async verifyProductPrice() {
        const text = await this.productPrice.textContent();
        const trimmed = text?.trim() ?? '';
        const hasValidFormat = /\d+[\.,]?\d*/.test(trimmed);
        return {
            locator: this.productPrice,
            text: trimmed,
            hasValidFormat,
        };
    }

    async verifyAddToCartButton() {
        const text = await this.addToCartButton.getAttribute('value');
        return {
            locator: this.addToCartButton,
            text: text?.trim() ?? '',
        };
    }

    async verifyAddToWishlistButton() {
        const text = await this.addToWishlistButton.getAttribute('value');
        return {
            locator: this.addToWishlistButton,
            text: text?.trim() ?? '',
        };
    }

    async addToCart() {
        await this.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.addToCartButton.click();
        await this.barNotification.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
        await this.page.waitForLoadState('networkidle');
    }

    async addToWishlist() {
        await this.addToWishlistButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.addToWishlistButton.click();
        await this.barNotification.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    }
}