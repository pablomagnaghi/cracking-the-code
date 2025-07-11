// 6.4. *Ants on a Triangle*
//
// Three ants are sitting at the corners of an equilateral triangle.
// Each ant randomly picks a direction (clockwise or counter-clockwise) and starts moving.
// What is the probability that none of the ants collide?

export function antsOnTriangle(): number {
  const ants = 3;
  const directionsPerAnt = 2; // clockwise or counter-clockwise
  const totalCombinations = directionsPerAnt ** ants; // 2^3 = 8

  const nonCollisionCases = 2; // all clockwise OR all counter-clockwise

  const probability = nonCollisionCases / totalCombinations;
  return probability; // 0.25
}
