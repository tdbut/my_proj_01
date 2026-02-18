export class ArticleDataBuilder {
    constructor() {
        const timestamp = Date.now();
        this._title = `Test Article ${timestamp}`;
        this._description = 'Auto-generated description';
        this._body = 'Auto-generated article body text';
    }

    withTitle(title) {
        this._title = title;
        return this;
    }

    withDescription(description) {
        this._description = description;
        return this;
    }

    withBody(body) {
        this._body = body;
        return this;
    }

    build() {
        return {
            title: this._title,
            description: this._description,
            body: this._body,
        };
    }
}