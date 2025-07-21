// 16.11 Diving Board
//
// Given k planks, and two possible lengths (shorter and longer),
// return all possible unique total lengths of the diving board.

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
