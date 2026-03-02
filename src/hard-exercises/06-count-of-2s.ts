// LCCI 17.06. Number Of 2s In Range
//
// Write a method to count the number of 2s that appear in all the numbers
// from 0 to n (inclusive).
//
// Example:
//   Input: 25
//   Output: 9
//   Explanation: (2, 12, 20, 21, 22, 23, 24, 25) -- 22 has two 2s.
//
// Constraints:
//   - n <= 10^9

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
