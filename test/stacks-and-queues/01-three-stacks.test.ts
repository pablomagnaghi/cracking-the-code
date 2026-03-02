import { ThreeStacks } from '../../src/stacks-and-queues/01-three-stacks';

describe('ThreeStacks', () => {
  let stacks: ThreeStacks<number>;

  beforeEach(() => {
    stacks = new ThreeStacks<number>(3);
  });

  test('push and pop from each stack', () => {
    stacks.push(0, 10);
    stacks.push(1, 20);
    stacks.push(2, 30);

    expect(stacks.pop(0)).toBe(10);
    expect(stacks.pop(1)).toBe(20);
    expect(stacks.pop(2)).toBe(30);
  });

  test('peek returns top without removing', () => {
    stacks.push(0, 5);
    expect(stacks.peek(0)).toBe(5);
    expect(stacks.pop(0)).toBe(5);
  });

  test('isEmpty works correctly', () => {
    expect(stacks.isEmpty(1)).toBe(true);
    stacks.push(1, 42);
    expect(stacks.isEmpty(1)).toBe(false);
  });

  test('throws error when pushing to full stack', () => {
    stacks.push(0, 1);
    stacks.push(0, 2);
    stacks.push(0, 3);
    expect(() => stacks.push(0, 4)).toThrow('Stack 0 is full');
  });

  test('returns undefined when popping empty stack', () => {
    expect(stacks.pop(2)).toBeUndefined();
  });

  test('LCCI example 1: stackSize=1, push overflow ignored', () => {
    const s = new ThreeStacks<number>(1);
    s.push(0, 1);
    expect(() => s.push(0, 2)).toThrow(); // stack full
    expect(s.pop(0)).toBe(1);
    expect(s.pop(0)).toBeUndefined();
    expect(s.isEmpty(0)).toBe(true);
  });

  test('LCCI example 2: stackSize=2, multiple pushes and pops', () => {
    const s = new ThreeStacks<number>(2);
    s.push(0, 1);
    s.push(0, 2);
    expect(() => s.push(0, 3)).toThrow(); // stack full
    expect(s.pop(0)).toBe(2);
    expect(s.pop(0)).toBe(1);
    expect(s.pop(0)).toBeUndefined();
    expect(s.peek(0)).toBeUndefined();
  });
});
