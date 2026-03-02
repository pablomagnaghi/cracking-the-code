// LCCI 04.08. First Common Ancestor
//
// Design an algorithm and write code to find the first common ancestor of two nodes
// in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is
// not necessarily a binary search tree.
//
// Example 1:
//   Input: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 1
//   Output: 3
//
// Example 2:
//   Input: root = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], p = 5, q = 4
//   Output: 5
//
// Constraints:
//   - All node values are unique
//   - p and q are distinct nodes that exist within the tree

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export function firstCommonAncestor<T>(
  root: TreeNode<T> | undefined,
  p: TreeNode<T>,
  q: TreeNode<T>
): TreeNode<T> | undefined {
  if (!root) return undefined;
  if (root === p || root === q) return root;

  const left = firstCommonAncestor(root.left, p, q);
  const right = firstCommonAncestor(root.right, p, q);

  if (left && right) return root;
  return left || right;
}
