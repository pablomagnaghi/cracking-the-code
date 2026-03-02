// LCCI 03.04. Implement Queue using Stacks
//
// Implement a MyQueue class which implements a queue using two stacks.
// You must use only standard operations of a stack -- which means only push to top,
// peek/pop from top, size, and is empty operations are valid.
//
// Example:
//   MyQueue queue = new MyQueue();
//   queue.push(1);
//   queue.push(2);
//   queue.peek();  // returns 1
//   queue.pop();   // returns 1
//   queue.empty(); // returns false
//
// Constraints:
//   - All operations are valid (no pop or peek on an empty queue).

export class MyQueue<T> {
  private stackNewest: T[];
  private stackOldest: T[];

  constructor() {
    this.stackNewest = [];
    this.stackOldest = [];
  }

  enqueue(value: T): void {
    this.stackNewest.push(value);
  }

  dequeue(): T | undefined {
    this.shiftStacks();
    return this.stackOldest.pop();
  }

  peek(): T | undefined {
    this.shiftStacks();
    return this.stackOldest[this.stackOldest.length - 1];
  }

  isEmpty(): boolean {
    return this.stackNewest.length === 0 && this.stackOldest.length === 0;
  }

  private shiftStacks(): void {
    if (this.stackOldest.length === 0) {
      while (this.stackNewest.length > 0) {
        this.stackOldest.push(this.stackNewest.pop()!);
      }
    }
  }
}
