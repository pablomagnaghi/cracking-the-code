import { sumLists, Node } from '../../src/linked-lists/05-sum-lists';

function createLinkedList(values: number[]): Node<number> | undefined {
  if (values.length === 0) return undefined;
  const head: Node<number> = { value: values[0] };
  let current = head;
  for (let i = 1; i < values.length; i++) {
    current.next = { value: values[i] };
    current = current.next;
  }
  return head;
}

function linkedListToArray(head: Node<number> | undefined): number[] {
  const result: number[] = [];
  while (head) {
    result.push(head.value);
    head = head.next;
  }
  return result;
}

describe('sumLists', () => {
  test('adds two lists of same length', () => {
    const list1 = createLinkedList([7, 1, 6]); // 617
    const list2 = createLinkedList([5, 9, 2]); // 295
    const result = sumLists(list1, list2); // 912 → [2, 1, 9]
    expect(linkedListToArray(result)).toEqual([2, 1, 9]);
  });

  test('adds two lists of different lengths', () => {
    const list1 = createLinkedList([1, 2]); // 21
    const list2 = createLinkedList([9, 9, 9]); // 999
    const result = sumLists(list1, list2); // 1020 → [0, 2, 0, 1]
    expect(linkedListToArray(result)).toEqual([0, 2, 0, 1]);
  });

  test('adds when one list is empty', () => {
    const list1 = createLinkedList([3, 4, 2]); // 243
    const list2 = createLinkedList([]); // 0
    const result = sumLists(list1, list2); // 243 → [3, 4, 2]
    expect(linkedListToArray(result)).toEqual([3, 4, 2]);
  });

  test('adds when both lists are empty', () => {
    const result = sumLists(undefined, undefined);
    expect(result).toBeUndefined();
  });

  test('adds with final carry over', () => {
    const list1 = createLinkedList([9, 9]); // 99
    const list2 = createLinkedList([1]); // 1
    const result = sumLists(list1, list2); // 100 → [0, 0, 1]
    expect(linkedListToArray(result)).toEqual([0, 0, 1]);
  });
});
