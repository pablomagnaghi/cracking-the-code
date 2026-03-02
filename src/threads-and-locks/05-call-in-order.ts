// 15.05. Call In Order
//
// Suppose we have three methods: first(), second(), third(). Design a
// mechanism to ensure they are called in order (first -> second -> third)
// even when invoked from different async contexts that may start in any
// order.
//
// Approach:
//   - Use Promises as barriers. second() awaits a Promise that is only
//     resolved when first() completes. third() awaits a Promise that is
//     only resolved when second() completes.
//   - The OrderedCaller holds the resolve callbacks and the barrier
//     Promises. Each method awaits its barrier, does its work, then
//     resolves the next barrier.
//   - getResults returns the accumulated output, proving execution order.
//
// Example:
//   const caller = new OrderedCaller();
//   // Start in reverse order — they still execute in order
//   const p3 = caller.third();
//   const p2 = caller.second();
//   const p1 = caller.first();
//   await Promise.all([p1, p2, p3]);
//   caller.getResults(); // => ['first', 'second', 'third']
//
// Constraints:
//   - Each method must execute exactly once.
//   - Execution order is always first -> second -> third regardless of
//     call order.

export class OrderedCaller {
  private results: string[] = [];

  private firstDoneResolve!: () => void;
  private firstDone: Promise<void>;

  private secondDoneResolve!: () => void;
  private secondDone: Promise<void>;

  constructor() {
    this.firstDone = new Promise<void>((resolve) => {
      this.firstDoneResolve = resolve;
    });
    this.secondDone = new Promise<void>((resolve) => {
      this.secondDoneResolve = resolve;
    });
  }

  /** Executes immediately and signals that first is done. */
  async first(): Promise<void> {
    this.results.push('first');
    this.firstDoneResolve();
  }

  /** Waits for first() to complete, then executes. */
  async second(): Promise<void> {
    await this.firstDone;
    this.results.push('second');
    this.secondDoneResolve();
  }

  /** Waits for second() to complete, then executes. */
  async third(): Promise<void> {
    await this.secondDone;
    this.results.push('third');
  }

  /** Returns the results accumulated so far. */
  getResults(): string[] {
    return [...this.results];
  }
}
