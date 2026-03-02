import {
  Task,
  TaskScheduler,
} from '../../src/threads-and-locks/02-context-switch';

describe('TaskScheduler', () => {
  test('runs a single task to completion', async () => {
    const scheduler = new TaskScheduler();
    let count = 0;

    const task: Task = {
      id: 'A',
      run: async () => {
        count++;
        return count >= 3;
      },
    };

    scheduler.addTask(task);
    await scheduler.run();

    expect(count).toBe(3);
    const results = scheduler.getResults();
    expect(results).toHaveLength(1);
    expect(results[0].taskId).toBe('A');
  });

  test('runs multiple tasks in round-robin order', async () => {
    const scheduler = new TaskScheduler();
    let countA = 0;
    let countB = 0;

    scheduler.addTask({
      id: 'A',
      run: async () => {
        countA++;
        return countA >= 2;
      },
    });
    scheduler.addTask({
      id: 'B',
      run: async () => {
        countB++;
        return countB >= 2;
      },
    });

    await scheduler.run();

    expect(countA).toBe(2);
    expect(countB).toBe(2);

    const order = scheduler.getExecutionOrder();
    // A runs first, then B (round-robin)
    expect(order[0]).toBe('A');
    expect(order[1]).toBe('B');
  });

  test('records context switch times', async () => {
    const scheduler = new TaskScheduler();

    scheduler.addTask({
      id: 'A',
      run: async () => true, // completes in one step
    });

    await scheduler.run();

    expect(scheduler.getSwitchCount()).toBeGreaterThanOrEqual(1);
    expect(scheduler.getContextSwitchTime()).toBeGreaterThanOrEqual(0);
  });

  test('returns 0 context switch time when no tasks run', () => {
    const scheduler = new TaskScheduler();
    expect(scheduler.getContextSwitchTime()).toBe(0);
    expect(scheduler.getSwitchCount()).toBe(0);
  });

  test('task completion order is recorded', async () => {
    const scheduler = new TaskScheduler();
    let countA = 0;
    let countB = 0;

    scheduler.addTask({
      id: 'A',
      run: async () => {
        countA++;
        return countA >= 1; // completes first
      },
    });
    scheduler.addTask({
      id: 'B',
      run: async () => {
        countB++;
        return countB >= 3; // takes 3 rounds
      },
    });

    await scheduler.run();

    const results = scheduler.getResults();
    expect(results).toHaveLength(2);
    expect(results[0].taskId).toBe('A');
    expect(results[1].taskId).toBe('B');
    expect(results[0].completedAtStep).toBeLessThan(results[1].completedAtStep);
  });

  test('execution order reflects round-robin scheduling', async () => {
    const scheduler = new TaskScheduler();
    let countA = 0;
    let countB = 0;
    let countC = 0;

    scheduler.addTask({
      id: 'A',
      run: async () => { countA++; return countA >= 2; },
    });
    scheduler.addTask({
      id: 'B',
      run: async () => { countB++; return countB >= 2; },
    });
    scheduler.addTask({
      id: 'C',
      run: async () => { countC++; return countC >= 2; },
    });

    await scheduler.run();

    const order = scheduler.getExecutionOrder();
    // First three executions should be A, B, C (round-robin)
    expect(order[0]).toBe('A');
    expect(order[1]).toBe('B');
    expect(order[2]).toBe('C');
  });
});
