import {
  Mutex,
  SynchronizedClass,
} from '../../src/threads-and-locks/06-synchronized-methods';

describe('Mutex', () => {
  test('starts unlocked', () => {
    const mutex = new Mutex();
    expect(mutex.isLocked()).toBe(false);
    expect(mutex.getQueueLength()).toBe(0);
  });

  test('acquire locks and release unlocks', async () => {
    const mutex = new Mutex();
    await mutex.acquire();
    expect(mutex.isLocked()).toBe(true);

    mutex.release();
    expect(mutex.isLocked()).toBe(false);
  });

  test('queues concurrent acquires in FIFO order', async () => {
    const mutex = new Mutex();
    const order: number[] = [];

    await mutex.acquire();

    const p1 = mutex.acquire().then(() => order.push(1));
    const p2 = mutex.acquire().then(() => order.push(2));

    expect(mutex.getQueueLength()).toBe(2);

    mutex.release(); // releases to p1
    await p1;

    mutex.release(); // releases to p2
    await p2;

    expect(order).toEqual([1, 2]);
  });
});

describe('SynchronizedClass', () => {
  test('methodA serializes calls on the same instance', async () => {
    const obj = new SynchronizedClass('obj1');

    await Promise.all([obj.methodA('caller1'), obj.methodA('caller2')]);

    const log = obj.getLog();
    // caller1 should start and end before caller2 starts
    const startIdx1 = log.indexOf('obj1:methodA:start:caller1');
    const endIdx1 = log.indexOf('obj1:methodA:end:caller1');
    const startIdx2 = log.indexOf('obj1:methodA:start:caller2');

    expect(startIdx1).toBeLessThan(endIdx1);
    expect(endIdx1).toBeLessThan(startIdx2);
  });

  test('methodA on different instances runs concurrently', async () => {
    const obj1 = new SynchronizedClass('obj1');
    const obj2 = new SynchronizedClass('obj2');

    const [result1, result2] = await Promise.all([
      obj1.methodA('caller1'),
      obj2.methodA('caller2'),
    ]);

    expect(result1).toBe('obj1:methodA:caller1');
    expect(result2).toBe('obj2:methodA:caller2');

    // Both instances have independent logs
    expect(obj1.getLog()).toHaveLength(2);
    expect(obj2.getLog()).toHaveLength(2);
  });

  test('methodB runs without locking', async () => {
    const obj = new SynchronizedClass('obj1');

    const result = await obj.methodB('caller1');

    expect(result).toBe('obj1:methodB:caller1');
    expect(obj.getMutex().isLocked()).toBe(false);
  });

  test('methodB can run concurrently on the same instance', async () => {
    const obj = new SynchronizedClass('obj1');

    const [r1, r2] = await Promise.all([
      obj.methodB('caller1'),
      obj.methodB('caller2'),
    ]);

    expect(r1).toBe('obj1:methodB:caller1');
    expect(r2).toBe('obj1:methodB:caller2');

    const log = obj.getLog();
    // Both should start before either ends (concurrent)
    const start1 = log.indexOf('obj1:methodB:start:caller1');
    const start2 = log.indexOf('obj1:methodB:start:caller2');
    const end1 = log.indexOf('obj1:methodB:end:caller1');
    const end2 = log.indexOf('obj1:methodB:end:caller2');

    // Both starts happen (positions 0 and 1) before both ends
    expect(start1).toBeLessThan(end1);
    expect(start2).toBeLessThan(end2);
  });

  test('methodA releases the mutex after completion', async () => {
    const obj = new SynchronizedClass('obj1');

    await obj.methodA('caller1');

    expect(obj.getMutex().isLocked()).toBe(false);
  });

  test('each instance has its own mutex', () => {
    const obj1 = new SynchronizedClass('obj1');
    const obj2 = new SynchronizedClass('obj2');

    expect(obj1.getMutex()).not.toBe(obj2.getMutex());
  });
});
