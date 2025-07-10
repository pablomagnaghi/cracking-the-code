// 5.7 *Pairwise Swap*:
//
// Write a function to swap odd and even bits in an integer with as few instructions as possible.
// For example, if the input is binary 101010, the output should be 010101.

export function pairwiseSwap(num: number): number {
  // Masks for even and odd bits
  const evenMask = 0xaaaaaaaa; // binary: 1010...
  const oddMask = 0x55555555; // binary: 0101...

  // Shift even bits right, odd bits left, then combine
  const evenBits = (num & evenMask) >>> 1;
  const oddBits = (num & oddMask) << 1;

  return evenBits | oddBits;
}
