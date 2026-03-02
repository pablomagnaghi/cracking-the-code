// LCCI 04.12. Paths with Sum
//
// You are given a binary tree in which each node contains an integer value (which
// might be positive or negative). Design an algorithm to count the number of paths
// that sum to a given value. The path does not need to start or end at the root or
// a leaf, but it must go downwards (traveling only from parent nodes to child nodes).
//
// Example:
//   Input: root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], target = 22
//   Output: 3
//   Explanation: Paths are [5,4,11,2], [5,8,4,5], [4,11,7]
//
// Constraints:
//   - Node count <= 10,000

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
