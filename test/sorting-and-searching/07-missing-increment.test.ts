import { findMissingIncrement } from '../../src/sorting-and-searching/07-missing-increment';

describe('findMissingIncrement', () => {
  test('finds missing number in the middle of sequence', () => {
    const arr = [1, 2, 3, 5, 6];
    expect(findMissingIncrement(arr)).toBe(4);
  });

  test('finds missing number at the start', () => {
    const arr = [2, 3, 4, 5];
    expect(findMissingIncrement(arr)).toBe(1);
  });

  test('finds missing number at the end', () => {
    const arr = [1, 2, 3, 4, 5, 6, 8];
    expect(findMissingIncrement(arr)).toBe(7);
  });

  test('returns null if no missing number', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(findMissingIncrement(arr)).toBe(null);
  });

  test('returns null if array is too short', () => {
    expect(findMissingIncrement([])).toBe(null);
    expect(findMissingIncrement([1])).toBe(null);
  });

  test('handles negative numbers', () => {
    const arr = [-3, -2, -1, 1, 2];
    expect(findMissingIncrement(arr)).toBe(0);
  });
});
