// LCCI 03.05. Sort of Stacks
//
// Write a program to sort a stack such that the smallest items are on the top.
// You can use an additional temporary stack, but you may not copy the elements
// into any other data structure (such as an array).
// The stack supports the following operations: push, pop, peek, and isEmpty.
//
// Example 1:
//   Input: ["SortedStack", "push", "push", "peek", "pop", "peek"]
//          [[], [1], [2], [], [], []]
//   Output: [null, null, null, 1, null, 2]
//
// Example 2:
//   Input: ["SortedStack", "pop", "pop", "push", "pop", "isEmpty"]
//          [[], [], [], [1], [], []]
//   Output: [null, null, null, null, null, true]
//
// Constraints:
//   - Total elements in stack: [0, 5000].

export class SortStack<T> {
  private stack: T[] = [];
  private tempStack: T[] = [];

  push(value: T): void {
    while (this.stack.length > 0 && this.stack[this.stack.length - 1]! < value) {
      this.tempStack.push(this.stack.pop()!);
    }
    this.stack.push(value);
    while (this.tempStack.length > 0) {
      this.stack.push(this.tempStack.pop()!);
    }
  }

  pop(): T | undefined {
    return this.stack.pop();
  }

  peek(): T | undefined {
    return this.stack[this.stack.length - 1];
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }
}
