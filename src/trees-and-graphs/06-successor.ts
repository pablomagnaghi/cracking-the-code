// 6. *Successor*:

// Write an algorithm to find the "next" node
// (i.e., in-order successor) of a given node in a binary search tree.
// You may assume that each node has a link to its parent.

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
