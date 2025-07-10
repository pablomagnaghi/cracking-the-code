// 7.  *Intersection*;

// Given two (singly) linked lists, determine if the two lists intersect.
// Return the first intersecting node. Note that the intersection is defined
// based on reference, not value.

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
