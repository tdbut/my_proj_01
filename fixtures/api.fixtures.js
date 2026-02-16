import { test as base } from '@playwright/test';
import { CatApiService } from '../src/services/catapi.service';
import { ImagesPage } from '../src/pages/images.page';
import { BreedsPage } from '../src/pages/breeds.page';
import { CategoriesPage } from '../src/pages/categories.page';

export const test = base.extend({
    catApiService: async ({ request }, use) => {
        const service = new CatApiService(request);
        await use(service);
    },
    
    imagesPage: async ({ catApiService }, use) => {
        const page = new ImagesPage(catApiService);
        await use(page);
    },
    
    breedsPage: async ({ catApiService }, use) => {
        const page = new BreedsPage(catApiService);
        await use(page);
    },
    
    categoriesPage: async ({ catApiService }, use) => {
        const page = new CategoriesPage(catApiService);
        await use(page);
    }
});

export { expect } from '@playwright/test';