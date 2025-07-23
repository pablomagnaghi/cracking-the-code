import { getKthMagicNumber } from '../../src/hard-exercises/09-kth-multiple';

describe('getKthMagicNumber', () => {
  test('returns correct values for the first few elements', () => {
    expect(getKthMagicNumber(1)).toBe(1);
    expect(getKthMagicNumber(2)).toBe(3);
    expect(getKthMagicNumber(3)).toBe(5);
    expect(getKthMagicNumber(4)).toBe(7);
    expect(getKthMagicNumber(5)).toBe(9);
    expect(getKthMagicNumber(6)).toBe(15);
    expect(getKthMagicNumber(7)).toBe(21);
    expect(getKthMagicNumber(8)).toBe(25);
    expect(getKthMagicNumber(9)).toBe(27);
    expect(getKthMagicNumber(10)).toBe(35);
    expect(getKthMagicNumber(11)).toBe(45);
    expect(getKthMagicNumber(12)).toBe(49);
    expect(getKthMagicNumber(13)).toBe(63);
    expect(getKthMagicNumber(14)).toBe(75);
  });

  test('returns 105 for 15th element', () => {
    expect(getKthMagicNumber(16)).toBe(105);
  });

  test('returns 315 for 25th element', () => {
    expect(getKthMagicNumber(25)).toBe(315);
  });
});
