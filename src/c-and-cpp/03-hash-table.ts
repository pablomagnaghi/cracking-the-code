// 12.03. Hash Table vs STL Map
//
// Compare and contrast a hash table and an STL map. How is a hash table
// implemented? If the number of inputs is small, which data structure
// options can be used instead of a hash table?
//
// Adapted: implement a simple hash table with separate chaining and compare
// with the built-in Map. A hash table uses a hash function to map keys to
// bucket indices; collisions are resolved by chaining (linked lists or arrays
// in each bucket). An STL map (std::map) is typically a balanced BST with
// O(log n) operations and ordered keys, while a hash table provides O(1)
// average-case lookups.
//
// Approach:
//   - Maintain an array of buckets, each bucket being an array of [key, value] pairs.
//   - Use a simple string hash function to compute the bucket index.
//   - On collision, append to the bucket's chain and scan linearly.
//   - Support dynamic resizing when the load factor exceeds a threshold.
//
// Example:
//   const ht = new HashTable<string, number>();
//   ht.set("a", 1);
//   ht.get("a"); // 1
//
// Constraints:
//   - Keys must be strings.
//   - The table resizes when the load factor exceeds 0.75.

export class HashTable<V> {
  private buckets: Array<Array<[string, V]>>;
  private _size: number;
  private capacity: number;
  private readonly loadFactorThreshold = 0.75;

  constructor(initialCapacity: number = 16) {
    this.capacity = initialCapacity;
    this._size = 0;
    this.buckets = new Array(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }
  }

  get size(): number {
    return this._size;
  }

  private hash(key: string): number {
    let h = 0;
    for (let i = 0; i < key.length; i++) {
      h = (h * 31 + key.charCodeAt(i)) >>> 0; // unsigned 32-bit
    }
    return h % this.capacity;
  }

  set(key: string, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this._size++;

    if (this._size / this.capacity > this.loadFactorThreshold) {
      this.resize();
    }
  }

  get(key: string): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }

    return undefined;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this._size--;
        return true;
      }
    }

    return false;
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this._size = 0;
    this.buckets = new Array(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = [];
    }

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}
