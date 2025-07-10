import { countPathsWithSum, TreeNode } from '../../src/trees-and-graphs/12-paths-with-sum';

describe('countPathsWithSum', () => {
  test('counts all valid paths that sum to target', () => {
    const tree: TreeNode = {
      value: 10,
      left: {
        value: 5,
        left: {
          value: 3,
          left: { value: 3 },
          right: { value: -2 },
        },
        right: {
          value: 2,
          right: { value: 1 },
        },
      },
      right: {
        value: -3,
        right: { value: 11 },
      },
    };

    // Expected paths with sum 8:
    // - 5 -> 3
    // - 5 -> 2 -> 1
    // - -3 -> 11
    // - 10 -> -3 -> 11 (10 -3 + 11 = 18 → not 8)
    expect(countPathsWithSum(tree, 8)).toBe(3);
  });

  test('returns 0 for empty tree', () => {
    expect(countPathsWithSum(undefined, 5)).toBe(0);
  });

  test('counts paths that include negative values', () => {
    const tree: TreeNode = {
      value: 1,
      left: {
        value: -2,
        left: { value: 1 },
        right: {
          value: 3,
        },
      },
      right: {
        value: -3,
        left: { value: -2 },
        right: { value: 4 },
      },
    };

    // Target sum is -1
    // Valid paths:
    // - 1 -> -2
    // - -2 (on right subtree)
    expect(countPathsWithSum(tree, -1)).toBe(2);
  });

  test('handles single node equal to target', () => {
    const tree: TreeNode = { value: 7 };
    expect(countPathsWithSum(tree, 7)).toBe(1);
  });

  test('handles multiple overlapping paths', () => {
    const tree: TreeNode = {
      value: 5,
      left: {
        value: 4,
        left: {
          value: 11,
          left: { value: 7 },
          right: { value: 2 },
        },
      },
      right: {
        value: 8,
        left: { value: 13 },
        right: {
          value: 4,
          right: { value: 1 },
        },
      },
    };

    // Only one valid path sums to 22: 5 → 4 → 11 → 2
    expect(countPathsWithSum(tree, 22)).toBe(2);
  });
});
