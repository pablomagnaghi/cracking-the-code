// 8. *First Common Ancestor*:

// Design an algorithm and write code to find the first common ancestor of two nodes
// in a binary tree. Avoid storing additional nodes in a data structure.
// NOTE: This is not necessarily a binary search tree.

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
