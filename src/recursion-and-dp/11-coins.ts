// 8.11. Coins:
// Given an infinite number of quarters (25¢), dimes (10¢), nickels (5¢), and pennies (1¢),
// write code to calculate the number of ways of representing n cents.

// Example: n = 10
// Ways:
// [10]
// [5,5]
// [5,1,1,1,1,1]
// [1,1,1,1,1,1,1,1,1,1]
// etc.

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
