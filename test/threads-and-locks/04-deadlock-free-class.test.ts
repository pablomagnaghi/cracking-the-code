import { LockManager } from '../../src/threads-and-locks/04-deadlock-free-class';

describe('LockManager', () => {
  test('grants a lock when no one holds it', () => {
    const lm = new LockManager();
    expect(lm.acquireLock('task1', 'A')).toBe(true);
    expect(lm.getLockOwner('A')).toBe('task1');
  });

  test('denies a lock when another task holds it', () => {
    const lm = new LockManager();
    lm.acquireLock('task1', 'A');
    expect(lm.acquireLock('task2', 'A')).toBe(false);
  });

  test('allows re-acquiring a lock the task already holds', () => {
    const lm = new LockManager();
    lm.acquireLock('task1', 'A');
    expect(lm.acquireLock('task1', 'A')).toBe(true);
  });

  test('releases a lock and allows another task to acquire it', () => {
    const lm = new LockManager();
    lm.acquireLock('task1', 'A');
    expect(lm.releaseLock('task1', 'A')).toBe(true);
    expect(lm.acquireLock('task2', 'A')).toBe(true);
    expect(lm.getLockOwner('A')).toBe('task2');
  });

  test('detects potential deadlock from reverse lock ordering', () => {
    const lm = new LockManager();

    // Task1 acquires A then B, establishing order A -> B
    expect(lm.acquireLock('task1', 'A')).toBe(true);
    expect(lm.acquireLock('task1', 'B')).toBe(true);
    lm.releaseLock('task1', 'A');
    lm.releaseLock('task1', 'B');

    // Task2 tries B then A, which would violate the order (B -> A creates cycle)
    expect(lm.acquireLock('task2', 'B')).toBe(true);
    expect(lm.acquireLock('task2', 'A')).toBe(false); // deadlock detected
  });

  test('allows consistent lock ordering across tasks', () => {
    const lm = new LockManager();

    // Task1 acquires A then B
    expect(lm.acquireLock('task1', 'A')).toBe(true);
    expect(lm.acquireLock('task1', 'B')).toBe(true);
    lm.releaseLock('task1', 'A');
    lm.releaseLock('task1', 'B');

    // Task2 acquires A then B (same order) — should be fine
    expect(lm.acquireLock('task2', 'A')).toBe(true);
    expect(lm.acquireLock('task2', 'B')).toBe(true);
  });

  test('tracks locks held by a task', () => {
    const lm = new LockManager();
    lm.acquireLock('task1', 'X');
    lm.acquireLock('task1', 'Y');

    const locks = lm.getTaskLocks('task1');
    expect(locks).toContain('X');
    expect(locks).toContain('Y');
    expect(locks).toHaveLength(2);
  });

  test('releaseLock returns false if task does not hold the lock', () => {
    const lm = new LockManager();
    expect(lm.releaseLock('task1', 'Z')).toBe(false);
  });

  test('detects transitive deadlock through lock ordering chain', () => {
    const lm = new LockManager();

    // Establish A -> B
    lm.acquireLock('task1', 'A');
    lm.acquireLock('task1', 'B');
    lm.releaseLock('task1', 'A');
    lm.releaseLock('task1', 'B');

    // Establish B -> C
    lm.acquireLock('task2', 'B');
    lm.acquireLock('task2', 'C');
    lm.releaseLock('task2', 'B');
    lm.releaseLock('task2', 'C');

    // Now try C -> A, which would create A -> B -> C -> A cycle
    lm.acquireLock('task3', 'C');
    expect(lm.acquireLock('task3', 'A')).toBe(false);
  });
});
