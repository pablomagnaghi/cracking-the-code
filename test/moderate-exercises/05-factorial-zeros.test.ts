import { countTrailingZeros } from '../../src/moderate-exercises/05-factorial-zeros';

describe('countTrailingZeros', () => {
  test('returns 0 for n < 5', () => {
    expect(countTrailingZeros(0)).toBe(0);
    expect(countTrailingZeros(3)).toBe(0);
    expect(countTrailingZeros(4)).toBe(0);
  });

  test('returns 1 for 5!', () => {
    expect(countTrailingZeros(5)).toBe(1); // 5! = 120
  });

  test('returns correct count for 10!', () => {
    expect(countTrailingZeros(10)).toBe(2); // 10! = 3628800
  });

  test('returns correct count for 25!', () => {
    expect(countTrailingZeros(25)).toBe(6); // 5 + 1 (25 contributes an extra 5)
  });

  test('returns correct count for 100!', () => {
    expect(countTrailingZeros(100)).toBe(24);
  });

  test('handles large input like 1000', () => {
    expect(countTrailingZeros(1000)).toBe(249);
  });
});
