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

  test('finds duplicates when all elements are the same', () => {
    expect(findDuplicates([3, 3, 3])).toEqual([3]);
  });

  test('finds multiple distinct duplicates', () => {
    const result = findDuplicates([1, 2, 3, 4, 5, 1, 2, 3]);
    expect(result.sort()).toEqual([1, 2, 3]);
  });

  test('finds duplicates in array with numbers 1 to N', () => {
    const result = findDuplicates([1, 5, 1, 10, 12, 10]);
    expect(result.sort()).toEqual([1, 10]);
  });

  test('finds duplicates when every element is duplicated', () => {
    const result = findDuplicates([4, 2, 4, 2, 1, 1]);
    expect(result.sort()).toEqual([1, 2, 4]);
  });

  test('handles large range of numbers with few duplicates', () => {
    const arr = Array.from({ length: 100 }, (_, i) => i + 1);
    arr.push(50, 75); // add two duplicates
    const result = findDuplicates(arr);
    expect(result.sort((a, b) => a - b)).toEqual([50, 75]);
  });
});
