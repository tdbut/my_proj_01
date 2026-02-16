import { test, expect } from '../fixtures/api.fixtures';
import { DataGenerator } from '../src/helpers/data.generator';

test.describe('The Cat API - Функциональные тесты', () => {

    test('1. Проверка API для поиска изображений кошек', async ({ imagesPage }) => {
        
        const result = await imagesPage.searchWithBasicParams();
        expect(result.status).toBe(200);
        expect(result.response.ok()).toBeTruthy();
        
        expect(result.headers['content-type']).toContain('application/json');
        
        expect(Array.isArray(result.body)).toBeTruthy();
        expect(result.body.length).toBeGreaterThan(0);
        expect(result.body.length).toBeLessThanOrEqual(10);
        
        console.log(`Received ${result.body.length} images`);
        
        result.body.forEach((image, index) => {
            const validation = imagesPage.validateImageStructure(image);
            
            expect(validation.hasRequiredFields).toBeTruthy();
            expect(validation.hasCorrectTypes).toBeTruthy();
            expect(validation.hasValidUrl).toBeTruthy();
            
            const imageInfo = imagesPage.getImageInfo(image);
            console.log(`Image ${index + 1}: ${imageInfo.id} - ${imageInfo.dimensions}`);
        });
    });

    test('2. Проверка API для получения изображений с кошками', async ({ imagesPage }) => {
        const params = DataGenerator.getValidSearchParams();
        
        const result = await imagesPage.searchWithCustomParams(
            params.limit,
            params.page,
            params.order
        );
        
        expect(result.status).toBe(200);
        expect(result.response.ok()).toBeTruthy();
        
        expect(Array.isArray(result.body)).toBeTruthy();
        expect(result.body.length).toBeGreaterThan(0);
        
        console.log(`Generated params: limit=${params.limit}, page=${params.page}, order=${params.order}`);
        console.log(`Received ${result.body.length} images`);
        
        const areUnique = imagesPage.areAllImagesUnique(result.body);
        expect(areUnique).toBeTruthy();
        
        result.body.forEach(image => {
            const validation = imagesPage.validateImageStructure(image);
            expect(validation.hasRequiredFields).toBeTruthy();
        });
    });

    test('3. Проверка API для получения списка всех пород кошек', async ({ breedsPage }) => {
    
        const result = await breedsPage.getAllBreeds();
        
        expect(result.status).toBe(200);
        expect(result.response.ok()).toBeTruthy();
        
        expect(Array.isArray(result.body)).toBeTruthy();
        expect(result.body.length).toBeGreaterThan(0);
        
        const areUnique = breedsPage.areAllBreedsUnique(result.body);
        expect(areUnique).toBeTruthy();
        
        const totalBreeds = breedsPage.getTotalBreedCount(result.body);
        console.log(`Total breeds: ${totalBreeds}`);
        
        const firstBreed = result.body[0];
        const validation = breedsPage.validateBreedStructure(firstBreed);
        
        expect(validation.hasRequiredFields).toBeTruthy();
        expect(validation.hasCorrectTypes).toBeTruthy();
        
        const breedInfo = breedsPage.getBreedInfo(firstBreed);
        console.log(`First breed: ${breedInfo.name} (${breedInfo.origin})`);
        console.log(`Temperament: ${breedInfo.temperament}`);
    });

    test('4. Проверка API поиска изображений по породе и категории', async ({ imagesPage }) => {
        const breedId = DataGenerator.getRandomBreedId();
        const categoryId = DataGenerator.getRandomCategoryId();
        
        const result = await imagesPage.searchByBreedAndCategory(
            breedId,
            categoryId,
            3
        );
        
        expect(result.status).toBe(200);
        expect(Array.isArray(result.body)).toBeTruthy();
        
        console.log(`Search params: breed=${breedId}, category=${categoryId}`);
        console.log(`Found ${result.body.length} images`);
        
        if (result.body.length > 0) {
            result.body.forEach((image, index) => {
                const validation = imagesPage.validateImageStructure(image);
                expect(validation.hasRequiredFields).toBeTruthy();
                const breedInfo = imagesPage.getBreedInfoFromImage(image);
                if (breedInfo) {
                    console.log(`Image ${index + 1} - Breed: ${breedInfo.name} (${breedInfo.origin})`);
                }
            });
        }
    });

    test('5. Проверка негативного сценария: невалидные параметры и ID', async ({ imagesPage, breedsPage }) => {
      
        const invalidParams = DataGenerator.getInvalidSearchParams();
        
        for (const params of invalidParams) {
            const result = await imagesPage.searchByInvalidParams(params);
            
            if (result.status === 400) {
                console.log(`Invalid params ${JSON.stringify(params)}: 400 Bad Request`);
                expect(result.response.ok()).toBeFalsy();
            } else {
                console.log(`Invalid params ${JSON.stringify(params)}: ${result.status}`);
            }
        }
       
        const invalidImageId = DataGenerator.getInvalidImageId();
        const imageResult = await imagesPage.getImageById(invalidImageId);
        
        expect([400, 404]).toContain(imageResult.status);
        expect(imageResult.response.ok()).toBeFalsy();
        
        console.log(`Invalid image ID "${invalidImageId}": ${imageResult.status}`);
        
        const invalidBreedResult = await breedsPage.searchImagesByBreed('nonexistent_breed_xyz');
        
        expect(invalidBreedResult.status).toBe(200);
        expect(Array.isArray(invalidBreedResult.body)).toBeTruthy();
        expect(invalidBreedResult.body.length).toBe(0);
        
        console.log('Invalid breed search: returned empty array');
    });
});