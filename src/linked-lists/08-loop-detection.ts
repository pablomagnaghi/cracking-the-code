// LCCI 02.08. Linked List Cycle
//
// Given a circular linked list, implement an algorithm that returns the node at
// the beginning of the loop. A circular linked list is a (corrupt) linked list
// in which a node's next pointer points to an earlier node.
//
// Example 1:
//   Input: head = [3,2,0,-4], pos = 1
//   Output: tail connects to node index 1
//
// Example 2:
//   Input: head = [1,2], pos = 0
//   Output: tail connects to node index 0
//
// Example 3:
//   Input: head = [1], pos = -1
//   Output: no cycle

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export function detectLoop<T>(head: Node<T> | undefined): Node<T> | null {
  if (!head) return null;

  let slow: Node<T> | undefined = head;
  let fast: Node<T> | undefined = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      break;
    }
  }

  if (!fast || !fast.next) return null;

  slow = head;
  while (slow !== fast) {
    slow = slow!.next;
    fast = fast!.next;
  }

  return slow!;
}
