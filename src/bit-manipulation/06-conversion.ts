// LCCI 05.06. Convert Integer
//
// Write a function to determine the number of bits you would need to flip
// to convert integer A to integer B.
//
// Example 1:
// Input: A = 29 (binary: 0b11101), B = 15 (binary: 0b01111)
// Output: 2
//
// Example 2:
// Input: A = 1, B = 2
// Output: 2
//
// Constraints:
// - -2147483648 <= A, B <= 2147483647

export function bitFlipConversion(a: number, b: number): number {
  // XOR identifies differing bits (1s in result mean differing positions)
  let xor = a ^ b;

  let count = 0;

  // Count the number of 1s in the XOR result
  while (xor !== 0) {
    count += xor & 1; // Increment count if last bit is 1
    xor = xor >>> 1; // Unsigned right shift to process the next bit
  }

  return count;
}
