import { bestLine } from '../../src/moderate-exercises/14-best-line';

describe('bestLine', () => {
  test('returns total points if less than 2 points', () => {
    expect(bestLine([])).toBe(0);
    expect(bestLine([{ x: 1, y: 2 }])).toBe(1);
  });

  test('returns correct max points on the same line', () => {
    const points = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
    ];
    expect(bestLine(points)).toBe(5);
  });

  test('handles vertical line', () => {
    const points = [
      { x: 2, y: 1 },
      { x: 2, y: 3 },
      { x: 2, y: 5 },
      { x: 3, y: 3 },
    ];
    expect(bestLine(points)).toBe(3);
  });

  test('handles duplicate points correctly', () => {
    const points = [
      { x: 1, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ];
    expect(bestLine(points)).toBe(4);
  });

  test('handles no line with more than one point', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 5 },
      { x: 3, y: 8 },
    ];
    expect(bestLine(points)).toBe(3);
  });
});
