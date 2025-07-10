// 5.1 Insertion
//
// You are given two 32-bit numbers, N and M, and two bit positions, i and j.
// Write a method to insert M into N such that M starts at bit j and ends at bit i.
// You can assume that the bits j through i have enough space to fit all of M.
// That is, M can be "inserted" into N starting at bit j.
//
// Example:
// Input: N = 10000000000 (1024), M = 10011 (19), i = 2, j = 6
// Output: N = 10001001100 (1100)

export function insertBits(N: number, M: number, i: number, j: number): number {
  // Create a mask to clear bits i through j in N
  const allOnes = ~0; // Sequence of all 1s (e.g., 0xFFFFFFFF)

  const left = allOnes << (j + 1); // 1s before position j, 0s after
  const right = (1 << i) - 1; // 1s after position i
  const mask = left | right; // 1s everywhere except for bits i through j

  const nCleared = N & mask; // Clear bits j through i in N
  const mShifted = M << i; // Shift M so it aligns with bits i through j

  return nCleared | mShifted; // Merge N and shifted M
}
