// 5. *Sum Lists*: You have two numbers represented by a linked list,
// where each node contains a single digit. The digits are stored in reverse order,
// such that the Vs digit is at the head of the list.
// Write a function that adds the two numbers and returns the sum as a linked list.

// ```
// EXAMPLE
// Input: (7-> 1 -> 6) + (5 -> 9 -> 2).That is,617 + 295.
// Output: 2 -> 1 -> 9. That is, 912.
// ```

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export function sumLists(
  list1: Node<number> | undefined,
  list2: Node<number> | undefined,
): Node<number> | undefined {
  let carryOver = 0;
  let resultHead: Node<number> | undefined = undefined;
  let resultTail: Node<number> | undefined = undefined;

  let currentNode1 = list1;
  let currentNode2 = list2;

  while (currentNode1 || currentNode2 || carryOver > 0) {
    const value1 = currentNode1 ? currentNode1.value : 0;
    const value2 = currentNode2 ? currentNode2.value : 0;
    const total = value1 + value2 + carryOver;

    carryOver = Math.floor(total / 10);
    const digit = total % 10;

    const newNode: Node<number> = { value: digit };

    if (!resultHead) {
      resultHead = newNode;
      resultTail = newNode;
    } else {
      resultTail!.next = newNode;
      resultTail = newNode;
    }

    if (currentNode1) currentNode1 = currentNode1.next;
    if (currentNode2) currentNode2 = currentNode2.next;
  }

  return resultHead;
}
