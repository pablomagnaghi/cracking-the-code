// LCCI 05.07. Exchange
//
// Write a program to swap odd and even bits in an integer with as few instructions
// as possible (e.g., bit 0 and bit 1 are swapped, bit 2 and bit 3 are swapped, etc.).
//
// Example 1:
// Input: num = 2 (binary: 0b10)
// Output: 1 (binary: 0b01)
//
// Example 2:
// Input: num = 3
// Output: 3
//
// Constraints:
// - 0 <= num <= 2^30 - 1

export function pairwiseSwap(num: number): number {
  // Masks for even and odd bits
  const evenMask = 0xaaaaaaaa; // binary: 1010...
  const oddMask = 0x55555555; // binary: 0101...

  // Shift even bits right, odd bits left, then combine
  const evenBits = (num & evenMask) >>> 1;
  const oddBits = (num & oddMask) << 1;

  return evenBits | oddBits;
}
