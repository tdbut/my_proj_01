export class BreedsPage {
    constructor(catApiService) {
        this.catApiService = catApiService;
    }

    async getAllBreeds() {
        return await this.catApiService.getBreeds();
    }

    async searchImagesByBreed(breedId, limit = 5) {
        return await this.catApiService.searchImagesByBreed(breedId, limit);
    }

    validateBreedStructure(breed) {
        return {
            hasRequiredFields:
                breed.hasOwnProperty('id') &&
                breed.hasOwnProperty('name') &&
                breed.hasOwnProperty('temperament') &&
                breed.hasOwnProperty('origin') &&
                breed.hasOwnProperty('description'),
            
            hasCorrectTypes:
                typeof breed.id === 'string' &&
                typeof breed.name === 'string' &&
                typeof breed.temperament === 'string' &&
                typeof breed.origin === 'string' &&
                typeof breed.description === 'string'
        };
    }

    getBreedInfo(breed) {
        return {
            id: breed.id,
            name: breed.name,
            origin: breed.origin,
            temperament: breed.temperament,
            description: breed.description.substring(0, 100) + '...'
        };
    }

    areAllBreedsUnique(breeds) {
        const ids = breeds.map(breed => breed.id);
        const uniqueIds = new Set(ids);
        return uniqueIds.size === ids.length;
    }

    getTotalBreedCount(breeds) {
        return breeds.length;
    }

    getBreedsByOrigin(breeds, origin) {
        return breeds.filter(breed => 
            breed.origin.toLowerCase().includes(origin.toLowerCase())
        );
    }
}