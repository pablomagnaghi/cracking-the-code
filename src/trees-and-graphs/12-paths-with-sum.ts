// 4.12 *Paths with Sum*
//
// You are given a binary tree in which each node contains an integer value (which might be positive or negative).
// Design an algorithm to count the number of paths that sum to a given value.
//
// The path does not need to start or end at the root or a leaf, but it must go downwards
// (traveling only from parent nodes to child nodes).

export type TreeNode = {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
};

export function countPathsWithSum(root: TreeNode | undefined, targetSum: number): number {
  return dfs(root, targetSum, []);
}

function dfs(node: TreeNode | undefined, targetSum: number, path: number[]): number {
  if (!node) return 0;

  path.push(node.value);

  let sum = 0;
  let count = 0;
  for (let i = path.length - 1; i >= 0; i--) {
    sum += path[i];
    if (sum === targetSum) {
      count++;
    }
  }

  count += dfs(node.left, targetSum, [...path]);
  count += dfs(node.right, targetSum, [...path]);

  return count;
}
