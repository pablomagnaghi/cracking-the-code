// LCCI 16.14. Best Line
//
// Given a two-dimensional graph with points on it, find a line which passes the
// most number of points. Return the indices of the two points with the smallest
// indices on that line.
//
// Example:
//   Input: [[0,0],[1,1],[1,0],[2,0]]
//   Output: [0,2]
//   Explanation: Points 0, 2, and 3 are collinear.
//
// Constraints:
//   - 2 <= len(Points) <= 300
//   - len(Points[i]) == 2

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
