import { test, expect } from '../fixtures/api.fixtures.js';
import { DataGenerator } from '../src/helpers/data.generator.js';

test.describe('Developers.thecatap - iAPI тесты', () => {

    test('Получить случайные изображения кошек',
        { tag: ['@smoke', '@api', '@GET', '@images'] },
        async ({ apiRequest }) => {
            const response = await apiRequest.searchImages({ limit: 5 });
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBeGreaterThan(0);
            
            response.body.forEach(image => {
                expect(image).toHaveProperty('id');
                expect(image).toHaveProperty('url');
                expect(image.url).toMatch(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i);
            });
        }
    );

    test('Получить список всех пород кошек',
        { tag: ['@smoke', '@api', '@GET', '@breeds'] },
        async ({ apiRequest }) => {
            const response = await apiRequest.getBreeds();
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBeGreaterThan(0);
            
            const firstBreed = response.body[0];
            expect(firstBreed).toHaveProperty('id');
            expect(firstBreed).toHaveProperty('name');
            expect(firstBreed).toHaveProperty('temperament');
            expect(firstBreed).toHaveProperty('origin');
            
            const ids = response.body.map(breed => breed.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
        }
    );

    test('Получить конкретное изображение по ID',
        { tag: ['@api', '@GET', '@images'] },
        async ({ apiRequest, randomImage }) => {
            const response = await apiRequest.getImageById(randomImage.id);
            
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(randomImage.id);
            expect(response.body.url).toBe(randomImage.url);
            expect(response.body.width).toBeGreaterThan(0);
            expect(response.body.height).toBeGreaterThan(0);
        }
    );

    test('Поиск изображений по породе с пагинацией',
        { tag: ['@api', '@GET', '@images', '@breeds'] },
        async ({ apiRequest, randomBreed }) => {
            const params = {
                breed_ids: randomBreed.id,
                limit: 3,
                page: 0
            };
            
            const response = await apiRequest.searchImages(params);
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.headers['content-type']).toContain('application/json');
            
            console.log(`Found ${response.body.length} images for breed: ${randomBreed.name}`);
        }
    );

    test('Поиск несуществующего изображения возвращает ошибку',
        { tag: ['@api', '@GET', '@images', '@negative'] },
        async ({ apiRequest }) => {
            const invalidId = DataGenerator.getInvalidImageId();
            const response = await apiRequest.getImageById(invalidId);
            
            expect([400, 404]).toContain(response.status);
            expect(response.response.ok()).toBeFalsy();
            
            console.log(`Invalid image ID "${invalidId}" returned status: ${response.status}`);
        }
    );
});