// 04.11. Random Node
//
// You are implementing a binary search tree class from scratch which, in
// addition to insert, find, and delete, has a method getRandomNode() which
// returns a random node from the tree. All nodes should be equally likely to be
// chosen. Design and implement an algorithm for getRandomNode, and explain how
// you would implement the rest of the methods.
//
// The key insight is to maintain a size field on each node that tracks the
// number of nodes in its subtree (including itself). To select a random node,
// generate a random index in [0, size) and use the left subtree's size to
// decide whether to go left, return the current node, or go right. This
// achieves O(log N) expected time for balanced trees.
//
// Example:
//   Tree:       10
//              /  \
//             5    15
//            / \   / \
//           3   7 13  17
//
//   getRandomNode() -> any of {3, 5, 7, 10, 13, 15, 17} with equal probability (1/7 each)
//
// Example:
//   Tree with single node: 42
//   getRandomNode() -> 42 (always)
//
// Constraints:
//   - Each node must be equally likely to be returned by getRandomNode().
//   - The tree supports insert and find operations following BST ordering.
//   - Each node tracks the size of its subtree to enable O(log N) random selection.
//   - Duplicate values are inserted into the right subtree.

export class TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
  size: number = 1;

  constructor(value: T) {
    this.value = value;
  }

  insert(value: T): void {
    if (value < this.value) {
      if (this.left) {
        this.left.insert(value);
      } else {
        this.left = new TreeNode(value);
      }
    } else {
      if (this.right) {
        this.right.insert(value);
      } else {
        this.right = new TreeNode(value);
      }
    }

    this.size++;
  }

  getRandomNode(): TreeNode<T> {
    const leftSize = this.left?.size ?? 0;
    const index = Math.floor(Math.random() * this.size);

    if (index < leftSize) {
      return this.left!.getRandomNode();
    } else if (index === leftSize) {
      return this;
    } else {
      return this.right!.getRandomNode();
    }
  }

  find(value: T): TreeNode<T> | undefined {
    if (value === this.value) return this;
    if (value < this.value) return this.left?.find(value);
    return this.right?.find(value);
  }
}
