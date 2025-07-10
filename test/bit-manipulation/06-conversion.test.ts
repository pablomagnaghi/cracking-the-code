import { bitFlipConversion } from '../../src/bit-manipulation/06-conversion';

describe('bitFlipConversion', () => {
  test('returns 0 when both numbers are the same', () => {
    expect(bitFlipConversion(10, 10)).toBe(0);
  });

  test('returns correct number of differing bits', () => {
    // 29 = 11101, 15 = 01111 → 2 differing bits
    expect(bitFlipConversion(29, 15)).toBe(2);
  });

  test('returns correct flip count for one zero', () => {
    // 0 = 00000, 15 = 01111 → 4 bits to flip
    expect(bitFlipConversion(0, 15)).toBe(4);
  });

  test('returns correct flip count when bits are reversed', () => {
    // 1 = 0001, 8 = 1000 → 2 flips needed
    expect(bitFlipConversion(1, 8)).toBe(2);
  });

  test('handles large values correctly', () => {
    const a = 0b1010101010101010;
    const b = 0b0101010101010101;
    // Every bit is different → 16 flips
    expect(bitFlipConversion(a, b)).toBe(16);
  });
});
