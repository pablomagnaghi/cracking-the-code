import { smallestK, smallestKQuickselect } from '../../src/hard-exercises/14-smallest-k';

describe('smallestK', () => {
  test('returns the k smallest elements', () => {
    const arr = [7, 10, 4, 3, 20, 15];
    expect(smallestK(arr, 3).sort((a, b) => a - b)).toEqual([3, 4, 7]);
  });

  test('returns empty array when k is 0', () => {
    expect(smallestK([1, 2, 3], 0)).toEqual([]);
  });

  test('returns whole array when k >= array length', () => {
    const arr = [5, 8, 1];
    expect(smallestK(arr, 5).sort((a, b) => a - b)).toEqual([1, 5, 8]);
  });

  test('works with negative numbers', () => {
    const arr = [-1, -5, 3, 0];
    expect(smallestK(arr, 2).sort((a, b) => a - b)).toEqual([-5, -1]);
  });

  test('works with duplicate numbers', () => {
    const arr = [2, 1, 2, 3, 1];
    expect(smallestK(arr, 2).sort((a, b) => a - b)).toEqual([1, 1]);
  });

  test('works with single element array', () => {
    expect(smallestK([42], 1)).toEqual([42]);
  });
});

describe('smallestKQuickselect', () => {
  test('returns the k smallest elements', () => {
    const arr = [7, 10, 4, 3, 20, 15];
    expect(smallestKQuickselect(arr, 3).sort((a, b) => a - b)).toEqual([3, 4, 7]);
  });

  test('returns empty array when k is 0', () => {
    expect(smallestKQuickselect([1, 2, 3], 0)).toEqual([]);
  });

  test('returns whole array when k >= array length', () => {
    const arr = [5, 8, 1];
    expect(smallestKQuickselect(arr, 5).sort((a, b) => a - b)).toEqual([1, 5, 8]);
  });

  test('works with negative numbers', () => {
    const arr = [-1, -5, 3, 0];
    expect(smallestKQuickselect(arr, 2).sort((a, b) => a - b)).toEqual([-5, -1]);
  });

  test('works with duplicate numbers', () => {
    const arr = [2, 1, 2, 3, 1];
    expect(smallestKQuickselect(arr, 2).sort((a, b) => a - b)).toEqual([1, 1]);
  });

  test('works with single element array', () => {
    expect(smallestKQuickselect([42], 1)).toEqual([42]);
  });
});
