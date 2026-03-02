import { OrderedCaller } from '../../src/threads-and-locks/05-call-in-order';

describe('OrderedCaller', () => {
  test('executes in order when called in order', async () => {
    const caller = new OrderedCaller();

    await caller.first();
    await caller.second();
    await caller.third();

    expect(caller.getResults()).toEqual(['first', 'second', 'third']);
  });

  test('executes in order when called in reverse order', async () => {
    const caller = new OrderedCaller();

    const p3 = caller.third();
    const p2 = caller.second();
    const p1 = caller.first();

    await Promise.all([p1, p2, p3]);

    expect(caller.getResults()).toEqual(['first', 'second', 'third']);
  });

  test('executes in order when second is called before first', async () => {
    const caller = new OrderedCaller();

    const p2 = caller.second();
    const p1 = caller.first();
    const p3 = caller.third();

    await Promise.all([p1, p2, p3]);

    expect(caller.getResults()).toEqual(['first', 'second', 'third']);
  });

  test('executes in order when third is called first', async () => {
    const caller = new OrderedCaller();

    const p3 = caller.third();
    const p1 = caller.first();
    const p2 = caller.second();

    await Promise.all([p1, p2, p3]);

    expect(caller.getResults()).toEqual(['first', 'second', 'third']);
  });

  test('results accumulate correctly', async () => {
    const caller = new OrderedCaller();

    await caller.first();
    expect(caller.getResults()).toEqual(['first']);

    await caller.second();
    expect(caller.getResults()).toEqual(['first', 'second']);

    await caller.third();
    expect(caller.getResults()).toEqual(['first', 'second', 'third']);
  });

  test('getResults returns a copy, not a reference', async () => {
    const caller = new OrderedCaller();
    await caller.first();

    const results = caller.getResults();
    results.push('tampered');

    expect(caller.getResults()).toEqual(['first']);
  });

  test('all three methods resolve their promises', async () => {
    const caller = new OrderedCaller();

    const results = await Promise.all([
      caller.third().then(() => 'third-resolved'),
      caller.second().then(() => 'second-resolved'),
      caller.first().then(() => 'first-resolved'),
    ]);

    // All promises should resolve (no hanging)
    expect(results).toContain('first-resolved');
    expect(results).toContain('second-resolved');
    expect(results).toContain('third-resolved');
  });
});
