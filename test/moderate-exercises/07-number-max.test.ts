import { numberMax } from '../../src/moderate-exercises/07-number-max';

describe('numberMax', () => {
  test('returns the larger of two positive numbers', () => {
    expect(numberMax(5, 10)).toBe(10);
    expect(numberMax(100, 42)).toBe(100);
  });

  test('returns the larger of two negative numbers', () => {
    expect(numberMax(-5, -10)).toBe(-5);
    expect(numberMax(-100, -42)).toBe(-42);
  });

  test('returns the positive number when one is negative', () => {
    expect(numberMax(-20, 10)).toBe(10);
    expect(numberMax(30, -1)).toBe(30);
  });

  test('returns either when both numbers are equal', () => {
    expect(numberMax(0, 0)).toBe(0);
    expect(numberMax(7, 7)).toBe(7);
    expect(numberMax(-5, -5)).toBe(-5);
  });

  test('works with edge values', () => {
    expect(numberMax(Number.MAX_SAFE_INTEGER, -100)).toBe(Number.MAX_SAFE_INTEGER);
    expect(numberMax(-100000, 0)).toBe(0); // Still large, but 32-bit safe
  });
});
