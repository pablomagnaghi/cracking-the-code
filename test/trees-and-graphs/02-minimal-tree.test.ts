import { minimalTree, TreeNode } from '../../src/trees-and-graphs/02-minimal-tree';

describe('minimalTree', () => {
  test('returns undefined for empty array', () => {
    expect(minimalTree([])).toBeUndefined();
  });

  test('creates BST with single node for one-element array', () => {
    const expected: TreeNode<number> = { value: 10 };
    expect(minimalTree([10])).toEqual(expected);
  });

  test('creates BST with two nodes for two-element array', () => {
    const expected: TreeNode<number> = {
      value: 10,
      right: { value: 20 },
    };
    expect(minimalTree([10, 20])).toEqual(expected);
  });

  test('creates balanced BST for three-element array', () => {
    const expected: TreeNode<number> = {
      value: 20,
      left: { value: 10 },
      right: { value: 30 },
    };
    expect(minimalTree([10, 20, 30])).toEqual(expected);
  });

  test('creates minimal height BST from sorted array of 5 elements', () => {
    const expected: TreeNode<number> = {
      value: 3,
      left: {
        value: 1,
        right: {
          value: 2,
        },
      },
      right: {
        value: 4,
        right: {
          value: 5,
        },
      },
    };
    expect(minimalTree([1, 2, 3, 4, 5])).toEqual(expected);
  });

  test('creates minimal height BST for sorted array of 7 elements', () => {
    const expected: TreeNode<number> = {
      value: 4,
      left: {
        value: 2,
        left: { value: 1 },
        right: { value: 3 },
      },
      right: {
        value: 6,
        left: { value: 5 },
        right: { value: 7 },
      },
    };
    expect(minimalTree([1, 2, 3, 4, 5, 6, 7])).toEqual(expected);
  });

  test('creates minimal height BST from sorted array of 5 elements', () => {
    const expectedTree: TreeNode<number> = {
      value: 3,
      left: {
        value: 1,
        right: {
          value: 2,
        },
      },
      right: {
        value: 4,
        right: {
          value: 5,
        },
      },
    };
    expect(minimalTree([1, 2, 3, 4, 5])).toEqual(expectedTree);
  });

  test('creates BST from LCCI example [-10, -3, 0, 5, 9]', () => {
    const result = minimalTree([-10, -3, 0, 5, 9]);
    expect(result?.value).toBe(0);
    expect(result?.left?.value).toBe(-10);
    expect(result?.left?.right?.value).toBe(-3);
    expect(result?.right?.value).toBe(5);
    expect(result?.right?.right?.value).toBe(9);
  });

  test('returns undefined for undefined input', () => {
    expect(minimalTree(undefined as unknown as number[])).toBeUndefined();
  });
});
