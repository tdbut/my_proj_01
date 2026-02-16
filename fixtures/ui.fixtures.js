import { test as base } from '@playwright/test';
import { BasePage } from '../src/pages/ui/base.page.js';
import { RegisterPage } from '../src/pages/ui/register.page.js';
import { ProductPage } from '../src/pages/ui/product.page.js';
import { CartPage } from '../src/pages/ui/cart.page.js';


export const test = base.extend({
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },

    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
});

export { expect } from '@playwright/test';
