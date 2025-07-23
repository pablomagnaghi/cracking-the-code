// 17.3 Random Set
//
// Problem:
// Given an array of integers (size n) and an integer m (m <= n),
// randomly generate a set of m unique integers from the array,
// ensuring no duplicates in the selection.
//
// Solution:
// Use the Fisher-Yates shuffle algorithm to randomly shuffle the array,
// then return the first m elements from the shuffled array.

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
