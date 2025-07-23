// 17.8 Circus Tower
//
// Problem:
// Given a list of people with height and weight, build the tallest tower such that
// each person is shorter and lighter than the one below.

export type Person = { height: number; weight: number };

export function circusTower(people: Person[]): Person[] {
  if (!people.length) return [];

  // Sort by height ASC, then by weight DESC to avoid duplicate heights in LIS
  people.sort((a, b) => {
    if (a.height === b.height) return b.weight - a.weight;
    return a.height - b.height;
  });

  // Extract weights for LIS
  const weights = people.map((p) => p.weight);

  // Store LIS indices
  const dp: number[] = [];
  const parent: number[] = new Array(people.length).fill(-1);

  for (let i = 0; i < weights.length; i++) {
    let lo = 0,
      hi = dp.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (weights[dp[mid]] < weights[i]) lo = mid + 1;
      else hi = mid;
    }

    if (lo > 0) parent[i] = dp[lo - 1];
    if (lo === dp.length) dp.push(i);
    else dp[lo] = i;
  }

  // Reconstruct the sequence
  const result: Person[] = [];
  let k = dp.length ? dp[dp.length - 1] : -1;
  while (k >= 0) {
    result.unshift(people[k]);
    k = parent[k];
  }

  return result;
}
