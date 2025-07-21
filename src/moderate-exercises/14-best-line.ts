// 16.14 Best Line
//
// Problem: Given a set of points on a 2D plane, find the line that passes through the
// maximum number of points.
//
// Approach:
// 1. For each point, compute the slope between it and every other point.
// 2. Use a hash map to count how many points share the same slope with respect to the current point.
// 3. Handle vertical lines (infinite slope) separately.
// 4. Keep track of the maximum count of points that lie on the same line.
// 5. Return the maximum count (or the line details if needed).

interface Point {
  x: number;
  y: number;
}

export function bestLine(points: Point[]): number {
  if (points.length < 2) return points.length;

  let maxPointsOnLine = 1;

  for (let i = 0; i < points.length; i++) {
    const slopes = new Map<string, number>();
    let samePointCount = 0;
    let currentMax = 0;

    const p1 = points[i];

    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j];

      if (p1.x === p2.x && p1.y === p2.y) {
        // Duplicate point
        samePointCount++;
      } else {
        let dy = p2.y - p1.y;
        let dx = p2.x - p1.x;
        const sign = dy < 0 !== dx < 0 ? -1 : 1;

        dy = Math.abs(dy);
        dx = Math.abs(dx);
        const gcdVal = gcd(dy, dx);

        dy = dy / gcdVal;
        dx = dx / gcdVal;

        // Store slope as string with sign to uniquely identify slope
        const slopeKey = `${sign * dy}/${dx}`;

        slopes.set(slopeKey, (slopes.get(slopeKey) || 0) + 1);
        currentMax = Math.max(currentMax, slopes.get(slopeKey)!);
      }
    }

    // Include the duplicate points + the point itself
    maxPointsOnLine = Math.max(maxPointsOnLine, currentMax + samePointCount + 1);
  }

  return maxPointsOnLine;
}

// Helper function to calculate GCD for slope reduction
function gcd(a: number, b: number): number {
  if (b === 0) return a;
  return gcd(b, a % b);
}
