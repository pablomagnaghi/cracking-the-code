// 6. *Palindrome*:

// Implement a function to check if a linked list is a palindrome.

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
