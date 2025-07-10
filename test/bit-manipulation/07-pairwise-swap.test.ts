import { pairwiseSwap } from '../../src/bit-manipulation/07-pairwise-swap';

describe('pairwiseSwap', () => {
  test('swaps bits of simple numbers', () => {
    expect(pairwiseSwap(0b101010)).toBe(0b010101);
    expect(pairwiseSwap(0b010101)).toBe(0b101010);
  });

  test('swaps bits of 0 (all zero bits)', () => {
    expect(pairwiseSwap(0)).toBe(0);
  });

  test('swaps bits of 1 (single bit)', () => {
    expect(pairwiseSwap(1)).toBe(2);
  });

  test('swaps bits of all ones in 8 bits', () => {
    expect(pairwiseSwap(0b11111111)).toBe(0b11111111);
  });

  test('swaps bits of a number with alternating bits 32-bit', () => {
    const input = 0xaaaaaaaa >>> 0; // force unsigned 32-bit
    const expected = 0x55555555 >>> 0;
    expect(pairwiseSwap(input) >>> 0).toBe(expected);
    expect(pairwiseSwap(expected) >>> 0).toBe(input);
  });
});
