// LCCI 04.06. Successor
//
// Write an algorithm to find the "next" node (i.e., in-order successor) of a given
// node in a binary search tree. Return null if no successor exists.
//
// Example 1:
//   Input: root = [2, 1, 3], p = 1
//   Output: 2
//
// Example 2:
//   Input: root = [5, 3, 6, 2, 4, null, null, 1], p = 6
//   Output: null

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
  parent?: TreeNode<T>; // Link to parent node
};

export function successor<T>(node: TreeNode<T>): TreeNode<T> | undefined {
  if (node.right) {
    return leftmost(node.right);
  }

  let current: TreeNode<T> | undefined = node;
  let parent = current.parent;

  while (parent && parent.right === current) {
    current = parent;
    parent = parent.parent;
  }

  return parent;
}

function leftmost<T>(node: TreeNode<T>): TreeNode<T> {
  while (node.left) {
    node = node.left;
  }
  return node;
}
