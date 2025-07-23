// 17.18. Shortest Supersequence (Number Version)
//
// Problem:
// Given two arrays of numbers, `big` and `small`, find the shortest contiguous subsequence
// in `big` that contains all the elements of `small` in the same order.
//
// Example:
// big = [1, 2, 3, 4, 5, 6]
// small = [2, 4, 6]
// Output: [1, 5] (subarray [2, 3, 4, 5, 6] contains 2, 4, 6 in order)

export function shortestSupersequence(big: number[], small: number[]): [number, number] | null {
  let minWindow: [number, number] | null = null;
  let minLength = Infinity;

  for (let i = 0; i < big.length; i++) {
    if (big[i] !== small[0]) continue;

    let j = 0;
    let k = i;

    while (k < big.length && j < small.length) {
      if (big[k] === small[j]) {
        j++;
      }
      k++;
    }

    if (j === small.length) {
      const end = k - 1;
      if (end - i + 1 < minLength) {
        minLength = end - i + 1;
        minWindow = [i, end];
      }
    }
  }

  return minWindow;
}
