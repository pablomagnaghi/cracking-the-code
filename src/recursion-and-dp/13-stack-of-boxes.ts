// 8.13 Stack of Boxes
//
// You have a stack of boxes, each with width, height, and depth.
// The boxes cannot be rotated.
// A box can be placed on top of another box only if
// its width, height, and depth are all strictly smaller than the box below it.
// Implement a method to compute the height of the tallest possible stack.

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
