// LCCI 16.11. Diving Board
//
// You are building a diving board by placing a bunch of planks of wood end-to-end.
// There are two types of planks, one of length shorter and one of length longer.
// You must use exactly K planks of wood. Write a method to generate all possible
// lengths for the diving board.
//
// Example:
//   Input: shorter = 1, longer = 2, k = 3
//   Output: [3,4,5,6]
//
// Constraints:
//   - 0 < shorter <= longer
//   - 0 <= k <= 100000

export function divingBoard(shorter: number, longer: number, k: number): number[] {
  if (k === 0) return [];

  if (shorter === longer) return [k * shorter];

  const result = [];
  for (let i = 0; i <= k; i++) {
    // i times shorter, (k - i) times longer
    const length = i * shorter + (k - i) * longer;
    result.push(length);
  }

  return result.sort((a, b) => a - b);
}
