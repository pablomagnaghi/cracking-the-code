// 09.03. Web Crawler
//
// If you were designing a web crawler, how would you avoid getting into
// infinite loops?
//
// Approach:
//   Maintain a set of visited URLs to prevent revisiting the same page.
//   Use a depth limit to bound the crawl and avoid unbounded exploration.
//   The crawler accepts a URL resolver function (simulating HTTP fetches)
//   that returns the list of links found on a page. BFS is used to crawl
//   level by level up to the specified maximum depth.
//
// Key Strategies to Avoid Infinite Loops:
//   1. Track all visited URLs in a set
//   2. Normalize URLs before comparison (e.g., remove trailing slashes)
//   3. Enforce a maximum crawl depth
//   4. Limit total pages crawled
//
// Example:
//   crawler.crawl('https://example.com', 2) => [{ url, depth, links }, ...]

export interface CrawlResult {
  url: string;
  depth: number;
  links: string[];
}

export type LinkResolver = (url: string) => string[];

export class WebCrawler {
  private visited: Set<string> = new Set();
  private results: CrawlResult[] = [];
  private resolver: LinkResolver;
  private maxPages: number;

  constructor(resolver: LinkResolver, maxPages: number = 1000) {
    this.resolver = resolver;
    this.maxPages = maxPages;
  }

  crawl(startUrl: string, maxDepth: number): CrawlResult[] {
    this.visited.clear();
    this.results = [];

    const normalizedStart = this.normalizeUrl(startUrl);
    const queue: Array<{ url: string; depth: number }> = [
      { url: normalizedStart, depth: 0 },
    ];
    this.visited.add(normalizedStart);

    while (queue.length > 0 && this.results.length < this.maxPages) {
      const { url, depth } = queue.shift()!;

      // Fetch links from the page
      const rawLinks = this.resolver(url);
      const links = rawLinks.map((link) => this.normalizeUrl(link));

      const result: CrawlResult = { url, depth, links };
      this.results.push(result);

      // Only enqueue child links if we haven't exceeded max depth
      if (depth < maxDepth) {
        for (const link of links) {
          if (!this.visited.has(link)) {
            this.visited.add(link);
            queue.push({ url: link, depth: depth + 1 });
          }
        }
      }
    }

    return this.results;
  }

  getVisitedCount(): number {
    return this.visited.size;
  }

  private normalizeUrl(url: string): string {
    // Remove trailing slash, lowercase the scheme and host
    let normalized = url.trim();
    if (normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    return normalized.toLowerCase();
  }
}
