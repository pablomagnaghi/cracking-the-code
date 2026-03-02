import {
  SimpleHashMap,
  LinkedHashMap,
  TreeMap,
} from '../../src/java/05-treemap-hashmap-linkedhashmap';

describe('SimpleHashMap', () => {
  test('put and get work correctly', () => {
    const map = new SimpleHashMap<string, number>();
    map.put('a', 1);
    map.put('b', 2);
    expect(map.get('a')).toBe(1);
    expect(map.get('b')).toBe(2);
  });

  test('get returns undefined for missing keys', () => {
    const map = new SimpleHashMap<string, number>();
    expect(map.get('missing')).toBeUndefined();
  });

  test('has checks existence', () => {
    const map = new SimpleHashMap<string, number>();
    map.put('x', 10);
    expect(map.has('x')).toBe(true);
    expect(map.has('y')).toBe(false);
  });

  test('delete removes a key', () => {
    const map = new SimpleHashMap<string, number>();
    map.put('a', 1);
    expect(map.delete('a')).toBe(true);
    expect(map.has('a')).toBe(false);
    expect(map.size()).toBe(0);
  });

  test('put overwrites existing values', () => {
    const map = new SimpleHashMap<string, number>();
    map.put('key', 1);
    map.put('key', 2);
    expect(map.get('key')).toBe(2);
    expect(map.size()).toBe(1);
  });

  test('size and clear work correctly', () => {
    const map = new SimpleHashMap<number, string>();
    map.put(1, 'a');
    map.put(2, 'b');
    expect(map.size()).toBe(2);
    map.clear();
    expect(map.size()).toBe(0);
  });
});

describe('LinkedHashMap', () => {
  test('preserves insertion order', () => {
    const map = new LinkedHashMap<string, number>();
    map.put('banana', 2);
    map.put('apple', 1);
    map.put('cherry', 3);
    expect(map.keys()).toEqual(['banana', 'apple', 'cherry']);
  });

  test('re-inserting a key moves it to the end', () => {
    const map = new LinkedHashMap<string, number>();
    map.put('a', 1);
    map.put('b', 2);
    map.put('c', 3);
    map.put('a', 10); // re-insert 'a'
    expect(map.keys()).toEqual(['b', 'c', 'a']);
    expect(map.get('a')).toBe(10);
  });

  test('entries returns key-value pairs in order', () => {
    const map = new LinkedHashMap<string, number>();
    map.put('x', 1);
    map.put('y', 2);
    expect(map.entries()).toEqual([['x', 1], ['y', 2]]);
  });

  test('firstKey and lastKey return correct keys', () => {
    const map = new LinkedHashMap<string, number>();
    map.put('first', 1);
    map.put('middle', 2);
    map.put('last', 3);
    expect(map.firstKey()).toBe('first');
    expect(map.lastKey()).toBe('last');
  });

  test('delete removes and maintains order of remaining', () => {
    const map = new LinkedHashMap<string, number>();
    map.put('a', 1);
    map.put('b', 2);
    map.put('c', 3);
    map.delete('b');
    expect(map.keys()).toEqual(['a', 'c']);
    expect(map.size()).toBe(2);
  });

  test('values returns values in insertion order', () => {
    const map = new LinkedHashMap<string, number>();
    map.put('z', 26);
    map.put('a', 1);
    expect(map.values()).toEqual([26, 1]);
  });
});

describe('TreeMap', () => {
  test('keys are always sorted', () => {
    const map = new TreeMap<string, number>();
    map.put('cherry', 3);
    map.put('apple', 1);
    map.put('banana', 2);
    expect(map.keys()).toEqual(['apple', 'banana', 'cherry']);
  });

  test('numeric keys are sorted numerically', () => {
    const map = new TreeMap<number, string>((a, b) => a - b);
    map.put(30, 'thirty');
    map.put(10, 'ten');
    map.put(20, 'twenty');
    expect(map.keys()).toEqual([10, 20, 30]);
    expect(map.values()).toEqual(['ten', 'twenty', 'thirty']);
  });

  test('put overwrites existing key value', () => {
    const map = new TreeMap<string, number>();
    map.put('a', 1);
    map.put('a', 99);
    expect(map.get('a')).toBe(99);
    expect(map.size()).toBe(1);
  });

  test('firstKey and lastKey return min and max', () => {
    const map = new TreeMap<number, string>((a, b) => a - b);
    map.put(5, 'five');
    map.put(1, 'one');
    map.put(9, 'nine');
    expect(map.firstKey()).toBe(1);
    expect(map.lastKey()).toBe(9);
  });

  test('delete removes and maintains sorted order', () => {
    const map = new TreeMap<string, number>();
    map.put('c', 3);
    map.put('a', 1);
    map.put('b', 2);
    map.delete('a');
    expect(map.keys()).toEqual(['b', 'c']);
    expect(map.has('a')).toBe(false);
  });

  test('subMapKeys returns keys in range [from, to)', () => {
    const map = new TreeMap<number, string>((a, b) => a - b);
    map.put(1, 'a');
    map.put(3, 'c');
    map.put(5, 'e');
    map.put(7, 'g');
    map.put(9, 'i');
    expect(map.subMapKeys(3, 8)).toEqual([3, 5, 7]);
  });

  test('get returns undefined for missing keys', () => {
    const map = new TreeMap<string, number>();
    expect(map.get('nope')).toBeUndefined();
  });

  test('clear empties the map', () => {
    const map = new TreeMap<string, number>();
    map.put('a', 1);
    map.put('b', 2);
    map.clear();
    expect(map.size()).toBe(0);
    expect(map.keys()).toEqual([]);
  });
});
