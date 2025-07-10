// 4. *Check Balanced*:

// Implement a function to check if a binary tree is balanced.
// For the purposes of this question, a balanced tree is defined to be a tree
// such that the heights of the two subtrees of any node never differ by more than one.

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export function checkBalanced<T>(tree?: TreeNode<T> | null): boolean {
  return checkHeight(tree) !== -1;
}

function checkHeight<T>(node?: TreeNode<T> | null): number {
  if (!node) return 0;

  const leftHeight = checkHeight(node.left);
  if (leftHeight === -1) return -1;

  const rightHeight = checkHeight(node.right);
  if (rightHeight === -1) return -1;

  if (!isBalanced(leftHeight, rightHeight)) return -1;

  return Math.max(leftHeight, rightHeight) + 1;
}

function isBalanced(leftHeight: number, rightHeight: number): boolean {
  return Math.abs(leftHeight - rightHeight) <= 1;
}
