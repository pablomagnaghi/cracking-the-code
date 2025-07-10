import { bstSequences, TreeNode } from '../../src/trees-and-graphs/09-bst-sequence';

describe('bstSequences', () => {
  test('empty tree returns [[]]', () => {
    expect(bstSequences(undefined)).toEqual([[]]);
  });

  test('single node tree returns single sequence with that node', () => {
    const root: TreeNode<number> = { value: 5 };
    expect(bstSequences(root)).toEqual([[5]]);
  });

  test('tree with two nodes', () => {
    const root: TreeNode<number> = {
      value: 2,
      left: { value: 1 },
    };
    expect(bstSequences(root)).toEqual([[2, 1]]);
  });

  test('example tree returns correct sequences', () => {
    const root: TreeNode<number> = {
      value: 2,
      left: { value: 1 },
      right: { value: 3 },
    };
    const result = bstSequences(root);
    // Should contain both [2, 1, 3] and [2, 3, 1] sequences (order doesn't matter)
    expect(result).toEqual(
      expect.arrayContaining([
        [2, 1, 3],
        [2, 3, 1],
      ])
    );
    expect(result.length).toBe(2);
  });

  test('tree with more nodes', () => {
    /*
           2
          / \
         1   3
              \
               4
    */
    const root: TreeNode<number> = {
      value: 2,
      left: { value: 1 },
      right: {
        value: 3,
        right: { value: 4 },
      },
    };
    const sequences = bstSequences(root);
    // There should be several valid sequences, e.g.
    expect(sequences).toEqual(
      expect.arrayContaining([
        [2, 1, 3, 4],
        [2, 3, 1, 4],
        [2, 3, 4, 1],
      ])
    );
  });
});
