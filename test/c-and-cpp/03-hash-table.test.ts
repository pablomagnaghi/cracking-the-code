import { HashTable } from '../../src/c-and-cpp/03-hash-table';

describe('HashTable', () => {
  test('sets and gets a value', () => {
    const ht = new HashTable<number>();
    ht.set('key1', 42);
    expect(ht.get('key1')).toBe(42);
  });

  test('returns undefined for missing keys', () => {
    const ht = new HashTable<string>();
    expect(ht.get('nonexistent')).toBeUndefined();
  });

  test('overwrites existing keys', () => {
    const ht = new HashTable<number>();
    ht.set('a', 1);
    ht.set('a', 2);
    expect(ht.get('a')).toBe(2);
    expect(ht.size).toBe(1);
  });

  test('has() returns correct boolean', () => {
    const ht = new HashTable<number>();
    ht.set('x', 10);
    expect(ht.has('x')).toBe(true);
    expect(ht.has('y')).toBe(false);
  });

  test('deletes a key', () => {
    const ht = new HashTable<number>();
    ht.set('del', 99);
    expect(ht.delete('del')).toBe(true);
    expect(ht.get('del')).toBeUndefined();
    expect(ht.size).toBe(0);
  });

  test('delete returns false for missing keys', () => {
    const ht = new HashTable<number>();
    expect(ht.delete('nothing')).toBe(false);
  });

  test('handles many insertions (triggers resize)', () => {
    const ht = new HashTable<number>(4); // small initial capacity
    for (let i = 0; i < 50; i++) {
      ht.set(`key${i}`, i);
    }
    expect(ht.size).toBe(50);
    for (let i = 0; i < 50; i++) {
      expect(ht.get(`key${i}`)).toBe(i);
    }
  });

  test('handles string values', () => {
    const ht = new HashTable<string>();
    ht.set('greeting', 'hello');
    ht.set('farewell', 'goodbye');
    expect(ht.get('greeting')).toBe('hello');
    expect(ht.get('farewell')).toBe('goodbye');
  });

  test('tracks size correctly through insertions and deletions', () => {
    const ht = new HashTable<number>();
    expect(ht.size).toBe(0);
    ht.set('a', 1);
    ht.set('b', 2);
    ht.set('c', 3);
    expect(ht.size).toBe(3);
    ht.delete('b');
    expect(ht.size).toBe(2);
  });

  test('handles empty string as key', () => {
    const ht = new HashTable<number>();
    ht.set('', 0);
    expect(ht.get('')).toBe(0);
    expect(ht.has('')).toBe(true);
  });
});
