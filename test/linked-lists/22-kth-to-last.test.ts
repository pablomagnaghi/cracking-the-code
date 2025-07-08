import { kthToLast, Node } from '../../src/linked-lists/22-kth-to-last';

describe('kthToLast', () => {
  function createLinkedList<T>(values: T[]): Node<T> {
    const head: Node<T> = { value: values[0] };
    let current = head;
    for (let i = 1; i < values.length; i++) {
      current.next = { value: values[i] };
      current = current.next;
    }
    return head;
  }

  test('returns correct node when k is in the middle', () => {
    const head = createLinkedList([1, 2, 3, 4, 5]);
    const result = kthToLast(head, 2);
    expect(result?.value).toBe(4); // 2nd to last is 4
  });

  test('returns undefined when k is negative', () => {
    const head = createLinkedList([1, 2, 3]);
    const result = kthToLast(head, -1);
    expect(result).toBeUndefined();
  });

  test('returns undefined when k is larger than list length', () => {
    const head = createLinkedList([5, 6]);
    const result = kthToLast(head, 3);
    expect(result).toBeUndefined();
  });

  test('returns undefined when list is empty', () => {
    const result = kthToLast<number>(undefined as unknown as Node<number>, 1);
    expect(result).toBeUndefined();
  });
});
