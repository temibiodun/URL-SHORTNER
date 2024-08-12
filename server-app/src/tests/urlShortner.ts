// urlShortener.ts
class UrlShortener {
    private urlMap: { [shortUrl: string]: string } = {};
  
    shortenUrl(originalUrl: string): string {
      const shortUrl = `http://short.url/${Object.keys(this.urlMap).length + 1}`;
      this.urlMap[shortUrl] = originalUrl;
      return shortUrl;
    }
  
    getOriginalUrl(shortUrl: string): string | null {
      return this.urlMap[shortUrl] || null;
    }
  }
  
  export default UrlShortener;