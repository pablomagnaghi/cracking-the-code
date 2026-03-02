// 15.01. Thread vs Process
//
// What is the difference between a thread and a process? Demonstrate the
// conceptual differences using simulated Process and Thread classes with
// shared vs isolated state.
//
// Approach:
//   - A SimProcess has its own isolated memory (a private Map). Writing to
//     one process's memory never affects another process.
//   - SimThread instances share a common memory reference (a Map passed at
//     construction). Writing in one thread is immediately visible in another
//     thread that shares the same memory.
//   - This mirrors the real distinction: processes have separate address
//     spaces while threads within the same process share a single address
//     space.
//
// Example:
//   const shared = new Map<string, number>();
//   const t1 = new SimThread('T1', shared);
//   const t2 = new SimThread('T2', shared);
//   t1.write('x', 10);
//   t2.read('x'); // => 10   (shared memory)
//
//   const p1 = new SimProcess('P1');
//   const p2 = new SimProcess('P2');
//   p1.write('x', 10);
//   p2.read('x'); // => undefined  (isolated memory)
//
// Constraints:
//   - Memory is modeled as Map<string, number>.
//   - read returns undefined when a key has not been written.

export class SimProcess {
  readonly id: string;
  private memory: Map<string, number> = new Map();

  constructor(id: string) {
    this.id = id;
  }

  write(key: string, value: number): void {
    this.memory.set(key, value);
  }

  read(key: string): number | undefined {
    return this.memory.get(key);
  }

  /** Returns a snapshot of the isolated memory. */
  getMemorySnapshot(): Map<string, number> {
    return new Map(this.memory);
  }
}

export class SimThread {
  readonly id: string;
  private sharedMemory: Map<string, number>;

  constructor(id: string, sharedMemory: Map<string, number>) {
    this.id = id;
    this.sharedMemory = sharedMemory;
  }

  write(key: string, value: number): void {
    this.sharedMemory.set(key, value);
  }

  read(key: string): number | undefined {
    return this.sharedMemory.get(key);
  }

  /** Returns a reference to the shared memory (not a copy). */
  getSharedMemory(): Map<string, number> {
    return this.sharedMemory;
  }
}
