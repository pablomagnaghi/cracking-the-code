// LCCI 03.03. Stack of Plates
//
// Imagine a (literal) stack of plates. If the stack gets too high, it might topple.
// Therefore, in real life, we would likely start a new stack when the previous stack
// exceeds some threshold. Implement a data structure SetOfStacks that mimics this.
// SetOfStacks should be composed of several stacks and should create a new stack once
// the previous one exceeds capacity. push() and pop() should behave identically to a
// single stack. Also implement popAt(index) which performs a pop on a specific sub-stack.
//
// Example 1:
//   Input: ["StackOfPlates", "push", "push", "popAt", "pop", "pop"]
//          [[1], [1], [2], [1], [], []]
//   Output: [null, null, null, 2, 1, -1]
//
// Example 2:
//   Input: ["StackOfPlates", "push", "push", "push", "popAt", "popAt", "popAt"]
//          [[2], [1], [2], [3], [0], [0], [0]]
//   Output: [null, null, null, null, 2, 1, 3]

export class StackOfPlates<T> {
  private stacks: T[][];
  private capacity: number;

  constructor(capacity: number) {
    this.stacks = [];

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
