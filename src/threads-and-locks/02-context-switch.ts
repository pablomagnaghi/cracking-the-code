// 15.02. Context Switch
//
// How would you measure the time spent in a context switch? Implement a
// TaskScheduler that simulates context switching between async tasks and
// measures the overhead.
//
// Approach:
//   - Each Task is an async function that performs some work and can yield
//     control back to the scheduler.
//   - The TaskScheduler runs tasks in round-robin fashion. Between each
//     task execution it records the time taken for the "context switch"
//     (the scheduling overhead between finishing one task's slice and
//     starting the next).
//   - After all tasks complete, getContextSwitchTime returns the average
//     measured overhead across all switches.
//
// Example:
//   const scheduler = new TaskScheduler();
//   scheduler.addTask({ id: 'A', run: async () => { ... } });
//   scheduler.addTask({ id: 'B', run: async () => { ... } });
//   await scheduler.run();
//   scheduler.getContextSwitchTime(); // average switch overhead in ms
//
// Constraints:
//   - Tasks run cooperatively; each run() invocation does one unit of work.
//   - Context switch time is measured as wall-clock time between tasks.

export interface Task {
  id: string;
  /** Performs one unit of work. Returns true when the task is complete. */
  run: () => Promise<boolean>;
}

export interface TaskResult {
  taskId: string;
  completedAtStep: number;
}

export class TaskScheduler {
  private tasks: Task[] = [];
  private switchTimes: number[] = [];
  private results: TaskResult[] = [];
  private executionOrder: string[] = [];

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  /** Runs all tasks in round-robin order until every task completes. */
  async run(): Promise<void> {
    const active = [...this.tasks];
    let step = 0;

    while (active.length > 0) {
      const task = active[0];

      const beforeSwitch = Date.now();

      // Simulate context-switch overhead: yield to the event loop
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 0);
      });

      const afterSwitch = Date.now();
      this.switchTimes.push(afterSwitch - beforeSwitch);

      this.executionOrder.push(task.id);
      const done = await task.run();
      step++;

      if (done) {
        this.results.push({ taskId: task.id, completedAtStep: step });
        active.shift();
      } else {
        // Move to back of queue (round-robin)
        active.push(active.shift()!);
      }
    }
  }

  /**
   * Returns the average context-switch overhead in milliseconds.
   * Returns 0 if no switches have been recorded.
   */
  getContextSwitchTime(): number {
    if (this.switchTimes.length === 0) return 0;
    const total = this.switchTimes.reduce((sum, t) => sum + t, 0);
    return total / this.switchTimes.length;
  }

  /** Returns the number of context switches that occurred. */
  getSwitchCount(): number {
    return this.switchTimes.length;
  }

  /** Returns results in completion order. */
  getResults(): TaskResult[] {
    return [...this.results];
  }

  /** Returns the sequence of task IDs in execution order. */
  getExecutionOrder(): string[] {
    return [...this.executionOrder];
  }
}
