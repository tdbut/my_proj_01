export class DataGenerator {
    static getRandomLimit(min = 1, max = 10) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomPage(min = 0, max = 5) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomOrder() {
        const orders = ['ASC', 'DESC', 'RAND'];
        return orders[Math.floor(Math.random() * orders.length)];
    }

    static getRandomBreedId() {
        const breeds = ['abys', 'beng', 'siam', 'pers', 'ragd', 'sphy'];
        return breeds[Math.floor(Math.random() * breeds.length)];
    }

    static getRandomCategoryId() {
        const categories = [1, 2, 3, 4, 5, 7]; // boxes, clothes, hats, sinks, space, sunglasses
        return categories[Math.floor(Math.random() * categories.length)];
    }

    static getValidSearchParams() {
        return {
            limit: this.getRandomLimit(1, 5),
            page: this.getRandomPage(0, 2),
            order: this.getRandomOrder()
        };
    }

    static getInvalidSearchParams() {
        return [
            { limit: -1 },
            { limit: 1000 },
            { page: -5 },
            { order: 'INVALID' }
        ];
    }

    static getRandomString(length = 10) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    static getInvalidImageId() {
        return this.getRandomString(20);
    }
}