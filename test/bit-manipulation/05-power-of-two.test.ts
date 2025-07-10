import { isPowerOfTwo } from '../../src/bit-manipulation/05-power-of-two';

describe('isPowerOfTwo', () => {
  test('returns true for powers of two', () => {
    expect(isPowerOfTwo(1)).toBe(true); // 2^0
    expect(isPowerOfTwo(2)).toBe(true); // 2^1
    expect(isPowerOfTwo(4)).toBe(true); // 2^2
    expect(isPowerOfTwo(8)).toBe(true); // 2^3
    expect(isPowerOfTwo(1024)).toBe(true); // 2^10
  });

  test('returns false for numbers that are not powers of two', () => {
    expect(isPowerOfTwo(0)).toBe(false); // edge case
    expect(isPowerOfTwo(3)).toBe(false);
    expect(isPowerOfTwo(5)).toBe(false);
    expect(isPowerOfTwo(6)).toBe(false);
    expect(isPowerOfTwo(9)).toBe(false);
    expect(isPowerOfTwo(1000)).toBe(false);
  });

  test('handles large power of two correctly', () => {
    expect(isPowerOfTwo(2 ** 30)).toBe(true);
  });

  test('handles negative numbers', () => {
    expect(isPowerOfTwo(-1)).toBe(false);
    expect(isPowerOfTwo(-2)).toBe(false);
    expect(isPowerOfTwo(-8)).toBe(false);
  });
});
