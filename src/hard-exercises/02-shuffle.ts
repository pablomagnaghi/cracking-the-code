// 17.02. Shuffle (Book-only)
//
// Write a method to shuffle an array so that all permutations are equally likely.
// This is also known as generating a uniform random permutation.

export function shuffle<T>(arr: T[]): T[] {
  const result = arr.slice(); // Create a copy to avoid mutating original array
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
