import { getRandomSubset, getAllRandomSubsets } from '../../src/java/08-lambda-random';

describe('getRandomSubset', () => {
  test('returns a subset of the correct size', () => {
    const list = [1, 2, 3, 4, 5];
    const subset = getRandomSubset(list, 3);
    expect(subset).toHaveLength(3);
  });

  test('all elements in subset come from the original list', () => {
    const list = [10, 20, 30, 40, 50];
    const subset = getRandomSubset(list, 4);
    for (const item of subset) {
      expect(list).toContain(item);
    }
  });

  test('subset contains no duplicates', () => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const subset = getRandomSubset(list, 5);
    const unique = new Set(subset);
    expect(unique.size).toBe(5);
  });

  test('returns empty array when k is 0', () => {
    expect(getRandomSubset([1, 2, 3], 0)).toEqual([]);
  });

  test('returns full list when k equals list length', () => {
    const list = [1, 2, 3];
    const subset = getRandomSubset(list, 3);
    expect(subset).toHaveLength(3);
    expect(subset.sort()).toEqual([1, 2, 3]);
  });

  test('throws when k is greater than list length', () => {
    expect(() => getRandomSubset([1, 2], 5)).toThrow();
  });

  test('throws when k is negative', () => {
    expect(() => getRandomSubset([1, 2], -1)).toThrow();
  });

  test('produces deterministic results with a seeded rng', () => {
    const list = [1, 2, 3, 4, 5];
    let seed = 0.42;
    const rng = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const seedBackup = 0.42;
    let seed2 = seedBackup;
    const rng2 = () => {
      seed2 = (seed2 * 9301 + 49297) % 233280;
      return seed2 / 233280;
    };

    const a = getRandomSubset(list, 3, rng);
    const b = getRandomSubset(list, 3, rng2);
    expect(a).toEqual(b);
  });

  test('works with non-number types', () => {
    const list = ['apple', 'banana', 'cherry', 'date'];
    const subset = getRandomSubset(list, 2);
    expect(subset).toHaveLength(2);
    for (const item of subset) {
      expect(list).toContain(item);
    }
  });

  test('does not modify the original list', () => {
    const list = [1, 2, 3, 4, 5];
    const copy = [...list];
    getRandomSubset(list, 3);
    expect(list).toEqual(copy);
  });
});

describe('getAllRandomSubsets', () => {
  test('returns the correct number of subsets', () => {
    const result = getAllRandomSubsets([1, 2, 3, 4, 5], 2, 4);
    expect(result).toHaveLength(4);
  });

  test('each subset has the correct size', () => {
    const result = getAllRandomSubsets([1, 2, 3, 4, 5], 3, 5);
    for (const subset of result) {
      expect(subset).toHaveLength(3);
    }
  });

  test('returns empty array when count is 0', () => {
    expect(getAllRandomSubsets([1, 2, 3], 2, 0)).toEqual([]);
  });

  test('throws when count is negative', () => {
    expect(() => getAllRandomSubsets([1, 2], 1, -1)).toThrow();
  });

  test('each subset contains elements from the original list', () => {
    const list = [10, 20, 30, 40];
    const subsets = getAllRandomSubsets(list, 2, 3);
    for (const subset of subsets) {
      for (const item of subset) {
        expect(list).toContain(item);
      }
    }
  });

  test('works with string types', () => {
    const list = ['a', 'b', 'c', 'd'];
    const subsets = getAllRandomSubsets(list, 2, 3);
    expect(subsets).toHaveLength(3);
    for (const subset of subsets) {
      expect(subset).toHaveLength(2);
    }
  });
});
