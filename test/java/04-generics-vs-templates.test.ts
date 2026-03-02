import {
  TypedContainer,
  Pair,
  filterByType,
  merge,
  mapArray,
  findFirst,
} from '../../src/java/04-generics-vs-templates';

describe('TypedContainer', () => {
  test('stores and retrieves a value', () => {
    const c = new TypedContainer(42);
    expect(c.getValue()).toBe(42);
  });

  test('map transforms the contained value', () => {
    const c = new TypedContainer(10);
    const doubled = c.map(x => x * 2);
    expect(doubled.getValue()).toBe(20);
  });

  test('map can change the type', () => {
    const c = new TypedContainer(5);
    const asString = c.map(x => `value: ${x}`);
    expect(asString.getValue()).toBe('value: 5');
  });

  test('flatMap unwraps nested containers', () => {
    const c = new TypedContainer(3);
    const result = c.flatMap(x => new TypedContainer(x + 7));
    expect(result.getValue()).toBe(10);
  });

  test('equals compares contained values', () => {
    const a = new TypedContainer('hello');
    const b = new TypedContainer('hello');
    const c = new TypedContainer('world');
    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });

  test('toString produces a readable string', () => {
    expect(new TypedContainer(42).toString()).toBe('Container(42)');
  });

  test('chained maps work correctly', () => {
    const result = new TypedContainer(2)
      .map(x => x + 3)
      .map(x => x * 10)
      .getValue();
    expect(result).toBe(50);
  });
});

describe('Pair', () => {
  test('stores two values of different types', () => {
    const p = new Pair('key', 100);
    expect(p.getFirst()).toBe('key');
    expect(p.getSecond()).toBe(100);
  });

  test('swap reverses the pair', () => {
    const p = new Pair('a', 1);
    const swapped = p.swap();
    expect(swapped.getFirst()).toBe(1);
    expect(swapped.getSecond()).toBe('a');
  });

  test('mapFirst transforms the first element', () => {
    const p = new Pair(5, 'hello');
    const mapped = p.mapFirst(x => x * 2);
    expect(mapped.getFirst()).toBe(10);
    expect(mapped.getSecond()).toBe('hello');
  });

  test('mapSecond transforms the second element', () => {
    const p = new Pair('hi', 3);
    const mapped = p.mapSecond(x => x + 1);
    expect(mapped.getFirst()).toBe('hi');
    expect(mapped.getSecond()).toBe(4);
  });

  test('toArray returns a tuple', () => {
    const p = new Pair(true, 42);
    expect(p.toArray()).toEqual([true, 42]);
  });

  test('toString produces a readable string', () => {
    expect(new Pair('x', 'y').toString()).toBe('(x, y)');
  });
});

describe('filterByType', () => {
  test('filters numbers by predicate', () => {
    const result = filterByType([1, 2, 3, 4, 5], x => x > 3);
    expect(result).toEqual([4, 5]);
  });

  test('returns empty array when no matches', () => {
    const result = filterByType(['a', 'b'], s => s.length > 5);
    expect(result).toEqual([]);
  });
});

describe('merge', () => {
  test('merges two objects preserving all properties', () => {
    const a = { x: 1, y: 2 };
    const b = { z: 3 };
    const result = merge(a, b);
    expect(result).toEqual({ x: 1, y: 2, z: 3 });
  });

  test('second object properties override first', () => {
    const a = { x: 1, y: 2 };
    const b = { y: 99, z: 3 };
    const result = merge(a, b);
    expect(result).toEqual({ x: 1, y: 99, z: 3 });
  });
});

describe('mapArray', () => {
  test('maps values through a function', () => {
    expect(mapArray([1, 2, 3], x => x * x)).toEqual([1, 4, 9]);
  });
});

describe('findFirst', () => {
  test('finds the first matching element', () => {
    expect(findFirst([10, 20, 30], x => x > 15)).toBe(20);
  });

  test('returns undefined when no match', () => {
    expect(findFirst([1, 2, 3], x => x > 100)).toBeUndefined();
  });
});
