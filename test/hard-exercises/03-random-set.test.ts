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

  test('returns empty array when m is 0', () => {
    const result = randomSet([1, 2, 3], 0);
    expect(result).toHaveLength(0);
  });

  test('returns single element when m is 1', () => {
    const arr = [10, 20, 30, 40, 50];
    const result = randomSet(arr, 1);
    expect(result).toHaveLength(1);
    expect(arr).toContain(result[0]);
  });

  test('does not mutate the original array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const copy = [...arr];
    randomSet(arr, 4);
    expect(arr).toEqual(copy);
  });

  test('each element has roughly equal probability of being chosen', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const m = 4;
    const counts = Array(10).fill(0);
    const iterations = 50000;

    for (let i = 0; i < iterations; i++) {
      const result = randomSet(arr, m);
      for (const val of result) {
        counts[val - 1]++;
      }
    }

    // Each element should appear m/n = 40% of the time
    const expected = (iterations * m) / arr.length;
    const tolerance = expected * 0.05;
    for (const count of counts) {
      expect(count).toBeGreaterThanOrEqual(expected - tolerance);
      expect(count).toBeLessThanOrEqual(expected + tolerance);
    }
  });

  test('handles large array and selection', () => {
    const arr = Array.from({ length: 100 }, (_, i) => i + 1);
    const result = randomSet(arr, 50);
    expect(result).toHaveLength(50);
    // All elements should be unique
    expect(new Set(result).size).toBe(50);
    // All elements should be from the original array
    for (const val of result) {
      expect(arr).toContain(val);
    }
  });
});
