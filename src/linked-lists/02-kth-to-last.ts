// LCCI 02.02. Kth Node From End of List
//
// Implement an algorithm to find the kth to last element of a singly linked list.
// Return the value of that node.
//
// Example:
//   Input: 1->2->3->4->5, k = 2
//   Output: 4
//
// Constraints:
//   - k is guaranteed to be valid

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export function kthToLast<T>(head: Node<T>, k: number): Node<T> | undefined {
  if (k < 0) return undefined;

  let lead: Node<T> | undefined = head;
  let follow: Node<T> | undefined = head;

  for (let i = 0; i < k; i++) {
    if (!lead) return undefined;
    lead = lead.next;
  }

  while (lead) {
    lead = lead.next;
    follow = follow!.next;
  }

  return follow;
}
