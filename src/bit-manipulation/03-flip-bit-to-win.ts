// 5.3 Flip Bit to Win:
//
// You can flip exactly one bit from 0 to 1. Write code to find the length of the longest sequence of 1s
// you could create by flipping one bit from 0 to 1.
// Example:
// Input: 1775 (binary: 11011101111)
// Output: 8 (by flipping the 0 between two sequences of 1s)

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
