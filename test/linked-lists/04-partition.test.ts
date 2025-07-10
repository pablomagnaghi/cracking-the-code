import { partition, Node } from '../../src/linked-lists/04-partition';

function createLinkedList<T>(values: T[]): Node<T> | undefined {
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

describe('partition', () => {
  test('partitions a list around a pivot correctly', () => {
    const head = createLinkedList([3, 5, 8, 5, 10, 2, 1]);
    const pivot = 5;

    const partitionedHead = partition(head, pivot);
    const result = linkedListToArray(partitionedHead);

    // All elements < 5 come first, followed by elements >= 5
    // The exact order within partitions may vary but test this condition:
    const indexOfFirstGE = result.findIndex((x) => x >= pivot);

    // Check all before indexOfFirstGE are < pivot
    expect(result.slice(0, indexOfFirstGE).every((x) => x < pivot)).toBe(true);
    // Check all from indexOfFirstGE onward are >= pivot
    expect(result.slice(indexOfFirstGE).every((x) => x >= pivot)).toBe(true);
  });

  test('returns undefined for empty list', () => {
    expect(partition(undefined, 5)).toBeUndefined();
  });

  test('returns the original list if all nodes are less than pivot', () => {
    const head = createLinkedList([1, 2, 3]);
    const pivot = 5;

    const result = partition(head, pivot);
    expect(linkedListToArray(result)).toEqual([1, 2, 3]);
  });

  test('returns the original list if all nodes are greater than or equal to pivot', () => {
    const head = createLinkedList([5, 6, 7]);
    const pivot = 5;

    const result = partition(head, pivot);
    expect(linkedListToArray(result)).toEqual([5, 6, 7]);
  });

  test('handles list with one element', () => {
    const head = createLinkedList([3]);
    const pivot = 5;

    const result = partition(head, pivot);
    expect(linkedListToArray(result)).toEqual([3]);
  });
});
