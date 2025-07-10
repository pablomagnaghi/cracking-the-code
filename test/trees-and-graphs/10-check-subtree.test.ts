import { isSubtree, TreeNode } from '../../src/trees-and-graphs/10-check-subtree';

function createTree<T>(value: T, left?: TreeNode<T>, right?: TreeNode<T>): TreeNode<T> {
  return { value, left, right };
}

describe('isSubtree', () => {
  it('returns true when t2 is a subtree of t1', () => {
    const t1 = createTree(3, createTree(4, createTree(1), createTree(2)), createTree(5));

    const t2 = createTree(4, createTree(1), createTree(2));

    expect(isSubtree(t1, t2)).toBe(true);
  });

  it('returns false when t2 is not a subtree of t1', () => {
    const t1 = createTree(
      3,
      createTree(4, createTree(1), createTree(2, createTree(0))),
      createTree(5)
    );

    const t2 = createTree(4, createTree(1), createTree(2));

    expect(isSubtree(t1, t2)).toBe(false);
  });

  it('returns true when both trees are null', () => {
    expect(isSubtree(null, null)).toBe(true);
  });

  it('returns true when t2 is null (empty tree is always a subtree)', () => {
    const t1 = createTree(1);
    expect(isSubtree(t1, null)).toBe(true);
  });

  it('returns false when t1 is null but t2 is not', () => {
    const t2 = createTree(1);
    expect(isSubtree(null, t2)).toBe(false);
  });

  it('handles identical trees', () => {
    const t1 = createTree(1, createTree(2), createTree(3));
    const t2 = createTree(1, createTree(2), createTree(3));
    expect(isSubtree(t1, t2)).toBe(true);
  });
});
