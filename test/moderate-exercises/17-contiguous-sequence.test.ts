import { maxContiguousSequence } from '../../src/moderate-exercises/17-contiguous-sequence';

describe('maxContiguousSequence', () => {
  test('returns max sum for positive and negative numbers', () => {
    const arr = [-2, 3, 5, -1, 4, -5, 2];
    expect(maxContiguousSequence(arr)).toBe(11); // 3+5-1+4=11
  });

  test('returns max sum for all negative numbers', () => {
    const arr = [-3, -5, -2, -8];
    expect(maxContiguousSequence(arr)).toBe(-2); // max single element -2
  });

  test('returns max sum for all positive numbers', () => {
    const arr = [1, 2, 3, 4];
    expect(maxContiguousSequence(arr)).toBe(10); // sum whole array
  });

  test('returns max sum for empty array', () => {
    expect(maxContiguousSequence([])).toBe(-Infinity);
  });

  test('returns max sum when max is single element', () => {
    const arr = [-1, -2, 7, -3, -4];
    expect(maxContiguousSequence(arr)).toBe(7);
  });

  test('returns max sum for single element array', () => {
    expect(maxContiguousSequence([5])).toBe(5);
  });
});
