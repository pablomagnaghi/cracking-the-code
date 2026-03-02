// LCCI 16.01. Swap Numbers
//
// Write a function to swap two numbers in place without using temporary variables.
//
// Example:
//   Input: numbers = [1,2]
//   Output: [2,1]
//
// Constraints:
//   - numbers.length == 2

export function swapNumbers(a: number, b: number): [number, number] {
  // Use arithmetic method (safe if no overflow)
  a = a + b;
  b = a - b; // Now b is original a
  a = a - b; // Now a is original b
  return [a, b];
}
