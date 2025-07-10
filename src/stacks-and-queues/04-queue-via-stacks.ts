// 4. *Queue via Stacks*:

// Implement a MyQueue class which implements a queue using two stacks.

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
