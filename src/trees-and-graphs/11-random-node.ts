// 4.11 Random Node:
//
// You are implementing a binary tree class from scratch,
// which, in addition to insert, find, and delete, has a method getRandomNode(),
// which returns a random node from the tree. All nodes should be equally likely to be chosen.
//
// Design and implement this method. You may use basic operations on a binary search tree.

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
