// LCCI 08.13. Pile Box
//
// You have a stack of n boxes, with widths w, heights h, and depths d. The boxes
// cannot be rotated and can only be stacked on top of one another if each box in
// the stack is strictly larger than the box above it in width, height, and depth.
// Implement a method to compute the height of the tallest possible stack. The
// height of a stack is the sum of the heights of each box.
//
// Example 1:
//   Input: box = [[1, 1, 1], [2, 2, 2], [3, 3, 3]]
//   Output: 6
//
// Example 2:
//   Input: box = [[1, 1, 1], [2, 3, 4], [2, 6, 7], [3, 4, 5]]
//   Output: 10
//
// Constraints:
//   Maximum 3000 boxes.

export type Box = { width: number; height: number; depth: number };

export function stackOfBoxes(boxes: Box[]): number {
  boxes.sort((a, b) => b.height - a.height);
  const memo = new Map<number, number>();
  return tallestStackFromIndex(boxes, null, memo);
}

function tallestStackFromIndex(
  boxes: Box[],
  bottomIndex: number | null,
  memo: Map<number, number>
): number {
  if (bottomIndex !== null && memo.has(bottomIndex)) {
    return memo.get(bottomIndex)!;
  }

  const bottomBox = bottomIndex !== null ? boxes[bottomIndex] : null;
  let maxHeight = 0;

  for (let i = 0; i < boxes.length; i++) {
    if (canBeAbove(bottomBox, boxes[i])) {
      const height = boxes[i].height + tallestStackFromIndex(boxes, i, memo);
      maxHeight = Math.max(maxHeight, height);
    }
  }

  if (bottomIndex !== null) {
    memo.set(bottomIndex, maxHeight);
  }

  return maxHeight;
}

function canBeAbove(bottom: Box | null, top: Box): boolean {
  if (!bottom) return true;
  return top.width < bottom.width && top.height < bottom.height && top.depth < bottom.depth;
}
