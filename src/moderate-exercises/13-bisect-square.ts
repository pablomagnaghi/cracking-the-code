// 16.13. Bisect Squares
//
// Problem: Given two squares (each defined by the coordinates of their bottom-left
// and top-right corners), find the line segment that bisects both squares.
//
// Approach:
// 1. Compute the center points of both squares.
// 2. The bisecting line passes through these centers.
// 3. Find the intersection points of this line with each square's boundary.
// 4. Return the segment defined by these two intersection points.

interface Point {
  x: number;
  y: number;
}

interface Square {
  bottomLeft: Point;
  topRight: Point;
}

function getCenter(square: Square): Point {
  return {
    x: (square.bottomLeft.x + square.topRight.x) / 2,
    y: (square.bottomLeft.y + square.topRight.y) / 2,
  };
}

export function bisectSquares(square1: Square, square2: Square): [Point, Point] | null {
  const center1 = getCenter(square1);
  const center2 = getCenter(square2);

  if (center1.x === center2.x && center1.y === center2.y) {
    // The centers coincide — line segment is just a point
    return [center1, center2];
  }

  const inter1 = getIntersection(square1, center1, center2);
  const inter2 = getIntersection(square2, center2, center1);

  if (!inter1 || !inter2) {
    // Could not find intersection points on one or both squares
    return null;
  }

  return [inter1, inter2];
}

// Given a line (through p1 and p2) and a square, find the intersection point of the line
// with the square boundary that is closest to p1
function getIntersection(square: Square, p1: Point, p2: Point): Point | null {
  const { bottomLeft, topRight } = square;
  const edges = [
    // each edge is two points (start and end)
    [
      { x: bottomLeft.x, y: bottomLeft.y },
      { x: topRight.x, y: bottomLeft.y },
    ], // bottom edge
    [
      { x: topRight.x, y: bottomLeft.y },
      { x: topRight.x, y: topRight.y },
    ], // right edge
    [
      { x: topRight.x, y: topRight.y },
      { x: bottomLeft.x, y: topRight.y },
    ], // top edge
    [
      { x: bottomLeft.x, y: topRight.y },
      { x: bottomLeft.x, y: bottomLeft.y },
    ], // left edge
  ];

  const intersections: Point[] = [];

  for (const [e1, e2] of edges) {
    const inter = lineSegmentIntersection(p1, p2, e1, e2);
    if (inter) {
      intersections.push(inter);
    }
  }

  if (intersections.length === 0) return null;

  // Return the intersection point closest to p1
  intersections.sort((a, b) => distanceSquared(a, p1) - distanceSquared(b, p1));
  return intersections[0];
}

// Helper: returns squared distance between two points
function distanceSquared(a: Point, b: Point): number {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

// Helper: find intersection point between two line segments p1-p2 and p3-p4.
// Returns Point if they intersect, otherwise null.
function lineSegmentIntersection(p1: Point, p2: Point, p3: Point, p4: Point): Point | null {
  const s1_x = p2.x - p1.x;
  const s1_y = p2.y - p1.y;
  const s2_x = p4.x - p3.x;
  const s2_y = p4.y - p3.y;

  const denom = -s2_x * s1_y + s1_x * s2_y;
  if (denom === 0) return null; // parallel or collinear

  const s = (-s1_y * (p1.x - p3.x) + s1_x * (p1.y - p3.y)) / denom;
  const t = (s2_x * (p1.y - p3.y) - s2_y * (p1.x - p3.x)) / denom;

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
    // Intersection detected
    return {
      x: p1.x + t * s1_x,
      y: p1.y + t * s1_y,
    };
  }

  return null; // no intersection
}
