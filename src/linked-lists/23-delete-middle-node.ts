// 3. *Delete Middle Node*:

// Implement an algorithm to delete a node in the middle
// (i.e., any node but the first and last node, not necessarily the exact middle)
// of a singly linked list, given only access to that node.

// ```
// EXAMPLE
// Input: the node c from the linked list a - >b- >c - >d - >e- >f
// Result: nothing is returned, but the new linked list looks like a->b->d->e->f Hints: #72
// ```

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export function deleteMiddleNode<T>(node: Node<T> | undefined): boolean {
  if (!node || !node.next) {
    return false;
  }

  node.value = node.next.value;
  node.next = node.next.next;
  return true;
}

// Silver exercise deleting by position
export function deleteMiddleNodeByPosition<T>(head: Node<T>, position: number): Node<T> | undefined {
  if (!head || position < 0) return undefined;

  if (position < 1) return head;

  let current: Node<T> | undefined = head;
  let prev: Node<T> | undefined = undefined;
  let index = 0;

  while (current && index < position) {
    prev = current;
    current = current.next;
    index++;
  }

  if (!current) return head;

  prev!.next = current.next;

  return head;
}

