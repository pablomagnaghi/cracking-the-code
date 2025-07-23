import { randomSet } from '../../src/hard-exercises/03-random-set';

describe('randomSet', () => {
  test('returns m unique integers from array', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const m = 3;
    const result = randomSet(arr, m);

    expect(result).toHaveLength(m);

    // All elements in result should be from original array
    result.forEach((num) => {
      expect(arr).toContain(num);
    });

    // Result should have unique values
    const unique = new Set(result);
    expect(unique.size).toBe(m);
  });

  test('returns entire array if m equals array length', () => {
    const arr = [10, 20, 30];
    const m = arr.length;
    const result = randomSet(arr, m);

    expect(result.sort()).toEqual(arr.sort());
  });

  test('throws error if m is larger than array length', () => {
    const arr = [1, 2, 3];
    const m = 5;

    expect(() => randomSet(arr, m)).toThrow('m cannot be larger than the array length');
  });
});
