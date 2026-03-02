// LCCI 05.03. Reverse Bits
//
// You have an integer and you can flip exactly one bit from a 0 to a 1.
// Write code to find the length of the longest sequence of 1s you could create.
//
// Example 1:
// Input: num = 1775 (binary: 11011101111)
// Output: 8
//
// Example 2:
// Input: num = 7 (binary: 0111)
// Output: 4
//
// Constraints:
// - The input is a 32-bit integer.

export function flipBitToWin(num: number): number {
  if (~num === 0) return 32; // All 1s

  let currentLength = 0;
  let previousLength = 0;
  let maxLength = 1;

  while (num !== 0) {
    if ((num & 1) === 1) {
      currentLength++;
    } else {
      // Check next bit
      previousLength = (num & 2) === 0 ? 0 : currentLength;
      currentLength = 0;
    }

    maxLength = Math.max(previousLength + currentLength + 1, maxLength);
    num >>>= 1;
  }

  return maxLength;
}
