// LCCI 04.10. Check SubTree
//
// T1 and T2 are two large binary trees, with T1 being significantly larger than T2.
// Determine whether T2 is a subtree of T1. A tree T2 is a subtree of T1 if there
// exists a node n in T1 such that the subtree rooted at n is identical to T2.
//
// Example 1:
//   Input: t1 = [1, 2, 3], t2 = [2]
//   Output: true
//
// Example 2:
//   Input: t1 = [1, null, 2, 4], t2 = [3, 2]
//   Output: false
//
// Constraints:
//   - The node count in both trees ranges from 0 to 20,000

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
