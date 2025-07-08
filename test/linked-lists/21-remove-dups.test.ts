import { removeDups, Node } from '../../src/linked-lists/21-remove-dups';

function buildLinkedList<T>(values: T[]): Node<T> | undefined {
  if (values.length === 0) return undefined;
  const head: Node<T> = { value: values[0] };
  let current = head;
  for (let i = 1; i < values.length; i++) {
    current.next = { value: values[i] };
    current = current.next;
  }
  return head;
}

function linkedListToArray<T>(head: Node<T> | undefined): T[] {
  const result: T[] = [];
  let current = head;
  while (current) {
    result.push(current.value);
    current = current.next;
  }
  return result;
}

describe('removeDupsUnsorted', () => {
  test('removes duplicates from unsorted list', () => {
    const head = buildLinkedList([3, 5, 3, 2, 5, 4, 2]);
    const result = removeDups(head);
    expect(linkedListToArray(result)).toEqual([3, 5, 2, 4]);
  });

  test('handles list with no duplicates', () => {
    const head = buildLinkedList([1, 2, 3]);
    const result = removeDups(head);
    expect(linkedListToArray(result)).toEqual([1, 2, 3]);
  });

  test('handles all duplicates', () => {
    const head = buildLinkedList([9, 9, 9, 9]);
    const result = removeDups(head);
    expect(linkedListToArray(result)).toEqual([9]);
  });

  test('handles empty list', () => {
    const result = removeDups(undefined);
    expect(linkedListToArray(result)).toEqual([]);
  });

  test('handles single node list', () => {
    const head = buildLinkedList([42]);
    const result = removeDups(head);
    expect(linkedListToArray(result)).toEqual([42]);
  });
});