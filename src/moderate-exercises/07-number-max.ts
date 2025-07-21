// 16.7. Number Max
//
// Write a method that finds the maximum of two numbers without using if-else, comparison operators, or any other direct comparison.
// Use bitwise or arithmetic operations only.

export function numberMax(a: number, b: number): number {
  const difference = a - b;

  // Extract sign bit: 0 if difference >= 0, 1 if difference < 0
  const isNegative = ((difference >> 31) & 1) >>> 0;

  const isANonNegative = 1 - isNegative;

  // If a >= b (isNegative = 0), return a
  // If a < b  (isNegative = 1), return b
  return a * isANonNegative + b * isNegative;
}
