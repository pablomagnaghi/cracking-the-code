import { flipBitToWin } from '../../src/bit-manipulation/03-flip-bit-to-win';

describe('flipBitToWin', () => {
  test('returns 8 for 1775 (11011101111)', () => {
    expect(flipBitToWin(0b11011101111)).toBe(8);
  });

  test('returns 1 for 0 (no 1s)', () => {
    expect(flipBitToWin(0)).toBe(1);
  });

  test('returns 32 for all 1s (0xFFFFFFFF)', () => {
    expect(flipBitToWin(0xffffffff)).toBe(32);
  });

  test('returns 2 for single 1 in the middle (e.g., 0b100)', () => {
    expect(flipBitToWin(0b100)).toBe(2);
  });

  test('returns correct value when there are multiple short sequences', () => {
    expect(flipBitToWin(0b10101010101)).toBe(3);
  });

  test('returns correct value for alternating bits starting with 0', () => {
    expect(flipBitToWin(0b01010101010)).toBe(3);
  });

  test('returns correct for single 1s spaced apart', () => {
    expect(flipBitToWin(0b100001000010000)).toBe(2);
  });
});
