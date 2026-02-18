export class UIDataGenerator {
    static getRandomEmail() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return `testuser${timestamp}${random}@example.com`;
    }

    static getRandomPassword(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }

    static getRandomString(length = 10) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    static getRandomProductQuantity(min = 1, max = 5) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomSearchQuery() {
        const queries = ['computer', 'book', 'jewelry', 'gift', 'phone'];
        return queries[Math.floor(Math.random() * queries.length)];
    }

    static getRandomReviewData() {
        const titles = ['Great product!', 'Love it', 'Highly recommended', 'Perfect', 'Excellent'];
        const texts = [
            'This is an amazing product. I highly recommend it!',
            'Great quality and fast delivery.',
            'Exactly what I was looking for.',
            'Perfect for my needs. Very satisfied!',
            'Excellent product, will buy again.'
        ];
        return {
            title: titles[Math.floor(Math.random() * titles.length)],
            text: texts[Math.floor(Math.random() * texts.length)],
            rating: Math.floor(Math.random() * 3) + 3
        };
    }
}