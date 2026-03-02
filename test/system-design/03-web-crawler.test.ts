import { WebCrawler, LinkResolver } from '../../src/system-design/03-web-crawler';

describe('WebCrawler', () => {
  test('crawls a single page with no links', () => {
    const resolver: LinkResolver = () => [];
    const crawler = new WebCrawler(resolver);
    const results = crawler.crawl('https://example.com', 2);
    expect(results).toHaveLength(1);
    expect(results[0].url).toBe('https://example.com');
    expect(results[0].depth).toBe(0);
    expect(results[0].links).toEqual([]);
  });

  test('crawls pages up to the specified depth', () => {
    const graph: Record<string, string[]> = {
      'https://a.com': ['https://b.com', 'https://c.com'],
      'https://b.com': ['https://d.com'],
      'https://c.com': [],
      'https://d.com': ['https://e.com'],
      'https://e.com': [],
    };
    const resolver: LinkResolver = (url) => graph[url] || [];
    const crawler = new WebCrawler(resolver);

    const results = crawler.crawl('https://a.com', 1);
    // Depth 0: a.com, depth 1: b.com, c.com (d.com is depth 2, excluded)
    expect(results).toHaveLength(3);
    expect(results.map((r) => r.url)).toContain('https://a.com');
    expect(results.map((r) => r.url)).toContain('https://b.com');
    expect(results.map((r) => r.url)).toContain('https://c.com');
  });

  test('avoids infinite loops caused by cycles', () => {
    const graph: Record<string, string[]> = {
      'https://a.com': ['https://b.com'],
      'https://b.com': ['https://c.com'],
      'https://c.com': ['https://a.com'], // cycle back to a
    };
    const resolver: LinkResolver = (url) => graph[url] || [];
    const crawler = new WebCrawler(resolver);

    const results = crawler.crawl('https://a.com', 10);
    // Should visit each page exactly once despite the cycle
    expect(results).toHaveLength(3);
    expect(crawler.getVisitedCount()).toBe(3);
  });

  test('normalizes URLs (trailing slash, case)', () => {
    const graph: Record<string, string[]> = {
      'https://example.com': ['https://Example.com/', 'https://EXAMPLE.COM'],
    };
    const resolver: LinkResolver = (url) => graph[url] || [];
    const crawler = new WebCrawler(resolver);

    const results = crawler.crawl('https://example.com', 1);
    // All three URLs normalize to the same thing
    expect(results).toHaveLength(1);
    expect(crawler.getVisitedCount()).toBe(1);
  });

  test('respects max pages limit', () => {
    const graph: Record<string, string[]> = {};
    for (let i = 0; i < 20; i++) {
      const links = [];
      for (let j = i + 1; j < Math.min(i + 5, 20); j++) {
        links.push(`https://page${j}.com`);
      }
      graph[`https://page${i}.com`] = links;
    }
    const resolver: LinkResolver = (url) => graph[url] || [];
    const crawler = new WebCrawler(resolver, 5);

    const results = crawler.crawl('https://page0.com', 10);
    expect(results).toHaveLength(5);
  });

  test('records correct depth for each crawled page', () => {
    const graph: Record<string, string[]> = {
      'https://root.com': ['https://level1.com'],
      'https://level1.com': ['https://level2.com'],
      'https://level2.com': [],
    };
    const resolver: LinkResolver = (url) => graph[url] || [];
    const crawler = new WebCrawler(resolver);

    const results = crawler.crawl('https://root.com', 5);
    const depthMap = new Map(results.map((r) => [r.url, r.depth]));
    expect(depthMap.get('https://root.com')).toBe(0);
    expect(depthMap.get('https://level1.com')).toBe(1);
    expect(depthMap.get('https://level2.com')).toBe(2);
  });

  test('handles self-referencing page', () => {
    const graph: Record<string, string[]> = {
      'https://self.com': ['https://self.com'],
    };
    const resolver: LinkResolver = (url) => graph[url] || [];
    const crawler = new WebCrawler(resolver);

    const results = crawler.crawl('https://self.com', 5);
    expect(results).toHaveLength(1);
  });
});
