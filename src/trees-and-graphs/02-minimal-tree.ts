// 2. *Minimal Tree*:

// Given a sorted (increasing order) array with unique integer elements,
// write an algorithm to create a binary search tree with minimal height.
//
// A binary search tree is a search where for each node,
// lesser elements are on the left node, and greater elements on the right node.
//
// Input: [1,2,3,4,5,6,7,8]
// Output:
//      5
//   2  |  7
// 1   3|6   8
//
//

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
