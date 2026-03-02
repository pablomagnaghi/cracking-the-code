import {
  BloomFilter,
  URLDeduplicator,
} from '../../src/system-design/04-duplicate-urls';

describe('BloomFilter', () => {
  test('reports items that were added', () => {
    const filter = new BloomFilter(10000, 5);
    filter.add('https://example.com');
    filter.add('https://google.com');
    expect(filter.mightContain('https://example.com')).toBe(true);
    expect(filter.mightContain('https://google.com')).toBe(true);
  });

  test('reports items not added as absent (with high probability)', () => {
    const filter = new BloomFilter(100000, 7);
    filter.add('https://example.com');
    // With a large enough filter, false positives are rare
    let falsePositives = 0;
    for (let i = 0; i < 100; i++) {
      if (filter.mightContain(`https://not-added-${i}.com`)) {
        falsePositives++;
      }
    }
    // Expect very few false positives with a 100k-bit filter and only 1 item
    expect(falsePositives).toBeLessThan(5);
  });

  test('returns the configured size', () => {
    const filter = new BloomFilter(50000, 3);
    expect(filter.getSize()).toBe(50000);
  });
});

describe('URLDeduplicator', () => {
  test('detects duplicates after adding a URL', () => {
    const dedup = new URLDeduplicator(10000);
    dedup.add('https://example.com/page1');
    expect(dedup.isDuplicate('https://example.com/page1')).toBe(true);
  });

  test('does not flag unseen URLs as duplicates', () => {
    const dedup = new URLDeduplicator(10000);
    dedup.add('https://example.com/page1');
    expect(dedup.isDuplicate('https://example.com/page2')).toBe(false);
  });

  test('processUrls returns only unique URLs', () => {
    const dedup = new URLDeduplicator(10000);
    const urls = [
      'https://a.com',
      'https://b.com',
      'https://a.com',
      'https://c.com',
      'https://b.com',
    ];
    const unique = dedup.processUrls(urls);
    expect(unique).toEqual(['https://a.com', 'https://b.com', 'https://c.com']);
  });

  test('tracks count of added URLs', () => {
    const dedup = new URLDeduplicator(10000);
    dedup.add('https://a.com');
    dedup.add('https://b.com');
    dedup.add('https://c.com');
    expect(dedup.getCount()).toBe(3);
  });

  test('handles large batches correctly', () => {
    const dedup = new URLDeduplicator(100000);
    const urls: string[] = [];
    for (let i = 0; i < 1000; i++) {
      urls.push(`https://example.com/page/${i}`);
    }
    // Add all, then duplicate
    const allUrls = [...urls, ...urls];
    const unique = dedup.processUrls(allUrls);
    expect(unique.length).toBe(1000);
  });

  test('processUrls respects previously added URLs', () => {
    const dedup = new URLDeduplicator(10000);
    dedup.add('https://existing.com');
    const unique = dedup.processUrls([
      'https://existing.com',
      'https://new.com',
    ]);
    expect(unique).toEqual(['https://new.com']);
  });
});
