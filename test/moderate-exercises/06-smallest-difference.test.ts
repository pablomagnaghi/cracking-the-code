import { smallestDifference } from '../../src/moderate-exercises/06-smallest-difference';

describe('smallestDifference', () => {
  test('returns smallest difference for simple case', () => {
    const arr1 = [1, 3, 15, 11, 2];
    const arr2 = [23, 127, 235, 19, 8];
    expect(smallestDifference(arr1, arr2)).toBe(3); // 11 - 8 = 3
  });

  test('returns 0 when common elements exist', () => {
    const arr1 = [5, 10, 20];
    const arr2 = [1, 5, 15];
    expect(smallestDifference(arr1, arr2)).toBe(0); // common element 5
  });

  test('returns correct result for negative numbers', () => {
    const arr1 = [-10, -5, 1, 10];
    const arr2 = [5, 15, 20];
    expect(smallestDifference(arr1, arr2)).toBe(4); // 1 and 5 => diff = 4
  });

  test('returns Infinity for empty second array', () => {
    expect(smallestDifference([1, 2, 3], [])).toBe(Infinity);
  });

  test('returns Infinity for empty first array', () => {
    expect(smallestDifference([], [4, 5, 6])).toBe(Infinity);
  });

  test('returns Infinity for both arrays empty', () => {
    expect(smallestDifference([], [])).toBe(Infinity);
  });
});
