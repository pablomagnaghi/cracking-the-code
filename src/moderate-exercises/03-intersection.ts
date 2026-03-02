// LCCI 16.03. Intersection
//
// Given two straight line segments (represented as a start point and an end point),
// compute the point of intersection, if any.
// If there's no intersection, return an empty array.
// If the two segments are parallel but share a segment, return the endpoint closest
// to the origin with the smallest x, then smallest y.
//
// Example 1:
//   Input: start1 = {0,0}, end1 = {1,0}, start2 = {1,1}, end2 = {0,-1}
//   Output: {0.5, 0}
//
// Example 2:
//   Input: start1 = {0,0}, end1 = {3,3}, start2 = {1,1}, end2 = {2,2}
//   Output: {1, 1}
//
// Example 3:
//   Input: start1 = {0,0}, end1 = {1,1}, start2 = {1,0}, end2 = {2,1}
//   Output: [] (no intersection)
//
// Constraints:
//   - The absolute value of coordinate values will not exceed 2^7.
//   - Absolute error tolerance: 10^-6.

export function intersection(array1: number[], array2: number[]): number[] {
  const elementsInFirst = new Set(array1);
  const intersectionSet = new Set<number>();

  for (const element of array2) {
    if (elementsInFirst.has(element)) {
      intersectionSet.add(element);
    }
  }

  return Array.from(intersectionSet);
}
