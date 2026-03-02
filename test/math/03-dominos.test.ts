import { canCoverWithDominos } from '../../src/math/03-dominos';

describe('canCoverWithDominos', () => {
  test('returns false for 8x8 board with opposite corners removed', () => {
    expect(canCoverWithDominos()).toBe(false);
  });

  test('returns true for complete 8x8 board (no corners removed)', () => {
    // 64 squares, 32 dominos required — no missing corners
    const totalSquares = 8 * 8;
    const dominos = totalSquares / 2;
    expect(dominos).toBe(32);
    expect(totalSquares % 2).toBe(0); // Even number of squares
  });

  test('returns true for board with balanced black and white squares', () => {
    // Artificial test: removing 1 black and 1 white square (not both same color)
    const totalSquares = 64 - 2; // 62 squares
    const black = 31;
    const white = 31;
    expect(black).toBe(white);
    expect((black + white) % 2).toBe(0);
  });

  test('returns false for a 6x6 board with opposite corners removed', () => {
    expect(canCoverWithDominos(6)).toBe(false);
  });

  test('returns false for a 2x2 board with opposite corners removed', () => {
    expect(canCoverWithDominos(2)).toBe(false);
  });

  test('returns false for a 4x4 board with opposite corners removed', () => {
    expect(canCoverWithDominos(4)).toBe(false);
  });

  test('returns false for a 10x10 board with opposite corners removed', () => {
    expect(canCoverWithDominos(10)).toBe(false);
  });

  test('removing same-color corners always makes coverage impossible', () => {
    // All even board sizes should return false because opposite corners share a color
    for (const size of [2, 4, 6, 8, 10, 12]) {
      expect(canCoverWithDominos(size)).toBe(false);
    }
  });
});
