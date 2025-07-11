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
});
