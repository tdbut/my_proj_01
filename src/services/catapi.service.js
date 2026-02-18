const DEBUG = process.env.DEBUG === 'true';

export class CatApiService {
    constructor(request, baseURL) {
        this.request = request;
        this.baseURL = baseURL || process.env.CAT_API_URL || 'https://api.thecatapi.com/v1';
        this.apiKey = process.env.CAT_API_KEY || '';
    }

    _headers() {
        const headers = { 'Content-Type': 'application/json' };
        if (this.apiKey) {
            headers['x-api-key'] = this.apiKey;
        }
        return headers;
    }

    async _get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = `${this.baseURL}${endpoint}${queryString ? '?' + queryString : ''}`;

        let lastError;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const response = await this.request.get(url, {
                    headers: this._headers(),
                });

                const body = await response.json().catch(() => null);

                return {
                    status: response.status(),
                    body,
                    headers: response.headers(),
                    response,
                };
            } catch (error) {
                lastError = error;
                if (DEBUG) {
                    console.log(`Attempt ${attempt} failed for ${endpoint}: ${error.message}`);
                }
                if (attempt < 3) {
                    await new Promise((r) => setTimeout(r, 1000 * attempt));
                }
            }
        }
        throw lastError;
    }

    async searchImages(params = {}) {
        return this._get('/images/search', params);
    }

    async getImageById(imageId) {
        return this._get(`/images/${imageId}`);
    }

    async getBreeds() {
        return this._get('/breeds');
    }

    async getCategories() {
        return this._get('/categories');
    }

    async searchImagesByBreed(breedId, limit = 5) {
        return this._get('/images/search', { breed_ids: breedId, limit });
    }
}