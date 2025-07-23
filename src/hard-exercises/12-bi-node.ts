// 17.12 Bi Node
//
// Problem:
// Given a binary search tree, convert it to a sorted doubly linked list in-place.
// The left and right pointers in nodes are to be used as previous and next pointers respectively.

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export function convertBSTToDoublyLinkedList(root: TreeNode | null): TreeNode | null {
  if (!root) return null;

  let head: TreeNode | null = null;
  let prev: TreeNode | null = null;

  function inorder(node: TreeNode | null) {
    if (!node) return;

    inorder(node.left);

    if (prev) {
      prev.right = node;
      node.left = prev;
    } else {
      head = node;
    }
    prev = node;

    inorder(node.right);
  }

  inorder(root);
  return head;
}
