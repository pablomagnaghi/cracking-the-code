// LCCI 16.07. Maximum
//
// Write a method that finds the maximum of two numbers. You should not use
// if-else or any other comparison operator.
//
// Example:
//   Input: a = 1, b = 2
//   Output: 2

export function numberMax(a: number, b: number): number {
  const difference = a - b;

  // Extract sign bit: 0 if difference >= 0, 1 if difference < 0
  const isNegative = ((difference >> 31) & 1) >>> 0;

  const isANonNegative = 1 - isNegative;

  // If a >= b (isNegative = 0), return a
  // If a < b  (isNegative = 1), return b
  return a * isANonNegative + b * isNegative;
}
