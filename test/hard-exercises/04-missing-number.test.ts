import { missingNumber } from '../../src/hard-exercises/04-missing-number';

describe('missingNumber', () => {
  test('missing number in the middle', () => {
    expect(missingNumber([0, 1, 2, 4, 5, 6])).toBe(3);
  });

  test('missing number at the start', () => {
    expect(missingNumber([1, 2, 3, 4, 5])).toBe(0);
  });

  test('missing number at the end', () => {
    expect(missingNumber([0, 1, 2, 3, 4])).toBe(5);
  });

  test('single element missing 0', () => {
    expect(missingNumber([1])).toBe(0);
  });

  test('single element missing 1', () => {
    expect(missingNumber([0])).toBe(1);
  });

  test('empty array (missing 0)', () => {
    expect(missingNumber([])).toBe(0);
  });
});
