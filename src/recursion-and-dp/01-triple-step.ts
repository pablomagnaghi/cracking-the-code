// 1. *Triple Step*:

// A child is running up a staircase with n steps and can hop either
// 1 step, 2 steps, or 3 steps at a time. Implement a method to count
// how many possible ways the child can run up the stairs.
//

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
