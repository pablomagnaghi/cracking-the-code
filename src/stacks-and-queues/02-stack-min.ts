// 2. *Stack Min*: How would you design a stack which,
// in addition to push and pop,
// has a function min which returns the minimum element?
// Push, pop, and min should all operate in O(1) time.

export class StackMin<T> {
  private stack: T[];
  private minStack: T[];
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(value: T): void {
    this.stack.push(value);
    if (this.minStack.length === 0 || value <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(value);
    }
  }

  pop(): T | undefined {
    if (this.stack.length === 0) return undefined;
    const value = this.stack.pop()!;
    if (value === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
    return value;
  }

  min(): T | undefined {
    if (this.minStack.length === 0) return undefined;
    return this.minStack[this.minStack.length - 1];
  }

  peek(): T | undefined {
    return this.stack[this.stack.length - 1];
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }
}
