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

  test('returns true for 2^20 (1048576)', () => {
    expect(isPowerOfTwo(1048576)).toBe(true);
  });

  test('returns false for numbers just above/below powers of two', () => {
    expect(isPowerOfTwo(255)).toBe(false); // 2^8 - 1
    expect(isPowerOfTwo(257)).toBe(false); // 2^8 + 1
  });

  test('verifies n & (n-1) clears lowest set bit for non-powers', () => {
    // 6 = 0110, 5 = 0101 -> 6 & 5 = 0100 (not 0, so not a power of two)
    expect(isPowerOfTwo(6)).toBe(false);
    // 12 = 1100, 11 = 1011 -> 12 & 11 = 1000 (not 0, so not a power of two)
    expect(isPowerOfTwo(12)).toBe(false);
    // 10 = 1010, 9 = 1001 -> 10 & 9 = 1000 (not 0, so not a power of two)
    expect(isPowerOfTwo(10)).toBe(false);
  });

  test('returns true for all powers of two up to 2^15', () => {
    for (let i = 0; i <= 15; i++) {
      expect(isPowerOfTwo(2 ** i)).toBe(true);
    }
  });

  test('returns false for composite numbers near small powers of two', () => {
    expect(isPowerOfTwo(7)).toBe(false);   // 2^3 - 1
    expect(isPowerOfTwo(9)).toBe(false);   // 2^3 + 1
    expect(isPowerOfTwo(15)).toBe(false);  // 2^4 - 1
    expect(isPowerOfTwo(17)).toBe(false);  // 2^4 + 1
    expect(isPowerOfTwo(31)).toBe(false);  // 2^5 - 1
    expect(isPowerOfTwo(33)).toBe(false);  // 2^5 + 1
  });
});
