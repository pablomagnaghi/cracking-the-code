import {
  deleteMiddleNode,
  deleteMiddleNodeByPosition,
  Node,
} from '../../src/linked-lists/03-delete-middle-node';

describe('deleteMiddleNode', () => {
  test('deletes a middle node correctly', () => {
    // List: 1 -> 2 -> 3 -> 4
    const node4: Node<number> = { value: 4 };
    const node3: Node<number> = { value: 3, next: node4 };
    const node2: Node<number> = { value: 2, next: node3 };
    const head: Node<number> = { value: 1, next: node2 };

    // Delete node2 (value 2)
    const deleted = deleteMiddleNode(node2);
    expect(deleted).toBe(true);
    expect(head.next?.value).toBe(3);
    expect(head.next?.next?.value).toBe(4);
  });

  test('returns false if node is undefined', () => {
    const deleted = deleteMiddleNode(undefined);
    expect(deleted).toBe(false);
  });

  test('returns false if node is the last node (no next)', () => {
    const node: Node<number> = { value: 10 };
    const deleted = deleteMiddleNode(node);
    expect(deleted).toBe(false);
  });

  test('modifies node value and next pointer correctly', () => {
    // List: 5 -> 6 -> 7
    const node7: Node<number> = { value: 7 };
    const node6: Node<number> = { value: 6, next: node7 };

    const deleted = deleteMiddleNode(node6);
    expect(deleted).toBe(true);
    expect(node6.value).toBe(7);
    expect(node6.next).toBeUndefined();
  });

  test('LCCI example: deletes node c from a->b->c->d->e->f', () => {
    const nodeF: Node<string> = { value: 'f' };
    const nodeE: Node<string> = { value: 'e', next: nodeF };
    const nodeD: Node<string> = { value: 'd', next: nodeE };
    const nodeC: Node<string> = { value: 'c', next: nodeD };
    const nodeB: Node<string> = { value: 'b', next: nodeC };
    const nodeA: Node<string> = { value: 'a', next: nodeB };

    const deleted = deleteMiddleNode(nodeC);
    expect(deleted).toBe(true);

    // Verify list is now a->b->d->e->f
    const values: string[] = [];
    let current: Node<string> | undefined = nodeA;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    expect(values).toEqual(['a', 'b', 'd', 'e', 'f']);
  });
});

describe('deleteMiddleNodeByPosition', () => {
  test('deletes node at given middle position', () => {
    const head: Node<number> = {
      value: 1,
      next: { value: 2, next: { value: 3, next: undefined } },
    };
    const result = deleteMiddleNodeByPosition(head, 1);
    expect(result).toBe(head);
    expect(result?.next?.value).toBe(3);
  });

  test('returns undefined if head is undefined', () => {
    const result = deleteMiddleNodeByPosition(undefined as unknown as Node<number>, 1);
    expect(result).toBeUndefined();
  });

  test('returns undefined if position is negative', () => {
    const head: Node<number> = { value: 1 };
    const result = deleteMiddleNodeByPosition(head, -1);
    expect(result).toBeUndefined();
  });

  test('returns head if position is less than 1 (0)', () => {
    const head: Node<number> = {
      value: 1,
      next: { value: 2, next: { value: 3, next: undefined } },
    };
    const result = deleteMiddleNodeByPosition(head, 0);
    expect(result).toBe(head);
    expect(result?.next?.value).toBe(2);
  });

  test('does nothing if position is out of bounds', () => {
    const head: Node<number> = { value: 1, next: { value: 2, next: undefined } };
    const result = deleteMiddleNodeByPosition(head, 5);
    expect(result).toBe(head);
    expect(result?.next?.value).toBe(2);
  });

  test('deletes last node', () => {
    const head: Node<number> = {
      value: 1,
      next: { value: 2, next: { value: 3, next: undefined } },
    };
    const result = deleteMiddleNodeByPosition(head, 2);
    expect(result).toBe(head);
    expect(result?.next?.next).toBeUndefined();
  });
});
