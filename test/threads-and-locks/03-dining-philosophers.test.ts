import {
  Fork,
  Philosopher,
  DiningTable,
} from '../../src/threads-and-locks/03-dining-philosophers';

describe('Fork', () => {
  test('can be acquired and released', async () => {
    const fork = new Fork(0);
    expect(fork.isLocked()).toBe(false);

    await fork.acquire();
    expect(fork.isLocked()).toBe(true);

    fork.release();
    expect(fork.isLocked()).toBe(false);
  });

  test('second acquire waits until release', async () => {
    const fork = new Fork(0);
    await fork.acquire();

    let secondAcquired = false;
    const p = fork.acquire().then(() => {
      secondAcquired = true;
    });

    // Second acquire should be waiting
    expect(secondAcquired).toBe(false);

    fork.release();
    await p;
    expect(secondAcquired).toBe(true);
  });
});

describe('DiningTable', () => {
  test('all philosophers eat the requested number of meals', async () => {
    const table = new DiningTable(5);
    const meals = 3;

    await table.simulate(meals);

    for (const philosopher of table.getPhilosophers()) {
      expect(philosopher.getMealsEaten()).toBe(meals);
    }
  });

  test('simulation completes without deadlock for 2 philosophers', async () => {
    const table = new DiningTable(2);
    const log = await table.simulate(2);

    expect(log.length).toBeGreaterThan(0);
    for (const philosopher of table.getPhilosophers()) {
      expect(philosopher.getMealsEaten()).toBe(2);
    }
  });

  test('simulation log contains expected action types', async () => {
    const table = new DiningTable(3);
    const log = await table.simulate(1);

    const actions = new Set(log.map((entry) => entry.action));
    expect(actions.has('thinking')).toBe(true);
    expect(actions.has('picking-up-forks')).toBe(true);
    expect(actions.has('eating')).toBe(true);
    expect(actions.has('putting-down-forks')).toBe(true);
  });

  test('each eating action has a valid meal number', async () => {
    const table = new DiningTable(4);
    const meals = 2;
    const log = await table.simulate(meals);

    const eatingEntries = log.filter((e) => e.action === 'eating');
    for (const entry of eatingEntries) {
      expect(entry.meal).toBeGreaterThanOrEqual(1);
      expect(entry.meal).toBeLessThanOrEqual(meals);
    }
    // Total eating entries should be 4 philosophers * 2 meals = 8
    expect(eatingEntries).toHaveLength(4 * meals);
  });

  test('forks are released after simulation', async () => {
    const table = new DiningTable(3);
    await table.simulate(1);

    for (const fork of table.getForks()) {
      expect(fork.isLocked()).toBe(false);
    }
  });

  test('creates correct number of philosophers and forks', () => {
    const table = new DiningTable(5);
    expect(table.getPhilosophers()).toHaveLength(5);
    expect(table.getForks()).toHaveLength(5);
  });
});
