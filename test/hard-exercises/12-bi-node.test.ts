import { TreeNode, convertBSTToDoublyLinkedList } from '../../src/hard-exercises/12-bi-node';

describe('convertBSTToDoublyLinkedList', () => {
  test('converts BST to sorted doubly linked list', () => {
    // Construct BST:
    //      4
    //     / \
    //    2   5
    //   / \
    //  1   3
    const root = new TreeNode(
      4,
      new TreeNode(2, new TreeNode(1), new TreeNode(3)),
      new TreeNode(5)
    );

    const head = convertBSTToDoublyLinkedList(root);

    // Collect values from doubly linked list forward
    const values: number[] = [];
    let current = head;
    while (current) {
      values.push(current.val);
      current = current.right;
    }

    expect(values).toEqual([1, 2, 3, 4, 5]);

    // Check backward links
    let tail = head;
    while (tail && tail.right) {
      tail = tail.right;
    }
    const reverseValues: number[] = [];
    while (tail) {
      reverseValues.push(tail.val);
      tail = tail.left;
    }
    expect(reverseValues).toEqual([5, 4, 3, 2, 1]);
  });

  test('returns null for empty tree', () => {
    expect(convertBSTToDoublyLinkedList(null)).toBeNull();
  });

  test('handles single node tree', () => {
    const singleNode = new TreeNode(10);
    const head = convertBSTToDoublyLinkedList(singleNode);
    expect(head).toBe(singleNode);
    expect(head!.left).toBeNull();
    expect(head!.right).toBeNull();
  });
});
