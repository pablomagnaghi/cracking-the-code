import { bisectSquares } from '../../src/moderate-exercises/13-bisect-square';

describe('bisectSquares', () => {
  test('returns line segment between centers for two squares', () => {
    const square1 = { bottomLeft: { x: 0, y: 0 }, topRight: { x: 2, y: 2 } };
    const square2 = { bottomLeft: { x: 4, y: 4 }, topRight: { x: 6, y: 6 } };

    const result = bisectSquares(square1, square2);
    expect(result).not.toBeNull();

    const [p1, p2] = result!;

    // Centers are (1,1) and (5,5), intersections should lie on the boundaries near these centers
    // Intersection for square1 should be on its boundary near center1 in direction of center2
    expect(p1.x).toBeCloseTo(2);
    expect(p1.y).toBeCloseTo(2);

    // Intersection for square2 should be on its boundary near center2 in direction of center1
    expect(p2.x).toBeCloseTo(4);
    expect(p2.y).toBeCloseTo(4);
  });

  test('returns the same point if centers coincide', () => {
    const square = { bottomLeft: { x: 0, y: 0 }, topRight: { x: 2, y: 2 } };
    const result = bisectSquares(square, square);
    expect(result).toEqual([
      { x: 1, y: 1 },
      { x: 1, y: 1 },
    ]);
  });

  test('returns null if intersection cannot be found', () => {
    // Degenerate case: one square is actually a point
    const square1 = { bottomLeft: { x: 0, y: 0 }, topRight: { x: 0, y: 0 } };
    const square2 = { bottomLeft: { x: 1, y: 1 }, topRight: { x: 2, y: 2 } };

    const result = bisectSquares(square1, square2);
    expect(result).toBeNull();
  });

  test('works with squares aligned on axes', () => {
    const square1 = { bottomLeft: { x: 0, y: 0 }, topRight: { x: 4, y: 4 } };
    const square2 = { bottomLeft: { x: 4, y: 0 }, topRight: { x: 8, y: 4 } };

    const result = bisectSquares(square1, square2);
    expect(result).not.toBeNull();

    const [p1, p2] = result!;

    // Centers: (2,2) and (6,2), so the line is horizontal y=2
    expect(p1.x).toBeCloseTo(4); // right edge of square1
    expect(p1.y).toBeCloseTo(2);

    expect(p2.x).toBeCloseTo(4); // left edge of square2
    expect(p2.y).toBeCloseTo(2);
  });
});
