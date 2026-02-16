export class UIDataGenerator {
    static getRandomUserData() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);

        return {
            gender: Math.random() > 0.5 ? 'M' : 'F',
            firstName: `Test${random}`,
            lastName: `User${timestamp}`,
            email: `testuser_${timestamp}_${random}@mailtest.com`,
            password: `TestPass_${random}!`,
        };
    }
}
