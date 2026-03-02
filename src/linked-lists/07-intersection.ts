// LCCI 02.07. Intersection of Two Linked Lists
//
// Given two singly linked lists, determine if the two lists intersect. Return
// the intersecting node. The intersection is defined based on reference, not value.
//
// Example 1:
//   Input: listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
//   Output: node with value 8
//
// Example 2:
//   Input: listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
//   Output: node with value 2
//
// Example 3:
//   Input: listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
//   Output: null (no intersection)
//
// Constraints:
//   - Return null if no intersection exists
//   - No cycles exist in the entire structure
//   - Preserve original list structure after execution

export type Node<T> = {
  value: T;
  next?: Node<T>;
};

export function intersection<T>(
  list1: Node<T> | undefined,
  list2: Node<T> | undefined
): Node<T> | undefined {
  if (!list1 || !list2) return undefined;

  let length1 = getLength(list1);
  let length2 = getLength(list2);

  while (length1 > length2) {
    list1 = list1!.next;
    length1--;
  }

  while (length2 > length1) {
    list2 = list2!.next;
    length2--;
  }

  while (list1 && list2) {
    if (list1 === list2) return list1;
    list1 = list1.next;
    list2 = list2.next;
  }

  return undefined;
}

function getLength<T>(node: Node<T> | undefined): number {
  let length = 0;
  while (node) {
    length++;
    node = node.next;
  }
  return length;
}
