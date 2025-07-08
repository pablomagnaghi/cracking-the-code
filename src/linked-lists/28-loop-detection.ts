// 8. *Loop Detection*:

// Given a circular linked list, implement an algorithm that returns the node
// at the beginning of the loop.

// ```
// DEFINITION
// Circular linked list: A (corrupt) linked list in which a node's next pointer
// points to an earlier node, so as to make a loop in the linked list.
// ```

// ```
// EXAMPLE
// Input: A->8->C->D->E-> C[thesameCasearlier] Output: C
// Hints: #50, #69, #83, #90
// ```

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
