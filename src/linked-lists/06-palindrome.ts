// LCCI 02.06. Palindrome Linked List
//
// Implement a function to check if a linked list is a palindrome.
//
// Example 1:
//   Input: 1->2
//   Output: false
//
// Example 2:
//   Input: 1->2->2->1
//   Output: true
//
// Follow up: Could you do it in O(n) time and O(1) space?

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export function isPalindrome<T>(head: Node<T> | undefined): boolean {
  if (!head) return false;

  let fastPointer: Node<T> | undefined = head;
  let slowPointer: Node<T> | undefined = head;
  const firstHalfValues: T[] = [];

  while (fastPointer && fastPointer.next) {
    firstHalfValues.push(slowPointer!.value);
    slowPointer = slowPointer!.next;
    fastPointer = fastPointer.next.next;
  }

  // Skip the middle node for odd-length lists
  if (fastPointer) {
    slowPointer = slowPointer?.next;
  }

  while (slowPointer) {
    const topValue = firstHalfValues.pop();
    if (slowPointer.value !== topValue) {
      return false;
    }
    slowPointer = slowPointer.next;
  }

  return true;
}
