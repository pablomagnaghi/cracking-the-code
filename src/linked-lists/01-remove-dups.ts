// LCCI 02.01. Remove Duplicate Node
//
// Write code to remove duplicates from an unsorted linked list.
//
// Example 1:
//   Input: [1, 2, 3, 3, 2, 1]
//   Output: [1, 2, 3]
//
// Example 2:
//   Input: [1, 1, 1, 1, 2]
//   Output: [1, 2]
//
// Constraints:
//   - List length is in the range [0, 20000]
//   - Element values are in the range [0, 20000]
//
// Follow up: How would you solve this problem if a temporary buffer is not allowed?

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export function removeDups<T>(head?: Node<T>): Node<T> | undefined {
  if (!head) return undefined;

  const nodeSet = new Set<T>();
  let current = head;
  nodeSet.add(current.value);

  while (current.next) {
    if (nodeSet.has(current.next.value)) {
      current.next = current.next.next;
    } else {
      nodeSet.add(current.next.value);
      current = current.next;
    }
  }

  return head;
}
