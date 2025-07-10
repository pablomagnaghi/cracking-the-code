// 4.10 *Check Subtree*
//
// T1 and T2 are two very large binary trees, with T1 much bigger than T2.
// Create an algorithm to determine if T2 is a subtree of T1.
//
// A tree T2 is a subtree of T1 if there exists a node n in T1 such that the subtree
// of n is identical to T2. That is, if you cut off the tree at node n, the two
// trees would be identical.

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export function isSubtree<T>(t1: TreeNode<T> | null, t2: TreeNode<T> | null): boolean {
  if (t2 === null) return true;
  if (t1 === null) return false;
  if (isSameTree(t1, t2)) return true;

  return isSubtree(t1.left ?? null, t2) || isSubtree(t1.right ?? null, t2);
}

function isSameTree<T>(a: TreeNode<T> | null, b: TreeNode<T> | null): boolean {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  if (a.value !== b.value) return false;

  return isSameTree(a.left ?? null, b.left ?? null) && isSameTree(a.right ?? null, b.right ?? null);
}
