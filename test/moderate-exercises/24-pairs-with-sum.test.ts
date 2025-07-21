import { pairsWithSum } from '../../src/moderate-exercises/24-pairs-with-sum';

describe('pairsWithSum', () => {
  test('finds pairs that sum to target', () => {
    const arr = [1, 2, 3, 4, 5];
    const target = 5;
    const expectedPairs = [
      [1, 4],
      [2, 3],
    ];
    expect(pairsWithSum(arr, target)).toEqual(expect.arrayContaining(expectedPairs));
    expect(pairsWithSum(arr, target).length).toBe(expectedPairs.length);
  });

  test('handles empty array', () => {
    expect(pairsWithSum([], 5)).toEqual([]);
  });

  test('handles no pairs found', () => {
    expect(pairsWithSum([1, 2, 3], 10)).toEqual([]);
  });

  test('handles duplicates correctly', () => {
    const arr = [1, 3, 2, 2, 4];
    const target = 4;
    const expectedPairs = [
      [1, 3],
      [2, 2],
    ];
    expect(pairsWithSum(arr, target)).toEqual(expect.arrayContaining(expectedPairs));
    expect(pairsWithSum(arr, target).length).toBe(expectedPairs.length);
  });

  test('handles negative numbers', () => {
    const arr = [-1, 1, 2, 3, 4];
    const target = 3;
    const expectedPairs = [
      [-1, 4],
      [1, 2],
    ];
    expect(pairsWithSum(arr, target)).toEqual(expect.arrayContaining(expectedPairs));
    expect(pairsWithSum(arr, target).length).toBe(expectedPairs.length);
  });
});
