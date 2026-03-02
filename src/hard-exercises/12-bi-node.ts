// LCCI 17.12. BiNode
//
// The data structure TreeNode is used for binary tree, but it can also be used
// to represent a single linked list (where left is null and right is the next
// node). Implement a method to convert a binary search tree into a linked list
// using the TreeNode class. The values should be kept in order and the
// operation should be performed in-place (on the original data structure).
//
// Example:
//   Input: [4,2,5,1,3,null,6,0]
//   Output: [0,null,1,null,2,null,3,null,4,null,5,null,6]
//
// Constraints:
//   - The number of nodes <= 100000

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
