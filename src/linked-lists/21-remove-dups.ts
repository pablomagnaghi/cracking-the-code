// 1. *Remove Dups*:

// Write code to remove duplicates from an unsorted linked list. FOLLOW UP
// How would you solve this problem if a temporary buffer is not allowed?
//
// 1 -> 2 -> 2-> 2 -> 4

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
