import { paintFill } from '../../src/recursion-and-dp/10-paint-fill';

describe('paintFill', () => {
  it('fills a small area correctly', () => {
    const screen = [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ];
    const expected = [
      [2, 2, 2],
      [2, 2, 0],
      [2, 0, 1],
    ];
    paintFill(screen, 0, 0, 2);
    expect(screen).toEqual(expected);
  });

  it('does not fill if newColor is same as originalColor', () => {
    const screen = [
      [1, 1],
      [1, 1],
    ];
    const copy = JSON.parse(JSON.stringify(screen));
    const result = paintFill(screen, 0, 0, 1);
    expect(result).toBe(false);
    expect(screen).toEqual(copy);
  });

  it('returns false for invalid coordinates', () => {
    const screen = [
      [0, 0],
      [0, 0],
    ];
    expect(paintFill(screen, -1, 0, 2)).toBe(false);
    expect(paintFill(screen, 0, 3, 2)).toBe(false);
  });

  it('fills only connected areas of original color', () => {
    const screen = [
      [1, 2, 2],
      [1, 1, 2],
      [2, 1, 1],
    ];
    const expected = [
      [9, 2, 2],
      [9, 9, 2],
      [2, 9, 9],
    ];
    paintFill(screen, 1, 1, 9);
    expect(screen).toEqual(expected);
  });
});
