import { test as base } from '@playwright/test';
import { CatApiService } from '../src/services/catapi.service.js';

export const test = base.extend({
    apiRequest: async ({ request }, use) => {
        const service = new CatApiService(request);
        await use(service);
    },

    randomImage: async ({ request }, use) => {
        const service = new CatApiService(request);
        const result = await service.searchImages({ limit: 1, order: 'RAND' });
        const image = result.body[0];
        await use(image);
    },

    randomBreed: async ({ request }, use) => {
        const service = new CatApiService(request);
        const result = await service.getBreeds();
        const breeds = result.body;
        const randomIndex = Math.floor(Math.random() * breeds.length);
        await use(breeds[randomIndex]);
    }
});

export { expect } from '@playwright/test';