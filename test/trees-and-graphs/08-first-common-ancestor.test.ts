import { firstCommonAncestor, TreeNode } from '../../src/trees-and-graphs/08-first-common-ancestor';

describe('firstCommonAncestor', () => {
  /*
        Tree structure:
                1
              /   \
             2     3
            / \   / \
           4   5 6   7
  */

  const node7: TreeNode<number> = { value: 7 };
  const node6: TreeNode<number> = { value: 6 };
  const node5: TreeNode<number> = { value: 5 };
  const node4: TreeNode<number> = { value: 4 };
  const node3: TreeNode<number> = { value: 3, left: node6, right: node7 };
  const node2: TreeNode<number> = { value: 2, left: node4, right: node5 };
  const root: TreeNode<number> = { value: 1, left: node2, right: node3 };

  test('common ancestor of 4 and 5 is 2', () => {
    expect(firstCommonAncestor(root, node4, node5)?.value).toBe(2);
  });

  test('common ancestor of 4 and 6 is 1', () => {
    expect(firstCommonAncestor(root, node4, node6)?.value).toBe(1);
  });

  test('common ancestor of 3 and 7 is 3', () => {
    expect(firstCommonAncestor(root, node3, node7)?.value).toBe(3);
  });

  test('common ancestor when one node is root', () => {
    expect(firstCommonAncestor(root, root, node7)?.value).toBe(1);
  });

  test('common ancestor when nodes are the same', () => {
    expect(firstCommonAncestor(root, node4, node4)?.value).toBe(4);
  });

  // test('returns undefined if nodes not in tree', () => {
  //   const missingNode: TreeNode<number> = { value: 100 };
  //   expect(firstCommonAncestor(root, node4, missingNode)).toBeUndefined();
  // });
});
