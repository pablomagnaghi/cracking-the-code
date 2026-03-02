// 06.04. Ants on a Triangle
//
// There are three ants on different vertices of a triangle. What is the
// probability of collision (between any two or all of them) if they start
// walking on the sides of the triangle? Assume that each ant randomly picks
// a direction, with either direction being equally likely to be chosen, and
// that they walk at the same speed.
//
// Similarly, find the probability of collision with n ants on an n-vertex
// polygon.
//
// Analysis:
//   Each ant has 2 choices (clockwise or counter-clockwise), so there are
//   2^3 = 8 total equally likely outcomes. The only cases with no collision
//   are when all ants move in the same direction (all clockwise or all
//   counter-clockwise) -- that is 2 outcomes.
//
//   P(no collision) = 2 / 2^3 = 1/4 = 0.25
//   P(collision)    = 1 - 1/4 = 3/4 = 0.75
//
//   General formula for n ants on an n-vertex polygon:
//   P(no collision) = 2 / 2^n
//
// Example:
//   Input: 3 ants on a triangle
//   Output: 0.25 (probability of no collision)

export function antsOnTriangle(): number {
  const ants = 3;
  const directionsPerAnt = 2; // clockwise or counter-clockwise
  const totalCombinations = directionsPerAnt ** ants; // 2^3 = 8

  const nonCollisionCases = 2; // all clockwise OR all counter-clockwise

  const probability = nonCollisionCases / totalCombinations;
  return probability; // 0.25
}
