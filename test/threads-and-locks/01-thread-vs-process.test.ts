import {
  SimProcess,
  SimThread,
} from '../../src/threads-and-locks/01-thread-vs-process';

describe('SimProcess (isolated state)', () => {
  test('each process has its own independent memory', () => {
    const p1 = new SimProcess('P1');
    const p2 = new SimProcess('P2');

    p1.write('x', 42);

    expect(p1.read('x')).toBe(42);
    expect(p2.read('x')).toBeUndefined();
  });

  test('writing in one process does not affect another', () => {
    const p1 = new SimProcess('P1');
    const p2 = new SimProcess('P2');

    p1.write('counter', 100);
    p2.write('counter', 200);

    expect(p1.read('counter')).toBe(100);
    expect(p2.read('counter')).toBe(200);
  });

  test('memory snapshot is a copy, not a reference', () => {
    const p = new SimProcess('P1');
    p.write('a', 1);
    const snapshot = p.getMemorySnapshot();

    p.write('b', 2);

    expect(snapshot.has('b')).toBe(false);
    expect(p.read('b')).toBe(2);
  });

  test('read returns undefined for unset keys', () => {
    const p = new SimProcess('P1');
    expect(p.read('nonexistent')).toBeUndefined();
  });
});

describe('SimThread (shared state)', () => {
  test('threads share the same memory', () => {
    const shared = new Map<string, number>();
    const t1 = new SimThread('T1', shared);
    const t2 = new SimThread('T2', shared);

    t1.write('x', 10);

    expect(t2.read('x')).toBe(10);
  });

  test('writes from one thread are visible in another', () => {
    const shared = new Map<string, number>();
    const t1 = new SimThread('T1', shared);
    const t2 = new SimThread('T2', shared);

    t1.write('a', 1);
    t2.write('b', 2);

    expect(t1.read('b')).toBe(2);
    expect(t2.read('a')).toBe(1);
  });

  test('overwriting a value in one thread updates all threads', () => {
    const shared = new Map<string, number>();
    const t1 = new SimThread('T1', shared);
    const t2 = new SimThread('T2', shared);

    t1.write('val', 100);
    expect(t2.read('val')).toBe(100);

    t2.write('val', 999);
    expect(t1.read('val')).toBe(999);
  });

  test('getSharedMemory returns the same reference', () => {
    const shared = new Map<string, number>();
    const t1 = new SimThread('T1', shared);
    const t2 = new SimThread('T2', shared);

    expect(t1.getSharedMemory()).toBe(t2.getSharedMemory());
    expect(t1.getSharedMemory()).toBe(shared);
  });
});

describe('Thread vs Process comparison', () => {
  test('threads share state while processes do not', () => {
    // Processes: isolated
    const p1 = new SimProcess('P1');
    const p2 = new SimProcess('P2');
    p1.write('shared', 42);
    expect(p2.read('shared')).toBeUndefined();

    // Threads: shared
    const sharedMem = new Map<string, number>();
    const t1 = new SimThread('T1', sharedMem);
    const t2 = new SimThread('T2', sharedMem);
    t1.write('shared', 42);
    expect(t2.read('shared')).toBe(42);
  });
});
