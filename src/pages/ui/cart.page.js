export class CartPage {
    constructor(page) {
        this.page = page;

        this.pageTitle = page.locator('.page-title h1');
        this.cartTable = page.getByRole('table').first();
        this.tableHeaders = this.cartTable.locator('thead th');
        this.cartItems = this.cartTable.locator('tbody tr');
        this.removeCheckbox = page.locator('input[name="removefromcart"]').first();
        this.updateCartButton = page.locator('input[name="updatecart"]');
        this.continueShoppingButton = page.locator('input[name="continueshopping"]');
        this.termsCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.locator('#checkout');
        this.orderTotal = page.locator('.order-total .value-summary strong');
    }

    async goto(path = '/cart') {
        await this.page.goto(path);
    }

    async verifyPageTitle() {
        const text = await this.pageTitle.textContent();
        return {
            locator: this.pageTitle,
            text: text?.trim() ?? '',
        };
    }

    async verifyCartTable() {
        return {
            locator: this.cartTable,
            isVisible: await this.cartTable.isVisible(),
        };
    }

    async verifyTableHeaders() {
        const count = await this.tableHeaders.count();
        const headers = [];
        for (let i = 0; i < count; i++) {
            const text = await this.tableHeaders.nth(i).textContent();
            headers.push({
                locator: this.tableHeaders.nth(i),
                text: text?.trim() ?? '',
            });
        }
        return headers;
    }

    async verifyRemoveCheckbox() {
        return {
            locator: this.removeCheckbox,
            isVisible: await this.removeCheckbox.isVisible(),
        };
    }

    async verifyUpdateButton() {
        const text = await this.updateCartButton.getAttribute('value');
        return {
            locator: this.updateCartButton,
            text: text ?? '',
        };
    }

    async verifyCheckoutButton() {
        return {
            locator: this.checkoutButton,
            isVisible: await this.checkoutButton.isVisible(),
        };
    }

    async removeItem(index = 0) {
        const checkbox = this.page.locator('input[name="removefromcart"]').nth(index);
        await checkbox.check();
        await this.updateCartButton.click();
    }
}