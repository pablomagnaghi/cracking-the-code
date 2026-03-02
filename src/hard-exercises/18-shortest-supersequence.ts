// LCCI 17.18. Shortest Supersequence
//
// You are given two arrays, one shorter (with all distinct elements) and one
// longer. Find the shortest subarray in the longer array that contains all
// the elements in the shorter array. The items can appear in any order.
//
// Example:
//   Input: big = [7,5,9,0,2,1,3,5,7,9,1,1,5,8,8,9,7], small = [1,5,9]
//   Output: [7,10]
//
// Constraints:
//   - big.length <= 100000
//   - 1 <= small.length <= 100000

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
