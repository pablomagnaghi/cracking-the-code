// 17.02. Shuffle
//
// Write a method to shuffle a deck of cards. It must be a perfect shuffle --
// in other words, each of the 52! permutations of the deck has to be equally
// likely. You are given a perfect random number generator.
//
// Example:
//   Input:  [1, 2, 3, 4, 5]
//   Output: [3, 1, 5, 2, 4]  (one possible equally-likely permutation)
//
// Approach:
//   Use the Fisher-Yates (Knuth) shuffle algorithm. Iterate from the last
//   element to the first. For each position i, pick a random index j where
//   0 <= j <= i and swap elements at positions i and j. This guarantees that
//   every permutation is equally likely.
//
// Constraints:
//   - Each of the n! permutations must be equally likely
//   - Must run in O(n) time
//   - The original array should not be mutated (return a new shuffled copy)

export function shuffle<T>(arr: T[]): T[] {
  const result = arr.slice(); // Create a copy to avoid mutating original array
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
