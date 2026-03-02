// 06.01. The Heavy Pill
//
// You have 20 bottles of pills. 19 bottles have 1.0 gram pills, but one
// bottle has pills of weight 1.1 grams. Given a scale that provides an
// exact measurement, how would you find the heavy bottle? You can only
// use the scale once.
//
// Approach:
//   Take a different number of pills from each bottle: 1 pill from bottle 1,
//   2 pills from bottle 2, ..., 20 pills from bottle 20. Weigh them all
//   together. The expected weight if all pills weighed 1.0g is
//   1 + 2 + ... + 20 = 210g. The excess weight above 210g, divided by 0.1,
//   tells you which bottle contains the heavy pills.
//
// Example:
//   Input: heavy bottle is bottle #3
//   Scale reads: 210 + 3 * 0.1 = 210.3
//   Output: (210.3 - 210) / 0.1 = 3
//
// Constraints:
//   - Exactly 20 bottles numbered 1 through 20
//   - Exactly one bottle has 1.1g pills, the rest have 1.0g pills
//   - The scale may only be used once

// Strategy:
// Take 1 pill from bottle 1, 2 pills from bottle 2, ..., 20 pills from bottle 20.
// Total expected weight if all were 1.0g = 1 + 2 + ... + 20 = 210g
// If bottle i is the heavy one, total weight = 210 + 0.1 * i
// So, subtract 210 from actual weight → divide by 0.1 → index of heavy bottle.

export function findHeavyBottle(measureWeight: (pillsTaken: number[]) => number): number {
  const pillsTaken: number[] = [];
  for (let i = 0; i < 20; i++) {
    pillsTaken[i] = i + 1; // take i+1 pills from bottle i
  }

  const totalWeight = measureWeight(pillsTaken); // one scale use
  const expectedWeight = 210; // 1 + 2 + ... + 20

  const excess = totalWeight - expectedWeight;
  return Math.round(excess / 0.1); // the index of the heavy bottle (1-based)
}
