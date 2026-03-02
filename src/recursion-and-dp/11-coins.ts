// LCCI 08.11. Coin
//
// Given an infinite number of quarters (25 cents), dimes (10 cents), nickels
// (5 cents), and pennies (1 cent), write code to calculate the number of ways
// of representing n cents.
//
// Example 1:
//   Input: n = 5
//   Output: 2 (5=5, 5=1+1+1+1+1)
//
// Example 2:
//   Input: n = 10
//   Output: 4 (10=10, 10=5+5, 10=5+1+1+1+1+1, 10=1+1+1+1+1+1+1+1+1+1)
//
// Constraints:
//   0 <= n <= 1000000

const COINS = [25, 10, 5, 1];

export function countChange(amount: number): number {
  return countWays(amount, 0, {});
}

function countWays(amount: number, index: number, memo: Record<string, number>): number {
  if (amount === 0) return 1;
  if (index >= COINS.length) return 0;

  const key = `${amount}-${index}`;
  if (memo[key] !== undefined) return memo[key];

  let ways = 0;
  const coin = COINS[index];

  for (let i = 0; i * coin <= amount; i++) {
    const remaining = amount - i * coin;
    ways += countWays(remaining, index + 1, memo);
  }

  memo[key] = ways;
  return ways;
}
