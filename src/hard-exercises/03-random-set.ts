// 17.03. Random Set
//
// Write a method to randomly generate a set of m integers from an array of
// size n. Each element must have equal probability of being chosen.
//
// Example:
//   Input:  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], m = 4
//   Output: [3, 7, 1, 9]  (one possible equally-likely subset of size 4)
//
// Approach:
//   Use a partial Fisher-Yates shuffle. Shuffle only the first m positions
//   of a copy of the array by swapping each position i (0 <= i < m) with a
//   random position from i to n-1. Return the first m elements.
//
// Constraints:
//   - Each element must have equal probability (m/n) of being chosen
//   - m must be <= n; throw an error otherwise
//   - The original array should not be mutated
//   - Must run in O(m) time (not O(n))

export function randomSet(arr: number[], m: number): number[] {
  if (m > arr.length) {
    throw new Error('m cannot be larger than the array length');
  }

  // Copy array to avoid modifying original
  const copy = arr.slice();

  // Fisher-Yates shuffle for first m elements
  for (let i = 0; i < m; i++) {
    const randIdx = i + Math.floor(Math.random() * (copy.length - i));
    [copy[i], copy[randIdx]] = [copy[randIdx], copy[i]];
  }

  // Return first m elements after shuffle
  return copy.slice(0, m);
}
