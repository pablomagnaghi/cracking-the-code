import { successor, TreeNode } from '../../src/trees-and-graphs/06-successor';

describe('successor', () => {
  test('returns the leftmost node of right subtree if it exists', () => {
    const root: TreeNode<number> = { value: 20 };
    const node10: TreeNode<number> = { value: 10, parent: root };
    const node30: TreeNode<number> = { value: 30, parent: root };
    const node25: TreeNode<number> = { value: 25, parent: node30 };
    const node35: TreeNode<number> = { value: 35, parent: node30 };

    root.left = node10;
    root.right = node30;
    node30.left = node25;
    node30.right = node35;

    expect(successor(root)).toBe(node25); // Leftmost in right subtree
  });

  test('returns parent when node has no right subtree and is left child', () => {
    const root: TreeNode<number> = { value: 20 };
    const node10: TreeNode<number> = { value: 10, parent: root };
    const node30: TreeNode<number> = { value: 30, parent: root };

    root.left = node10;
    root.right = node30;

    expect(successor(node10)).toBe(root);
  });

  test('returns ancestor where node is in left subtree of ancestor', () => {
    const root: TreeNode<number> = { value: 20 };
    const node10: TreeNode<number> = { value: 10 };
    const node5: TreeNode<number> = { value: 5 };
    const node15: TreeNode<number> = { value: 15 };
    const node17: TreeNode<number> = { value: 17 };

    // Construct tree
    root.left = node10;
    node10.parent = root;

    node10.left = node5;
    node5.parent = node10;

    node10.right = node15;
    node15.parent = node10;

    node15.right = node17;
    node17.parent = node15;

    // successor of 15 is 17
    expect(successor(node15)).toBe(node17);

    // successor of 17 is 20
    expect(successor(node17)).toBe(root);
  });

  test('returns undefined when there is no successor (max node)', () => {
    const root: TreeNode<number> = { value: 20 };
    const node10: TreeNode<number> = { value: 10, parent: root };
    const node30: TreeNode<number> = { value: 30, parent: root };

    root.left = node10;
    root.right = node30;

    expect(successor(node30)).toBeUndefined();
  });
});
