import { test } from '@playwright/test';

export class CatApiService {
    constructor(request, apiKey = null) {
        this.request = request;
        this.baseURL = 'https://api.thecatapi.com/v1';
        this.apiKey = apiKey || process.env.CAT_API_KEY;
    }

    getHeaders() {
        return this.apiKey ? { 'x-api-key': this.apiKey } : {};
    }

    async searchImages(params = {}, retries = 3) {
        return test.step('GET /images/search', async () => {
            let lastError;
            
            for (let i = 0; i < retries; i++) {
                try {
                    const queryParams = new URLSearchParams(params).toString();
                    const url = `${this.baseURL}/images/search${queryParams ? '?' + queryParams : ''}`;
                    
                    const response = await this.request.get(url, {
                        headers: this.getHeaders(),
                        timeout: 10000
                    });
                    
                    if (response.status() >= 500 && i < retries - 1) {
                        console.log(`Attempt ${i + 1}: Server error, retrying...`);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        continue;
                    }
                    
                    let body = null;
                    if (response.ok()) {
                        body = await response.json();
                    }
                    
                    return { 
                        response, 
                        body,
                        status: response.status(),
                        headers: response.headers()
                    };
                } catch (error) {
                    lastError = error;
                    if (i < retries - 1) {
                        console.log(`Attempt ${i + 1} failed: ${error.message}, retrying...`);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                }
            }
            
            throw lastError || new Error('Max retries reached');
        });
    }

    async getImageById(imageId, retries = 3) {
        return test.step(`GET /images/${imageId}`, async () => {
            let lastError;
            
            for (let i = 0; i < retries; i++) {
                try {
                    const response = await this.request.get(
                        `${this.baseURL}/images/${imageId}`,
                        {
                            headers: this.getHeaders(),
                            timeout: 10000
                        }
                    );
                    
                    if (response.status() >= 500 && i < retries - 1) {
                        console.log(`Attempt ${i + 1}: Server error, retrying...`);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        continue;
                    }
                    
                    let body = null;
                    try {
                        body = await response.json();
                    } catch (e) {
                        // Response может быть не JSON
                    }
                    
                    return { 
                        response, 
                        body,
                        status: response.status(),
                        headers: response.headers()
                    };
                } catch (error) {
                    lastError = error;
                    if (i < retries - 1) {
                        console.log(`Attempt ${i + 1} failed: ${error.message}, retrying...`);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                }
            }
            
            throw lastError || new Error('Max retries reached');
        });
    }

    async getBreeds(retries = 3) {
        return test.step('GET /breeds', async () => {
            let lastError;
            
            for (let i = 0; i < retries; i++) {
                try {
                    const response = await this.request.get(
                        `${this.baseURL}/breeds`,
                        {
                            headers: this.getHeaders(),
                            timeout: 10000
                        }
                    );
                    
                    if (response.status() >= 500 && i < retries - 1) {
                        console.log(`Attempt ${i + 1}: Server error, retrying...`);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        continue;
                    }
                    
                    let body = null;
                    if (response.ok()) {
                        body = await response.json();
                    }
                    
                    return { 
                        response, 
                        body,
                        status: response.status(),
                        headers: response.headers()
                    };
                } catch (error) {
                    lastError = error;
                    if (i < retries - 1) {
                        console.log(`Attempt ${i + 1} failed: ${error.message}, retrying...`);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                }
            }
            
            throw lastError || new Error('Max retries reached');
        });
    }

    async getCategories(retries = 3) {
        return test.step('GET /categories', async () => {
            let lastError;
            
            for (let i = 0; i < retries; i++) {
                try {
                    const response = await this.request.get(
                        `${this.baseURL}/categories`,
                        {
                            headers: this.getHeaders(),
                            timeout: 10000
                        }
                    );
                    
                    if (response.status() >= 500 && i < retries - 1) {
                        console.log(`Attempt ${i + 1}: Server error, retrying...`);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        continue;
                    }
                    
                    let body = null;
                    if (response.ok()) {
                        body = await response.json();
                    }
                    
                    return { 
                        response, 
                        body,
                        status: response.status(),
                        headers: response.headers()
                    };
                } catch (error) {
                    lastError = error;
                    if (i < retries - 1) {
                        console.log(`Attempt ${i + 1} failed: ${error.message}, retrying...`);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                    }
                }
            }
            
            throw lastError || new Error('Max retries reached');
        });
    }

    async searchImagesByBreed(breedId, limit = 5) {
        return test.step(`GET /images/search?breed_ids=${breedId}`, async () => {
            const response = await this.request.get(
                `${this.baseURL}/images/search?breed_ids=${breedId}&limit=${limit}`,
                {
                    headers: this.getHeaders(),
                    timeout: 10000
                }
            );
            
            let body = null;
            if (response.ok()) {
                body = await response.json();
            }
            
            return { 
                response, 
                body,
                status: response.status(),
                headers: response.headers()
            };
        });
    }
}