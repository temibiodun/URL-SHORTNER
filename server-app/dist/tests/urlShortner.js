"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// urlShortener.ts
class UrlShortener {
    constructor() {
        this.urlMap = {};
    }
    shortenUrl(originalUrl) {
        const shortUrl = `http://short.url/${Object.keys(this.urlMap).length + 1}`;
        this.urlMap[shortUrl] = originalUrl;
        return shortUrl;
    }
    getOriginalUrl(shortUrl) {
        return this.urlMap[shortUrl] || null;
    }
}
exports.default = UrlShortener;
