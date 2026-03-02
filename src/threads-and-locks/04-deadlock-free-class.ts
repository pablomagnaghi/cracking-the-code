// 15.04. Deadlock-Free Class
//
// Design a class which provides a lock only if doing so will not create a
// deadlock. Implement a LockManager that tracks lock ordering and rejects
// requests that would form cycles in the wait-for graph.
//
// Approach:
//   - Maintain a directed graph of lock ordering. When a task that already
//     holds lock A requests lock B, we add an edge A -> B (meaning "A was
//     acquired before B").
//   - Before adding the edge, check whether B -> A already exists
//     (directly or transitively). If so, granting the request would violate
//     the global lock ordering and could lead to deadlock.
//   - This is the standard lock-ordering / graph-based approach: the lock
//     order graph must remain a DAG.
//
// Example:
//   const lm = new LockManager();
//   lm.acquireLock('task1', 'A'); // true — first lock, no ordering issue
//   lm.acquireLock('task1', 'B'); // true — adds edge A -> B
//   lm.releaseLock('task1', 'A');
//   lm.releaseLock('task1', 'B');
//   lm.acquireLock('task2', 'B'); // true
//   lm.acquireLock('task2', 'A'); // false — would add edge B -> A,
//                                 //   but A -> B exists => cycle
//
// Constraints:
//   - Each lock can be held by at most one task at a time.
//   - acquireLock returns true if the lock was granted, false if denied.
//   - A task can hold multiple locks simultaneously.

export class LockManager {
  /** Maps lock ID to the task ID that currently holds it. */
  private lockOwner: Map<string, string> = new Map();

  /** Maps task ID to the list of lock IDs it currently holds (in order). */
  private taskLocks: Map<string, string[]> = new Map();

  /**
   * Global lock-ordering graph. An edge from A to B means "some task
   * once acquired A before B", establishing that A must always precede B.
   */
  private orderGraph: Map<string, Set<string>> = new Map();

  /**
   * Attempts to acquire a lock for a task. Returns true if granted,
   * false if it would violate the global lock ordering (potential deadlock)
   * or the lock is already held by another task.
   */
  acquireLock(taskId: string, lockId: string): boolean {
    // If the task already holds this lock, succeed idempotently
    const held = this.taskLocks.get(taskId);
    if (held && held.includes(lockId)) {
      return true;
    }

    // If another task holds the lock, deny (cannot block in this model)
    const owner = this.lockOwner.get(lockId);
    if (owner !== undefined && owner !== taskId) {
      return false;
    }

    // Check lock ordering: for each lock the task currently holds, we
    // would add an edge heldLock -> lockId. Check that this does not
    // create a cycle (i.e., lockId must not already reach heldLock).
    if (held && held.length > 0) {
      if (this.wouldDeadlock(taskId, lockId)) {
        return false;
      }

      // Add ordering edges: every currently held lock precedes lockId
      for (const heldLock of held) {
        if (!this.orderGraph.has(heldLock)) {
          this.orderGraph.set(heldLock, new Set());
        }
        this.orderGraph.get(heldLock)!.add(lockId);
      }
    }

    // Grant the lock
    this.lockOwner.set(lockId, taskId);
    if (!this.taskLocks.has(taskId)) {
      this.taskLocks.set(taskId, []);
    }
    this.taskLocks.get(taskId)!.push(lockId);
    return true;
  }

  /**
   * Releases a lock held by a task. Returns true if the lock was released,
   * false if the task did not hold the lock.
   */
  releaseLock(taskId: string, lockId: string): boolean {
    const owner = this.lockOwner.get(lockId);
    if (owner !== taskId) {
      return false;
    }

    this.lockOwner.delete(lockId);
    const held = this.taskLocks.get(taskId);
    if (held) {
      const idx = held.indexOf(lockId);
      if (idx !== -1) {
        held.splice(idx, 1);
      }
      if (held.length === 0) {
        this.taskLocks.delete(taskId);
      }
    }
    return true;
  }

  /**
   * Checks whether granting lockId to taskId would create a cycle
   * in the global lock-ordering graph.
   *
   * For each lock currently held by the task, we would add an edge
   * heldLock -> lockId. A cycle exists if lockId can already reach
   * any of those held locks in the existing graph.
   */
  wouldDeadlock(taskId: string, lockId: string): boolean {
    const held = this.taskLocks.get(taskId);
    if (!held || held.length === 0) {
      return false;
    }

    // Check: can we reach any held lock starting from lockId?
    const heldSet = new Set(held);
    const visited = new Set<string>();
    const stack = [lockId];

    while (stack.length > 0) {
      const current = stack.pop()!;
      if (heldSet.has(current)) {
        return true; // Cycle detected
      }
      if (visited.has(current)) continue;
      visited.add(current);

      const neighbors = this.orderGraph.get(current);
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }

    return false;
  }

  /** Returns the task currently holding a given lock, or undefined. */
  getLockOwner(lockId: string): string | undefined {
    return this.lockOwner.get(lockId);
  }

  /** Returns all locks currently held by a task. */
  getTaskLocks(taskId: string): string[] {
    const held = this.taskLocks.get(taskId);
    return held ? [...held] : [];
  }
}
