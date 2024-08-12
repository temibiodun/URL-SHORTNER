import UrlShortener from './urlShortner';

describe('UrlShortener', () => {

  let urlShortener : UrlShortener;

  beforeEach(() => {
    urlShortener = new UrlShortener();
  });

  it('should shorten a URL', () => {
    const originalUrl = 'https://example.com';
    const shortenedUrl = urlShortener.shortenUrl(originalUrl);
    expect(shortenedUrl).toBe('http://short.url/1');
  });

  it('should return the original URL for a shortened URL', () => {
    const originalUrl = 'https://example.com';
    const shortenedUrl = urlShortener.shortenUrl(originalUrl);
    expect(urlShortener.getOriginalUrl(shortenedUrl)).toBe(originalUrl);
  });

  it('should return null for an unknown shortened URL', () => {
    expect(urlShortener.getOriginalUrl('http://unknown.url')).toBeNull();
  });

  it('should shorten multiple URLs', () => {
    const originalUrls = ['https://example.com', 'https://google.com', 'https://facebook.com'];
    const shortenedUrls = originalUrls.map((url) => urlShortener.shortenUrl(url));
    expect(shortenedUrls).toEqual([
      'http://short.url/1',
      'http://short.url/2',
      'http://short.url/3',
    ]);
  });

  it('should return the correct original URL for multiple shortened URLs', () => {
    const originalUrls = ['https://example.com', 'https://google.com', 'https://facebook.com'];
    const shortenedUrls = originalUrls.map((url) => urlShortener.shortenUrl(url));
    expect(urlShortener.getOriginalUrl(shortenedUrls[0])).toBe(originalUrls[0]);
    expect(urlShortener.getOriginalUrl(shortenedUrls[1])).toBe(originalUrls[1]);
    expect(urlShortener.getOriginalUrl(shortenedUrls[2])).toBe(originalUrls[2]);
  });
});