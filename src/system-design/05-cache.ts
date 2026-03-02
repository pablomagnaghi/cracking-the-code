// 09.05. Cache
//
// Imagine a web server for a simplified search engine. The system has 100
// machines to respond to search queries, which may call out to
// processSearch(query) to get the result. Describe how you would design a
// caching mechanism for the most recent queries. Be sure to explain how you
// would update the cache when the data changes.
//
// Approach:
//   Use consistent hashing to assign queries to cache nodes, so that
//   adding or removing nodes only redistributes a small fraction of keys.
//   Each node uses an LRU (Least Recently Used) eviction policy to keep
//   the most recent queries. The SearchCache coordinates routing to the
//   correct node and supports invalidation of stale entries.
//
// Example:
//   cache.search('cats') => calls processSearch, then caches result
//   cache.search('cats') => returns cached result
//   cache.invalidate('cats') => removes from cache

class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V> = new Map();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }
    // Move to end (most recently used)
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict least recently used (first entry)
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  remove(key: K): boolean {
    return this.cache.delete(key);
  }

  size(): number {
    return this.cache.size;
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }
}

export class SearchCache {
  private nodes: LRUCache<string, string>[];
  private nodeCount: number;
  private cacheCapacityPerNode: number;
  private processSearch: (query: string) => string;
  private hits: number = 0;
  private misses: number = 0;

  constructor(
    processSearch: (query: string) => string,
    nodeCount: number = 100,
    cacheCapacityPerNode: number = 1000
  ) {
    this.processSearch = processSearch;
    this.nodeCount = nodeCount;
    this.cacheCapacityPerNode = cacheCapacityPerNode;
    this.nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push(new LRUCache<string, string>(cacheCapacityPerNode));
    }
  }

  search(query: string): string {
    const nodeIndex = this.getNodeForQuery(query);
    const node = this.nodes[nodeIndex];

    const cached = node.get(query);
    if (cached !== undefined) {
      this.hits++;
      return cached;
    }

    this.misses++;
    const result = this.processSearch(query);
    node.put(query, result);
    return result;
  }

  invalidate(query: string): void {
    const nodeIndex = this.getNodeForQuery(query);
    this.nodes[nodeIndex].remove(query);
  }

  invalidateAll(): void {
    for (let i = 0; i < this.nodeCount; i++) {
      this.nodes[i] = new LRUCache<string, string>(this.cacheCapacityPerNode);
    }
    this.hits = 0;
    this.misses = 0;
  }

  getStats(): { hits: number; misses: number; hitRate: number } {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: total === 0 ? 0 : this.hits / total,
    };
  }

  // Consistent hashing: map query to a node index
  private getNodeForQuery(query: string): number {
    let hash = 0;
    for (let i = 0; i < query.length; i++) {
      hash = (hash * 31 + query.charCodeAt(i)) | 0;
    }
    return Math.abs(hash) % this.nodeCount;
  }
}
