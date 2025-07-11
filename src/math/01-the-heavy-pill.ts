// 6.1 The Heavy Pill
//
// You have 20 bottles of pills. 19 bottles have 1.0 gram pills, but one has pills that weigh 1.1 grams.
// You have a scale that you can use only once.
// How can you find the heavy bottle?

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
