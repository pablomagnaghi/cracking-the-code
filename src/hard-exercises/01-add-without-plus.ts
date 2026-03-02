// LCCI 17.01. Add Without Plus
//
// Write a function that adds two numbers. You should not use + or any arithmetic operators.
//
// Example:
//   Input: a = 1, b = 1
//   Output: 2
//
// Constraints:
//   - a, b may be negative or zero.
//   - The result will fit within a 32-bit signed integer range.

export function add(a: number, b: number): number {
  while (b !== 0) {
    const sum = a ^ b; // add without carry
    const carry = (a & b) << 1; // carry, shifted to the left
    a = sum;
    b = carry;
  }
  return a;
}
