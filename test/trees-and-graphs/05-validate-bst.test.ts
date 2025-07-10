import { validateBST, TreeNode } from '../../src/trees-and-graphs/05-validate-bst';

describe('validateBST', () => {
  test('returns true for valid BST', () => {
    const tree: TreeNode<number> = {
      value: 10,
      left: {
        value: 5,
        left: { value: 2 },
        right: { value: 7 },
      },
      right: {
        value: 15,
        right: { value: 20 },
      },
    };

    expect(validateBST(tree)).toBe(true);
  });

  test('returns false for invalid BST with left node greater than parent', () => {
    const tree: TreeNode<number> = {
      value: 10,
      left: {
        value: 12, // invalid, should be < 10
      },
      right: {
        value: 15,
      },
    };

    expect(validateBST(tree)).toBe(false);
  });

  test('returns false for invalid BST with right node less than parent', () => {
    const tree: TreeNode<number> = {
      value: 10,
      left: {
        value: 5,
      },
      right: {
        value: 9, // invalid, should be > 10
      },
    };

    expect(validateBST(tree)).toBe(false);
  });

  test('returns true for single node tree', () => {
    const tree: TreeNode<number> = {
      value: 10,
    };

    expect(validateBST(tree)).toBe(true);
  });

  test('returns true for empty tree', () => {
    expect(validateBST(undefined)).toBe(true);
  });

  test('returns false for deeper invalid node', () => {
    const tree: TreeNode<number> = {
      value: 20,
      left: {
        value: 10,
        left: {
          value: 5,
        },
        right: {
          value: 25, // invalid: should be less than 20
        },
      },
      right: {
        value: 30,
      },
    };

    expect(validateBST(tree)).toBe(false);
  });
});
