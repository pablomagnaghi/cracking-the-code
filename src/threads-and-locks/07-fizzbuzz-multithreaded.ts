// 15.07. FizzBuzz Multithreaded
//
// Implement a multithreaded version of FizzBuzz where four separate async
// tasks handle different cases:
//   - Task "fizzbuzz": prints "FizzBuzz" for numbers divisible by both 3 and 5
//   - Task "fizz": prints "Fizz" for numbers divisible by 3 (but not 5)
//   - Task "buzz": prints "Buzz" for numbers divisible by 5 (but not 3)
//   - Task "number": prints the number for all other cases
//
// Approach:
//   - Use a shared counter and a coordination mechanism so that exactly one
//     task handles each number from 1 to n.
//   - A Coordinator class manages the current number and exposes a method
//     for each task to claim and process a number if it matches their rule.
//   - All four tasks run concurrently and the coordinator ensures mutual
//     exclusion on the shared counter.
//
// Example:
//   fizzBuzzMultithreaded(15)
//   // => ['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz',
//   //     '11','Fizz','13','14','FizzBuzz']
//
// Constraints:
//   - Output must be identical to a standard FizzBuzz from 1 to n.
//   - The four tasks must run concurrently (using Promise.all).

type FizzBuzzPredicate = (num: number) => boolean;
type FizzBuzzFormatter = (num: number) => string;

class FizzBuzzCoordinator {
  private current: number = 1;
  private readonly max: number;
  private results: Map<number, string> = new Map();
  private resolveWaiters: Array<() => void> = [];

  constructor(max: number) {
    this.max = max;
  }

  /**
   * Runs a task that handles numbers matching the given predicate.
   * The task loops until current exceeds max, checking each number.
   */
  async runTask(
    predicate: FizzBuzzPredicate,
    formatter: FizzBuzzFormatter
  ): Promise<void> {
    while (true) {
      // Wait until there is a number to process or we're done
      const num = this.current;
      if (num > this.max) return;

      if (predicate(num)) {
        this.results.set(num, formatter(num));
        this.current++;
        this.notifyAll();
      } else {
        // Not our turn — yield and wait for the number to change
        await this.waitForChange();
      }
    }
  }

  private async waitForChange(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.resolveWaiters.push(resolve);
      // Also set a timeout to re-check (in case of race)
      setTimeout(() => resolve(), 0);
    });
  }

  private notifyAll(): void {
    const waiters = this.resolveWaiters.splice(0);
    for (const resolve of waiters) {
      resolve();
    }
  }

  getResults(): string[] {
    const output: string[] = [];
    for (let i = 1; i <= this.max; i++) {
      output.push(this.results.get(i) || String(i));
    }
    return output;
  }
}

/**
 * Runs FizzBuzz from 1 to n using four concurrent async tasks.
 * Returns the results as an ordered array of strings.
 */
export async function fizzBuzzMultithreaded(n: number): Promise<string[]> {
  if (n <= 0) return [];

  const coordinator = new FizzBuzzCoordinator(n);

  const isFizzBuzz: FizzBuzzPredicate = (num) =>
    num % 3 === 0 && num % 5 === 0;
  const isFizz: FizzBuzzPredicate = (num) =>
    num % 3 === 0 && num % 5 !== 0;
  const isBuzz: FizzBuzzPredicate = (num) =>
    num % 5 === 0 && num % 3 !== 0;
  const isNumber: FizzBuzzPredicate = (num) =>
    num % 3 !== 0 && num % 5 !== 0;

  await Promise.all([
    coordinator.runTask(isFizzBuzz, () => 'FizzBuzz'),
    coordinator.runTask(isFizz, () => 'Fizz'),
    coordinator.runTask(isBuzz, () => 'Buzz'),
    coordinator.runTask(isNumber, (num) => String(num)),
  ]);

  return coordinator.getResults();
}
