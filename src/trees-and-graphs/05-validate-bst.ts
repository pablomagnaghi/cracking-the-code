// 5. *Validate BST*:

// Implement a function to check if a binary tree is a binary search tree.

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export function validateBST<T extends number>(node: TreeNode<T> | undefined): boolean {
  return validate(node, -Infinity, Infinity);
}

function validate<T extends number>(
  node: TreeNode<T> | undefined,
  min: number,
  max: number
): boolean {
  if (!node) return true;

  if (node.value <= min || node.value >= max) return false;

  return validate(node.left, min, node.value) && validate(node.right, node.value, max);
}
