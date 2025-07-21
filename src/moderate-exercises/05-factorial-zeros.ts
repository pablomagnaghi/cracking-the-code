// 16.5. Factorial Zeros
//
// Write an algorithm which computes the number of trailing zeros in n! (n factorial).
// Trailing zeros are created by factors of 10, which come from 2 * 5.
// Since there are more 2s than 5s, count the number of 5s in the prime factors.

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
