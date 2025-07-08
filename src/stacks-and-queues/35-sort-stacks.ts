// 5. *Sort Stack*:

// Write a program to sort a stack such that the smallest items are on the top.
// You can use an additional temporary stack, but you may not copy the elements
// into any other data structure (such as an array).
// The stack supports the following operations: push, pop, peek, and isEmpty.

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

    console.log("stack: ", this.stack)
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
