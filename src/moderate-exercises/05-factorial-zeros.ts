// LCCI 16.05. Factorial Zeros
//
// Write an algorithm which computes the number of trailing zeros in n factorial.
//
// Example 1:
//   Input: 3
//   Output: 0
//   Explanation: 3! = 6, no trailing zeros.
//
// Example 2:
//   Input: 5
//   Output: 1
//   Explanation: 5! = 120, one trailing zero.
//
// Constraints:
//   - Your solution should be in logarithmic time complexity: O(log n).

export function countTrailingZeros(n: number): number {
  let count = 0;
  let divisor = 5;

  // Count how many multiples of 5, 25, 125, etc. are in n
  while (n >= divisor) {
    count += Math.floor(n / divisor);
    divisor *= 5;
  }

  return count;
}
