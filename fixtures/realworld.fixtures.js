import { test as base } from '@playwright/test';
import { App } from '../src/pages/index.js';

export const test = base.extend({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },
});

export { expect } from '@playwright/test';