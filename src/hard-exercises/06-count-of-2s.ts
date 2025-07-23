// 17.6 Count of 2s
//
// Problem:
// Given an integer n, count how many times the digit '2' appears
// in all numbers from 0 up to n (inclusive).
//
// Example:
// Input: 25
// Output: 9
// Explanation: The digit '2' appears in 2, 12, 20, 21, 22, 23, 24, 25
// In 22, '2' appears twice.

export function countTwos(n: number): number {
  let count = 0;

  for (let i = 0; i <= n; i++) {
    count += countTwosInNumber(i);
  }

  return count;
}

function countTwosInNumber(num: number): number {
  let count = 0;
  let x = num;

  while (x > 0) {
    if (x % 10 === 2) count++;
    x = Math.floor(x / 10);
  }

  return count;
}
