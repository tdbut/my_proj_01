export class ImagesPage {
    constructor(catApiService) {
        this.catApiService = catApiService;
    }

    async searchWithBasicParams() {
        const params = {
            limit: 5,
            page: 0,
            order: 'RAND'
        };
        return await this.catApiService.searchImages(params);
    }

    async searchWithCustomParams(limit, page, order) {
        const params = {
            limit: limit,
            page: page,
            order: order
        };
        return await this.catApiService.searchImages(params);
    }

    async searchRandomImages(count = 5) {
        const params = {
            limit: count,
            order: 'RAND'
        };
        return await this.catApiService.searchImages(params);
    }

    async searchByBreedAndCategory(breedId, categoryId, limit = 3) {
        const params = {
            breed_ids: breedId,
            category_ids: categoryId,
            limit: limit
        };
        return await this.catApiService.searchImages(params);
    }

    async searchByInvalidParams(params) {
        return await this.catApiService.searchImages(params);
    }

    async getImageById(imageId) {
        return await this.catApiService.getImageById(imageId);
    }

    validateImageStructure(image) {
        const validations = {
            hasRequiredFields: 
                image.hasOwnProperty('id') &&
                image.hasOwnProperty('url') &&
                image.hasOwnProperty('width') &&
                image.hasOwnProperty('height'),
            
            hasCorrectTypes:
                typeof image.id === 'string' &&
                typeof image.url === 'string' &&
                typeof image.width === 'number' &&
                typeof image.height === 'number',
            
            hasValidUrl: /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(image.url)
        };

        return validations;
    }

    getImageInfo(image) {
        return {
            id: image.id,
            dimensions: `${image.width}x${image.height}`,
            url: image.url,
            hasBreeds: image.breeds && image.breeds.length > 0
        };
    }

    areAllImagesUnique(images) {
        const ids = images.map(img => img.id);
        const uniqueIds = new Set(ids);
        return uniqueIds.size === ids.length;
    }

    getBreedInfoFromImage(image) {
        if (image.breeds && image.breeds.length > 0) {
            return {
                name: image.breeds[0].name,
                temperament: image.breeds[0].temperament || 'N/A',
                origin: image.breeds[0].origin || 'N/A'
            };
        }
        return null;
    }
}