// 3. *Stack of Plates*:

// Imagine a (literal) stack of plates. If the stack gets too high, it might topple.
// Therefore, in real life, we would likely start a new stack when the previous stack
// exceeds some threshold. Implement a data structure SetOfStacks that mimics this.
// SetOfStacks should be composed of several stacks and should create a new stack once
// the previous one exceeds capacity. SetOfStacks.push() and SetOfStacks.pop() should behave
// identically to a single stack (that is, pop() should return the same values as it would if
// there were just a single stack).

// FOLLOW UP: Implement a function popAt(int index) which performs a pop operation on a specific sub-stack.

export class StackOfPlates<T> {
  private stacks: T[][] = [];
  private capacity: number;

  constructor(capacity: number) {
    if (capacity < 1) throw new Error('Capacity must be at least 1');
    this.capacity = capacity;
  }

  push(value: T): void {
    if (this.stacks.length === 0 || this.stacks[this.stacks.length - 1].length >= this.capacity) {
      this.stacks.push([]);
    }
    this.stacks[this.stacks.length - 1].push(value);
  }

  pop(): T | undefined {
    while (this.stacks.length > 0) {
      const lastStack = this.stacks[this.stacks.length - 1];
      const value = lastStack.pop();

      if (lastStack.length === 0) {
        this.stacks.pop(); // remove empty sub-stack
      }

      if (value !== undefined) return value;
    }

    return undefined;
  }

  popAt(index: number): T | undefined {
    if (index < 0 || index >= this.stacks.length) return undefined;

    const value = this.stacks[index].pop();

    if (this.stacks[index].length === 0) {
      this.stacks.splice(index, 1);
    }

    return value;
  }
}
