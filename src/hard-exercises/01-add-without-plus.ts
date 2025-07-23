// 17.1 Add Without Plus
//
// Problem:
// Write a function that adds two numbers without using the + or - operators.
// Use bitwise operations instead.
//
// Approach:
// - Use XOR (^) to add without carrying.
// - Use AND (&) and shift (<<) to calculate the carry.
// - Repeat the process until the carry becomes 0.

export function add(a: number, b: number): number {
  while (b !== 0) {
    const sum = a ^ b; // add without carry
    const carry = (a & b) << 1; // carry, shifted to the left
    a = sum;
    b = carry;
  }
  return a;
}
