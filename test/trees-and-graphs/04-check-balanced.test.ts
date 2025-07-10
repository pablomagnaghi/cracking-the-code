import {
  checkBalanced,
  TreeNode,
} from '../../src/trees-and-graphs/04-check-balanced';

describe('checkBalanced', () => {
  test('returns true for empty tree', () => {
    expect(checkBalanced(null)).toBe(true);
    expect(checkBalanced(undefined)).toBe(true);
  });

  test('returns true for single node tree', () => {
    const tree: TreeNode<number> = { value: 1 };
    expect(checkBalanced(tree)).toBe(true);
  });

  test('returns true for balanced tree', () => {
    const tree: TreeNode<number> = {
      value: 1,
      left: {
        value: 2,
        left: { value: 4 },
        right: { value: 5 },
      },
      right: {
        value: 3,
      },
    };
    expect(checkBalanced(tree)).toBe(true);
  });

  test('returns false for unbalanced tree (deeper on left)', () => {
    const tree: TreeNode<number> = {
      value: 1,
      left: {
        value: 2,
        left: {
          value: 3,
          left: {
            value: 4,
          },
        },
      },
    };
    expect(checkBalanced(tree)).toBe(false);
  });

  test('returns false for unbalanced tree (deeper on right)', () => {
    const tree: TreeNode<number> = {
      value: 1,
      right: {
        value: 2,
        right: {
          value: 3,
          right: {
            value: 4,
          },
        },
      },
    };
    expect(checkBalanced(tree)).toBe(false);
  });

  test('returns true for tree with minor imbalance within limit', () => {
    const tree: TreeNode<number> = {
      value: 1,
      left: {
        value: 2,
        left: {
          value: 4,
        },
      },
      right: {
        value: 3,
      },
    };
    expect(checkBalanced(tree)).toBe(true);
  });
});
