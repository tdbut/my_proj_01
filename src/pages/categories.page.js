export class CategoriesPage {
    constructor(catApiService) {
        this.catApiService = catApiService;
    }

    async getAllCategories() {
        return await this.catApiService.getCategories();
    }

    validateCategoryStructure(category) {
        return {
            hasRequiredFields:
                category.hasOwnProperty('id') &&
                category.hasOwnProperty('name'),
            
            hasCorrectTypes:
                typeof category.id === 'number' &&
                typeof category.name === 'string'
        };
    }

    getCategoryInfo(category) {
        return {
            id: category.id,
            name: category.name
        };
    }
}