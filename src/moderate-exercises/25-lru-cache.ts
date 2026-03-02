// LCCI 16.25. LRU Cache
//
// Design and build a "least recently used" cache, which evicts the least recently
// used item when the cache reaches capacity. The cache should map keys to values,
// allowing the following operations:
//
//   - get(key): Get the value (will always be positive) of the key if the key
//     exists in the cache, otherwise return -1.
//   - put(key, value): Set or insert the value if the key is not already present.
//     When the cache reached its capacity, invalidate the least recently used item
//     before inserting a new item.
//
// Example:
//   LRUCache cache = new LRUCache(2);
//   cache.put(1, 1);
//   cache.put(2, 2);
//   cache.get(1);       // returns 1
//   cache.put(3, 3);    // evicts key 2
//   cache.get(2);       // returns -1 (not found)
//   cache.put(4, 4);    // evicts key 1
//   cache.get(1);       // returns -1 (not found)
//   cache.get(3);       // returns 3
//   cache.get(4);       // returns 4

class Node<K, V> {
  key: K;
  value: V;
  prev: Node<K, V> | null = null;
  next: Node<K, V> | null = null;
  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, Node<K, V>>;
  private head: Node<K, V> | null = null; // most recently used
  private tail: Node<K, V> | null = null; // least recently used

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: K): V | null {
    const node = this.cache.get(key);
    if (!node) return null;

    // Move node to front (most recently used)
    this.moveToHead(node);
    return node.value;
  }

  put(key: K, value: V): void {
    const node = this.cache.get(key);
    if (node) {
      // Update value and move to front
      node.value = value;
      this.moveToHead(node);
    } else {
      // New node
      const newNode = new Node(key, value);
      if (this.cache.size >= this.capacity) {
        // Evict least recently used (tail)
        if (this.tail) {
          this.cache.delete(this.tail.key);
          this.removeNode(this.tail);
        }
      }
      this.addNodeToHead(newNode);
      this.cache.set(key, newNode);
    }
  }

  private moveToHead(node: Node<K, V>): void {
    if (node === this.head) return;
    this.removeNode(node);
    this.addNodeToHead(node);
  }

  private removeNode(node: Node<K, V>): void {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    node.prev = null;
    node.next = null;
  }

  private addNodeToHead(node: Node<K, V>): void {
    node.next = this.head;
    node.prev = null;

    if (this.head) this.head.prev = node;
    this.head = node;

    if (!this.tail) this.tail = node;
  }
}
