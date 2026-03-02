// 13.05. TreeMap, HashMap, LinkedHashMap
//
// Explain the differences between TreeMap, HashMap, and LinkedHashMap in Java.
//   - HashMap: O(1) average get/put, no ordering guarantees
//   - LinkedHashMap: O(1) average get/put, preserves insertion order
//   - TreeMap: O(log n) get/put, keys are kept in sorted order
//
// Approach:
//   Implement TypeScript equivalents:
//   - SimpleHashMap: uses a plain object/Map for O(1) operations
//   - LinkedHashMap: wraps a Map (which in JS preserves insertion order)
//     and supports access-order mode for LRU-style behavior
//   - TreeMap: maintains keys in sorted order using a sorted array of
//     entries, with binary search for lookups
//
// Example:
//   const hm = new SimpleHashMap<string, number>();
//   hm.put('b', 2); hm.put('a', 1);
//   hm.get('a'); // 1
//
//   const lhm = new LinkedHashMap<string, number>();
//   lhm.put('b', 2); lhm.put('a', 1);
//   lhm.keys(); // ['b', 'a']  (insertion order)
//
//   const tm = new TreeMap<string, number>();
//   tm.put('b', 2); tm.put('a', 1);
//   tm.keys(); // ['a', 'b']  (sorted order)
//
// Constraints:
//   - SimpleHashMap and LinkedHashMap have O(1) average operations
//   - TreeMap keys are always sorted (uses a comparator function)
//   - All three support get, put, delete, has, keys, values, size

export class SimpleHashMap<K, V> {
  private map: Map<K, V> = new Map();

  put(key: K, value: V): void {
    this.map.set(key, value);
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  keys(): K[] {
    return Array.from(this.map.keys());
  }

  values(): V[] {
    return Array.from(this.map.values());
  }

  size(): number {
    return this.map.size;
  }

  clear(): void {
    this.map.clear();
  }
}

export class LinkedHashMap<K, V> {
  private map: Map<K, V> = new Map();

  put(key: K, value: V): void {
    // Delete first so re-inserting moves the key to the end
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, value);
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  keys(): K[] {
    return Array.from(this.map.keys());
  }

  values(): V[] {
    return Array.from(this.map.values());
  }

  entries(): [K, V][] {
    return Array.from(this.map.entries());
  }

  size(): number {
    return this.map.size;
  }

  clear(): void {
    this.map.clear();
  }

  /** Returns the first (oldest) key or undefined if empty */
  firstKey(): K | undefined {
    return this.map.keys().next().value;
  }

  /** Returns the last (newest) key or undefined if empty */
  lastKey(): K | undefined {
    let last: K | undefined;
    for (const key of this.map.keys()) {
      last = key;
    }
    return last;
  }
}

type Comparator<K> = (a: K, b: K) => number;

export class TreeMap<K, V> {
  private entries: Array<{ key: K; value: V }> = [];
  private readonly comparator: Comparator<K>;

  constructor(comparator?: Comparator<K>) {
    this.comparator = comparator ?? ((a: K, b: K) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }

  private findIndex(key: K): { found: boolean; index: number } {
    let lo = 0;
    let hi = this.entries.length - 1;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const cmp = this.comparator(this.entries[mid].key, key);
      if (cmp === 0) return { found: true, index: mid };
      if (cmp < 0) lo = mid + 1;
      else hi = mid - 1;
    }

    return { found: false, index: lo };
  }

  put(key: K, value: V): void {
    const { found, index } = this.findIndex(key);
    if (found) {
      this.entries[index].value = value;
    } else {
      this.entries.splice(index, 0, { key, value });
    }
  }

  get(key: K): V | undefined {
    const { found, index } = this.findIndex(key);
    return found ? this.entries[index].value : undefined;
  }

  has(key: K): boolean {
    return this.findIndex(key).found;
  }

  delete(key: K): boolean {
    const { found, index } = this.findIndex(key);
    if (found) {
      this.entries.splice(index, 1);
      return true;
    }
    return false;
  }

  keys(): K[] {
    return this.entries.map(e => e.key);
  }

  values(): V[] {
    return this.entries.map(e => e.value);
  }

  size(): number {
    return this.entries.length;
  }

  clear(): void {
    this.entries = [];
  }

  firstKey(): K | undefined {
    return this.entries.length > 0 ? this.entries[0].key : undefined;
  }

  lastKey(): K | undefined {
    return this.entries.length > 0 ? this.entries[this.entries.length - 1].key : undefined;
  }

  /** Returns all keys in [fromKey, toKey) range */
  subMapKeys(fromKey: K, toKey: K): K[] {
    return this.entries
      .filter(e => this.comparator(e.key, fromKey) >= 0 && this.comparator(e.key, toKey) < 0)
      .map(e => e.key);
  }
}
