// 13.08. Lambda Random
//
// Using lambda expressions, write a function to get a random subset of
// size k from a list. Also write a function that generates multiple such
// random subsets.
//
// Approach:
//   Use the Fisher-Yates (Knuth) shuffle on a copy of the input array,
//   then take the first k elements. This ensures each element has an equal
//   probability of being selected. Accept an optional random number generator
//   for deterministic testing.
//
// Example:
//   getRandomSubset([1, 2, 3, 4, 5], 3);
//   // e.g. [3, 1, 5] — any 3-element subset
//
//   getAllRandomSubsets([1, 2, 3, 4, 5], 2, 3);
//   // e.g. [[2, 4], [1, 5], [3, 2]]
//
// Constraints:
//   - k must be <= list.length and >= 0
//   - Each element appears at most once per subset
//   - The function should accept an optional RNG for testability

export function getRandomSubset<T>(
  list: T[],
  k: number,
  rng: () => number = Math.random,
): T[] {
  if (k < 0 || k > list.length) {
    throw new Error(`k must be between 0 and ${list.length}, got ${k}`);
  }

  if (k === 0) return [];
  if (k === list.length) return [...list];

  // Fisher-Yates partial shuffle: only shuffle the first k positions
  const arr = [...list];
  for (let i = 0; i < k; i++) {
    const j = i + Math.floor(rng() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.slice(0, k);
}

export function getAllRandomSubsets<T>(
  list: T[],
  k: number,
  count: number,
  rng: () => number = Math.random,
): T[][] {
  if (count < 0) {
    throw new Error(`count must be non-negative, got ${count}`);
  }

  return Array.from({ length: count }, () => getRandomSubset(list, k, rng));
}
