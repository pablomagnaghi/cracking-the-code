// 16.25 LRU Cache
//
// Problem:
// Implement an LRU (Least Recently Used) cache with given capacity.
// It should support get(key) and put(key, value) operations,
// both in O(1) time complexity.
//
// Use a combination of a doubly linked list and a hash map
// to track recent usage and allow quick lookups and eviction.

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
