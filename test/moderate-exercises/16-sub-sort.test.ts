import { subSort } from '../../src/moderate-exercises/16-sub-sort';

describe('subSort', () => {
  test('returns correct indices for middle unsorted subarray', () => {
    const arr = [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19];
    expect(subSort(arr)).toEqual([3, 9]);
  });

  test('returns [-1, -1] for already sorted array', () => {
    expect(subSort([1, 2, 3, 4, 5])).toEqual([-1, -1]);
  });

  test('returns correct indices for full array unsorted', () => {
    expect(subSort([5, 4, 3, 2, 1])).toEqual([0, 4]);
  });

  test('returns correct indices for unsorted start', () => {
    expect(subSort([3, 2, 1, 4, 5])).toEqual([0, 2]);
  });

  test('returns correct indices for unsorted end', () => {
    expect(subSort([1, 2, 3, 5, 4])).toEqual([3, 4]);
  });

  test('handles single element array', () => {
    expect(subSort([1])).toEqual([-1, -1]);
  });

  test('handles empty array', () => {
    expect(subSort([])).toEqual([-1, -1]);
  });

  test('handles array with duplicates', () => {
    const arr = [1, 2, 2, 2, 3, 3, 2, 4];
    expect(subSort(arr)).toEqual([4, 6]);
  });
});
