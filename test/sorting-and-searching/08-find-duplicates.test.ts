import { findDuplicates } from '../../src/sorting-and-searching/08-find-duplicates';

describe('findDuplicates', () => {
  test('finds duplicates in array with multiple duplicates', () => {
    const arr = [1, 2, 3, 2, 4, 5, 1, 6];
    const result = findDuplicates(arr);
    expect(result.sort()).toEqual([1, 2]);
  });

  test('returns empty array if no duplicates', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(findDuplicates(arr)).toEqual([]);
  });

  test('returns all duplicates even if repeated multiple times', () => {
    const arr = [7, 7, 7, 7, 7];
    expect(findDuplicates(arr)).toEqual([7]);
  });

  test('handles empty array', () => {
    expect(findDuplicates([])).toEqual([]);
  });

  test('handles array with one element', () => {
    expect(findDuplicates([10])).toEqual([]);
  });
});
