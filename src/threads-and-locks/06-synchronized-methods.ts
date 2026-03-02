// 15.06. Synchronized Methods
//
// You are given a class with a synchronized method A and a normal method B.
// Can thread 1 call A on instance 1 while thread 2 calls A on instance 2?
// Yes — synchronized methods lock on the instance, not the class.
//
// Adapt: implement a Mutex class and demonstrate per-instance vs class-level
// locking. SynchronizedClass has methodA (per-instance locked via Mutex) and
// methodB (unlocked). Two instances can run methodA concurrently because
// each instance has its own Mutex.
//
// Approach:
//   - Mutex provides acquire() and release(). acquire() returns a Promise
//     that resolves when the lock is available. Queued callers are served
//     in FIFO order.
//   - SynchronizedClass gives each instance its own Mutex. methodA acquires
//     the instance mutex before doing work, so two calls on the SAME
//     instance are serialized, while calls on DIFFERENT instances run
//     concurrently.
//   - methodB has no locking and always runs immediately.
//
// Example:
//   const obj1 = new SynchronizedClass('obj1');
//   const obj2 = new SynchronizedClass('obj2');
//   // These run concurrently (different instances):
//   await Promise.all([obj1.methodA(), obj2.methodA()]);
//
// Constraints:
//   - Mutex must be fair (FIFO).
//   - methodA must not allow concurrent execution on the same instance.
//   - methodB has no such restriction.

export class Mutex {
  private locked: boolean = false;
  private queue: Array<() => void> = [];

  /** Acquires the mutex. Resolves when the lock is obtained. */
  async acquire(): Promise<void> {
    if (!this.locked) {
      this.locked = true;
      return;
    }
    return new Promise<void>((resolve) => {
      this.queue.push(resolve);
    });
  }

  /** Releases the mutex, allowing the next waiter (if any) to proceed. */
  release(): void {
    if (this.queue.length > 0) {
      const next = this.queue.shift()!;
      // Keep locked = true, transfer ownership
      next();
    } else {
      this.locked = false;
    }
  }

  isLocked(): boolean {
    return this.locked;
  }

  getQueueLength(): number {
    return this.queue.length;
  }
}

export class SynchronizedClass {
  readonly id: string;
  private mutex: Mutex = new Mutex();
  private log: string[] = [];

  constructor(id: string) {
    this.id = id;
  }

  /**
   * Synchronized method: per-instance locking.
   * Only one caller at a time can execute this on the same instance.
   */
  async methodA(callerId: string): Promise<string> {
    await this.mutex.acquire();
    try {
      const entry = `${this.id}:methodA:start:${callerId}`;
      this.log.push(entry);

      // Simulate async work
      await new Promise<void>((resolve) => setTimeout(resolve, 0));

      const exit = `${this.id}:methodA:end:${callerId}`;
      this.log.push(exit);

      return `${this.id}:methodA:${callerId}`;
    } finally {
      this.mutex.release();
    }
  }

  /**
   * Unsynchronized method: no locking.
   * Multiple callers can execute concurrently on the same instance.
   */
  async methodB(callerId: string): Promise<string> {
    const entry = `${this.id}:methodB:start:${callerId}`;
    this.log.push(entry);

    // Simulate async work
    await new Promise<void>((resolve) => setTimeout(resolve, 0));

    const exit = `${this.id}:methodB:end:${callerId}`;
    this.log.push(exit);

    return `${this.id}:methodB:${callerId}`;
  }

  getLog(): string[] {
    return [...this.log];
  }

  getMutex(): Mutex {
    return this.mutex;
  }
}
