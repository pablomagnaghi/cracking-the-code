import { LRUCache } from '../../src/moderate-exercises/25-lru-cache';

describe('LRUCache', () => {
  test('put and get operations work correctly', () => {
    const cache = new LRUCache<number, string>(2);
    expect(cache.get(1)).toBeNull();

    cache.put(1, 'one');
    expect(cache.get(1)).toBe('one');

    cache.put(2, 'two');
    expect(cache.get(2)).toBe('two');

    // Cache is full, next put should evict least recently used (key=1)
    cache.put(3, 'three');
    expect(cache.get(1)).toBeNull();
    expect(cache.get(2)).toBe('two');
    expect(cache.get(3)).toBe('three');
  });

  test('get moves item to most recently used', () => {
    const cache = new LRUCache<number, string>(2);
    cache.put(1, 'one');
    cache.put(2, 'two');
    expect(cache.get(1)).toBe('one'); // access key 1, makes it most recent
    cache.put(3, 'three'); // should evict key 2 now

    expect(cache.get(2)).toBeNull();
    expect(cache.get(1)).toBe('one');
    expect(cache.get(3)).toBe('three');
  });

  test('put updates value and moves to most recently used', () => {
    const cache = new LRUCache<number, string>(2);
    cache.put(1, 'one');
    cache.put(2, 'two');
    cache.put(1, 'ONE'); // update key 1
    expect(cache.get(1)).toBe('ONE');

    cache.put(3, 'three'); // should evict key 2
    expect(cache.get(2)).toBeNull();
    expect(cache.get(1)).toBe('ONE');
    expect(cache.get(3)).toBe('three');
  });

  test('handles capacity 1 correctly', () => {
    const cache = new LRUCache<number, string>(1);
    cache.put(1, 'one');
    expect(cache.get(1)).toBe('one');

    cache.put(2, 'two'); // evicts key 1
    expect(cache.get(1)).toBeNull();
    expect(cache.get(2)).toBe('two');
  });
});
