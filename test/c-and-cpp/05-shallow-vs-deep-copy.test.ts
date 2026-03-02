import { shallowCopy, deepCopy } from '../../src/c-and-cpp/05-shallow-vs-deep-copy';

describe('shallowCopy', () => {
  test('copies a flat object', () => {
    const original = { a: 1, b: 'hello' };
    const copy = shallowCopy(original);
    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
  });

  test('nested objects share references', () => {
    const original = { x: 1, nested: { y: 2 } };
    const copy = shallowCopy(original);
    copy.nested.y = 99;
    expect(original.nested.y).toBe(99); // shared reference
  });

  test('copies an array (shallow)', () => {
    const original = [1, [2, 3], 4];
    const copy = shallowCopy(original);
    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    (copy[1] as number[])[0] = 99;
    expect((original[1] as number[])[0]).toBe(99); // shared reference
  });

  test('returns primitives unchanged', () => {
    expect(shallowCopy(42)).toBe(42);
    expect(shallowCopy('str')).toBe('str');
    expect(shallowCopy(null)).toBeNull();
  });
});

describe('deepCopy', () => {
  test('deep copies a nested object', () => {
    const original = { x: 1, nested: { y: 2, deep: { z: 3 } } };
    const copy = deepCopy(original);
    expect(copy).toEqual(original);
    copy.nested.deep.z = 999;
    expect(original.nested.deep.z).toBe(3); // independent
  });

  test('deep copies an array with nested objects', () => {
    const original = [{ a: 1 }, { b: [2, 3] }];
    const copy = deepCopy(original);
    expect(copy).toEqual(original);
    copy[0].a = 99;
    expect(original[0].a).toBe(1);
  });

  test('deep copies a Date', () => {
    const original = { created: new Date('2024-01-01') };
    const copy = deepCopy(original);
    expect(copy.created).toEqual(original.created);
    expect(copy.created).not.toBe(original.created);
  });

  test('deep copies a Map', () => {
    const original = new Map<string, number[]>([['key', [1, 2, 3]]]);
    const copy = deepCopy(original);
    expect(copy.get('key')).toEqual([1, 2, 3]);
    copy.get('key')!.push(4);
    expect(original.get('key')).toEqual([1, 2, 3]); // independent
  });

  test('deep copies a Set', () => {
    const original = new Set([1, 2, 3]);
    const copy = deepCopy(original);
    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
  });

  test('handles circular references', () => {
    const obj: Record<string, unknown> = { a: 1 };
    obj.self = obj;
    const copy = deepCopy(obj);
    expect(copy.a).toBe(1);
    expect(copy.self).toBe(copy); // circular ref preserved
    expect(copy.self).not.toBe(obj); // but different object
  });

  test('returns primitives unchanged', () => {
    expect(deepCopy(42)).toBe(42);
    expect(deepCopy('hello')).toBe('hello');
    expect(deepCopy(null)).toBeNull();
    expect(deepCopy(undefined)).toBeUndefined();
  });
});
