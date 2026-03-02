// LCCI 04.02. Minimum Height Tree
//
// Given a sorted (increasing order) array with unique integer elements, write an
// algorithm to create a binary search tree with minimal height.
//
// Example:
//   Input: [-10, -3, 0, 5, 9]
//   Output: [0, -3, 9, -10, null, 5]
//       0
//      / \
//    -3   9
//    /   /
//  -10  5

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export function minimalTree<T>(sortedArray: T[]): TreeNode<T> | undefined {
  if (!sortedArray || sortedArray.length === 0) return undefined;
  return buildMinimalTree(sortedArray, 0, sortedArray.length - 1);
}

function buildMinimalTree<T>(array: T[], start: number, end: number): TreeNode<T> | undefined {
  if (start > end) return undefined;

  const mid = Math.floor((start + end) / 2);
  return {
    value: array[mid],
    left: buildMinimalTree(array, start, mid - 1),
    right: buildMinimalTree(array, mid + 1, end),
  };
}
