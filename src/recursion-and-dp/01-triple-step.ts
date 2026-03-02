// LCCI 08.01. Three Steps Problem
//
// A child is running up a staircase with n steps and can hop either 1 step,
// 2 steps, or 3 steps at a time. Implement a method to count how many possible
// ways the child can run up the stairs. The result may be large, so you need
// to return the result modulo 1000000007.
//
// Example 1:
//   Input: n = 3
//   Output: 4
//
// Example 2:
//   Input: n = 5
//   Output: 13
//
// Constraints:
//   1 <= n <= 1000000

export function tripleStep(n: number): number {
  if (n === 0) return 0;
  const memo: Record<number, number> = {};
  return countWays(n, memo);
}

function countWays(n: number, memo: Record<number, number>): number {
  if (n === 0) return 1;
  if (n < 0) return 0;
  if (n in memo) return memo[n];

  memo[n] = countWays(n - 1, memo) + countWays(n - 2, memo) + countWays(n - 3, memo);

  return memo[n];
}
