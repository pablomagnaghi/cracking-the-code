// 1. *Three in One*: Describe how you could use a single array to implement three stacks.

export class ThreeStacks<T> {
  private stackSize: number;
  private values: (T | undefined)[];
  private sizes: number[];

  constructor(stackSize: number) {
    this.stackSize = stackSize;
    this.values = new Array<T | undefined>(stackSize * 3);
    this.sizes = [0, 0, 0];
  }

  push(stackNum: number, value: T): void {
    if (this.sizes[stackNum] >= this.stackSize) {
      throw new Error(`Stack ${stackNum} is full`);
    }
    this.sizes[stackNum]++;
    this.values[this.indexOfTop(stackNum)] = value;
  }

  pop(stackNum: number): T | undefined {
    if (this.sizes[stackNum] === 0) return undefined;
    const topIndex = this.indexOfTop(stackNum);
    const value = this.values[topIndex];
    this.values[topIndex] = undefined;
    this.sizes[stackNum]--;
    return value;
  }

  peek(stackNum: number): T | undefined {
    if (this.sizes[stackNum] === 0) return undefined;
    return this.values[this.indexOfTop(stackNum)];
  }

  isEmpty(stackNum: number): boolean {
    return this.sizes[stackNum] === 0;
  }

  private indexOfTop(stackNum: number): number {
    const offset = stackNum * this.stackSize;
    const size = this.sizes[stackNum];
    return offset + size - 1;
  }
}
