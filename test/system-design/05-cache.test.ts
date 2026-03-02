import { SearchCache } from '../../src/system-design/05-cache';

describe('SearchCache', () => {
  let callCount: number;
  let processSearch: (query: string) => string;

  beforeEach(() => {
    callCount = 0;
    processSearch = (query: string) => {
      callCount++;
      return `results for: ${query}`;
    };
  });

  test('returns correct search results', () => {
    const cache = new SearchCache(processSearch, 10, 100);
    const result = cache.search('cats');
    expect(result).toBe('results for: cats');
  });

  test('caches results and avoids redundant processing', () => {
    const cache = new SearchCache(processSearch, 10, 100);
    cache.search('cats');
    cache.search('cats');
    cache.search('cats');
    expect(callCount).toBe(1); // Only processed once
  });

  test('tracks hit and miss statistics', () => {
    const cache = new SearchCache(processSearch, 10, 100);
    cache.search('cats');    // miss
    cache.search('dogs');    // miss
    cache.search('cats');    // hit
    cache.search('cats');    // hit
    const stats = cache.getStats();
    expect(stats.hits).toBe(2);
    expect(stats.misses).toBe(2);
    expect(stats.hitRate).toBe(0.5);
  });

  test('invalidate removes cached entry', () => {
    const cache = new SearchCache(processSearch, 10, 100);
    cache.search('cats');
    expect(callCount).toBe(1);
    cache.invalidate('cats');
    cache.search('cats');
    expect(callCount).toBe(2); // Had to re-process after invalidation
  });

  test('invalidateAll clears all cached entries', () => {
    const cache = new SearchCache(processSearch, 10, 100);
    cache.search('cats');
    cache.search('dogs');
    cache.invalidateAll();
    cache.search('cats');
    cache.search('dogs');
    expect(callCount).toBe(4); // All re-processed
    const stats = cache.getStats();
    expect(stats.hits).toBe(0);
  });

  test('LRU eviction works when capacity is exceeded', () => {
    // Use a single node with capacity 2
    const cache = new SearchCache(processSearch, 1, 2);
    cache.search('a'); // miss, cache: [a]
    cache.search('b'); // miss, cache: [a, b]
    cache.search('c'); // miss, cache: [b, c] (a evicted)
    callCount = 0;

    cache.search('b'); // hit (still in cache)
    expect(callCount).toBe(0);

    cache.search('a'); // miss (was evicted)
    expect(callCount).toBe(1);
  });

  test('handles different queries independently', () => {
    const cache = new SearchCache(processSearch, 10, 100);
    const r1 = cache.search('cats');
    const r2 = cache.search('dogs');
    expect(r1).toBe('results for: cats');
    expect(r2).toBe('results for: dogs');
    expect(callCount).toBe(2);
  });

  test('getStats returns zero hit rate when no searches performed', () => {
    const cache = new SearchCache(processSearch, 10, 100);
    const stats = cache.getStats();
    expect(stats.hitRate).toBe(0);
    expect(stats.hits).toBe(0);
    expect(stats.misses).toBe(0);
  });
});
