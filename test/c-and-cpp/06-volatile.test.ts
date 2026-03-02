import { SharedState } from '../../src/c-and-cpp/06-volatile';

describe('SharedState (volatile simulation)', () => {
  test('set and get a value', () => {
    const state = new SharedState();
    state.set('counter', 0);
    expect(state.get('counter')).toBe(0);
  });

  test('get returns undefined for unset keys', () => {
    const state = new SharedState();
    expect(state.get('missing')).toBeUndefined();
  });

  test('overwrites a value', () => {
    const state = new SharedState();
    state.set('flag', false);
    state.set('flag', true);
    expect(state.get('flag')).toBe(true);
  });

  test('onChange listener is called on set', () => {
    const state = new SharedState();
    const log: unknown[] = [];
    state.onChange('temp', (newVal: unknown) => log.push(newVal));
    state.set('temp', 100);
    state.set('temp', 200);
    expect(log).toEqual([100, 200]);
  });

  test('onChange provides old value', () => {
    const state = new SharedState();
    state.set('val', 'first');
    const oldValues: unknown[] = [];
    state.onChange('val', (_newVal: unknown, oldVal: unknown) => oldValues.push(oldVal));
    state.set('val', 'second');
    state.set('val', 'third');
    expect(oldValues).toEqual(['first', 'second']);
  });

  test('unsubscribe removes listener', () => {
    const state = new SharedState();
    const log: unknown[] = [];
    const unsub = state.onChange('key', (val: unknown) => log.push(val));
    state.set('key', 1);
    unsub();
    state.set('key', 2);
    expect(log).toEqual([1]); // only first call recorded
  });

  test('multiple listeners on the same key', () => {
    const state = new SharedState();
    const log1: unknown[] = [];
    const log2: unknown[] = [];
    state.onChange('k', (v: unknown) => log1.push(v));
    state.onChange('k', (v: unknown) => log2.push(v));
    state.set('k', 'hello');
    expect(log1).toEqual(['hello']);
    expect(log2).toEqual(['hello']);
  });

  test('has() reports key existence', () => {
    const state = new SharedState();
    expect(state.has('x')).toBe(false);
    state.set('x', 1);
    expect(state.has('x')).toBe(true);
  });

  test('keys() returns all stored keys', () => {
    const state = new SharedState();
    state.set('a', 1);
    state.set('b', 2);
    state.set('c', 3);
    expect(state.keys().sort()).toEqual(['a', 'b', 'c']);
  });

  test('listeners for different keys are independent', () => {
    const state = new SharedState();
    const logA: unknown[] = [];
    const logB: unknown[] = [];
    state.onChange('a', (v: unknown) => logA.push(v));
    state.onChange('b', (v: unknown) => logB.push(v));
    state.set('a', 'alpha');
    state.set('b', 'beta');
    expect(logA).toEqual(['alpha']);
    expect(logB).toEqual(['beta']);
  });
});
