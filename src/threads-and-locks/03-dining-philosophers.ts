// 15.03. Dining Philosophers
//
// In the famous dining philosophers problem, a bunch of philosophers are
// sitting around a circular table with one fork between each pair. Each
// philosopher needs both the left and right fork to eat. Implement a
// simulation that avoids deadlock.
//
// Approach:
//   - Use resource ordering to prevent deadlock: each philosopher always
//     picks up the lower-numbered fork first, then the higher-numbered
//     fork. This breaks the circular-wait condition.
//   - Each Fork has an async acquire/release mechanism (a simple mutex
//     built on Promises).
//   - The DiningTable creates N philosophers and N forks, then runs the
//     simulation where each philosopher eats a given number of times.
//
// Example:
//   const table = new DiningTable(5);
//   const log = await table.simulate(3); // each philosopher eats 3 times
//   // log contains entries like { philosopher: 0, action: 'eating', meal: 1 }
//
// Constraints:
//   - No deadlock: resource ordering guarantees progress.
//   - Every philosopher must eat the requested number of meals.

export class Fork {
  readonly id: number;
  private locked: boolean = false;
  private waitQueue: Array<() => void> = [];

  constructor(id: number) {
    this.id = id;
  }

  async acquire(): Promise<void> {
    if (!this.locked) {
      this.locked = true;
      return;
    }
    return new Promise<void>((resolve) => {
      this.waitQueue.push(() => {
        this.locked = true;
        resolve();
      });
    });
  }

  release(): void {
    if (this.waitQueue.length > 0) {
      const next = this.waitQueue.shift()!;
      next();
    } else {
      this.locked = false;
    }
  }

  isLocked(): boolean {
    return this.locked;
  }
}

export interface DiningLogEntry {
  philosopher: number;
  action: 'thinking' | 'picking-up-forks' | 'eating' | 'putting-down-forks';
  meal?: number;
}

export class Philosopher {
  readonly id: number;
  private leftFork: Fork;
  private rightFork: Fork;
  private mealsEaten: number = 0;

  constructor(id: number, leftFork: Fork, rightFork: Fork) {
    this.id = id;
    this.leftFork = leftFork;
    this.rightFork = rightFork;
  }

  /**
   * Eat a given number of meals, using resource ordering to avoid deadlock.
   * Always acquire the fork with the lower ID first.
   */
  async dine(meals: number, log: DiningLogEntry[]): Promise<void> {
    const firstFork =
      this.leftFork.id < this.rightFork.id ? this.leftFork : this.rightFork;
    const secondFork =
      this.leftFork.id < this.rightFork.id ? this.rightFork : this.leftFork;

    for (let m = 1; m <= meals; m++) {
      log.push({ philosopher: this.id, action: 'thinking' });

      // Yield to simulate thinking time
      await new Promise<void>((resolve) => setTimeout(resolve, 0));

      log.push({ philosopher: this.id, action: 'picking-up-forks' });
      await firstFork.acquire();
      await secondFork.acquire();

      log.push({ philosopher: this.id, action: 'eating', meal: m });
      this.mealsEaten++;

      // Yield to simulate eating time
      await new Promise<void>((resolve) => setTimeout(resolve, 0));

      log.push({ philosopher: this.id, action: 'putting-down-forks' });
      secondFork.release();
      firstFork.release();
    }
  }

  getMealsEaten(): number {
    return this.mealsEaten;
  }
}

export class DiningTable {
  private forks: Fork[];
  private philosophers: Philosopher[];

  constructor(numPhilosophers: number) {
    this.forks = [];
    this.philosophers = [];

    for (let i = 0; i < numPhilosophers; i++) {
      this.forks.push(new Fork(i));
    }

    for (let i = 0; i < numPhilosophers; i++) {
      const leftFork = this.forks[i];
      const rightFork = this.forks[(i + 1) % numPhilosophers];
      this.philosophers.push(new Philosopher(i, leftFork, rightFork));
    }
  }

  /**
   * Simulate dining: all philosophers eat concurrently.
   * Returns a log of all actions taken.
   */
  async simulate(mealsPerPhilosopher: number): Promise<DiningLogEntry[]> {
    const log: DiningLogEntry[] = [];

    await Promise.all(
      this.philosophers.map((p) => p.dine(mealsPerPhilosopher, log))
    );

    return log;
  }

  getPhilosophers(): Philosopher[] {
    return [...this.philosophers];
  }

  getForks(): Fork[] {
    return [...this.forks];
  }
}
