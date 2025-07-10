// 4. *Partition*:

// Write code to partition a linked list around a value x,
// such that all nodes less than x come before all nodes greater than or equal to x.
// If x is contained within the list, the values of x only need to be after the elements
// less than x (see below). The partition element x can appear anywhere in the
// "right partition"; it does not need to appear between the left and right partitions.

// ```
// EXAMPLE
// Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1[partition=5]
// Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
// ```

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export function partition<T>(head: Node<T> | undefined, x: T): Node<T> | undefined {
  if (!head) return undefined;

  let smallerHead: Node<T> | undefined = undefined; // Head of list with values < pivot
  let smallerTail: Node<T> | undefined = undefined; // Tail of list with values < pivot
  let greaterEqualHead: Node<T> | undefined = undefined; // Head of list with values >= pivot
  let greaterEqualTail: Node<T> | undefined = undefined; // Tail of list with values >= pivot

  let currentNode: Node<T> | undefined = head;

  while (currentNode) {
    const nextNode: Node<T> | undefined = currentNode.next;
    currentNode.next = undefined;

    if (currentNode.value < x) {
      if (!smallerHead) {
        smallerHead = currentNode;
        smallerTail = currentNode;
      } else {
        smallerTail!.next = currentNode;
        smallerTail = currentNode;
      }
    } else {
      if (!greaterEqualHead) {
        greaterEqualHead = currentNode;
        greaterEqualTail = currentNode;
      } else {
        greaterEqualTail!.next = currentNode;
        greaterEqualTail = currentNode;
      }
    }

    currentNode = nextNode;
  }

  if (!smallerHead) {
    return greaterEqualHead;
  }

  smallerTail!.next = greaterEqualHead;

  return smallerHead;
}
