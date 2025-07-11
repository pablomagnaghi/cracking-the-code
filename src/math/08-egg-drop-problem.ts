// 6.8. Egg Drop Problem
//
// Problem: You have a building with `floors` floors and `eggs` eggs.
// An egg breaks if dropped from a certain floor or above, and doesn't break below it.
// Goal: Find the minimum number of drops required in the worst case to find the critical floor.
// You may assume:
// - If the egg breaks, you cannot use it again.
// - If the egg doesn't break, you can reuse it.
// - You must minimize the number of worst-case drops.

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
