// 06.08. The Egg Drop Problem
//
// There is a building of 100 floors. If an egg drops from the Nth floor or
// above, it will break. If it is dropped from any floor below floor N, it
// will not break. You are given two eggs. Find N, while minimizing the
// number of drops in the worst case.
//
// Generalized: given `eggs` eggs and `floors` floors, find the minimum
// number of drops required in the worst case to determine the critical
// floor.
//
// Rules:
//   - If an egg breaks when dropped, it cannot be reused.
//   - If an egg survives, it can be reused.
//   - With only 1 egg, you must do a linear search (worst case = floors).
//   - With many eggs, binary search gives ceil(log2(floors + 1)) drops.
//
// Example:
//   Input: eggs = 2, floors = 100
//   Output: 14 (minimum worst-case drops)
//
//   Input: eggs = 2, floors = 10
//   Output: 4
//
//   Input: eggs = 1, floors = 10
//   Output: 10 (must try every floor)
//
// Constraints:
//   - eggs >= 1
//   - floors >= 0

export function eggDrop(eggs: number, floors: number): number {
  const memo: Map<string, number> = new Map();
  return eggDropHelper(eggs, floors, memo);
}

function eggDropHelper(eggs: number, floors: number, memo: Map<string, number>): number {
  const key = `${eggs},${floors}`;
  if (memo.has(key)) return memo.get(key)!;

  if (floors === 0 || floors === 1) return floors;
  if (eggs === 1) return floors; // linear search if only 1 egg

  let minDrops = Infinity;
  let low = 1;
  let high = floors;

  // Binary search to minimize worst-case drops
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const breakCase = eggDropHelper(eggs - 1, mid - 1, memo);
    const noBreakCase = eggDropHelper(eggs, floors - mid, memo);
    const worst = 1 + Math.max(breakCase, noBreakCase);

    if (breakCase > noBreakCase) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }

    minDrops = Math.min(minDrops, worst);
  }

  memo.set(key, minDrops);
  return minDrops;
}
