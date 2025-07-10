import { StackOfPlates } from '../../src/stacks-and-queues/03-stacks-of-plates';

describe('StackOfPlates', () => {
  test('push and pop behave like a single stack', () => {
    const stack = new StackOfPlates<number>(2);
    stack.push(1);
    stack.push(2); // fills first stack
    stack.push(3); // new sub-stack
    stack.push(4); // fills second stack

    expect(stack.pop()).toBe(4);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeUndefined(); // empty
  });

  test('handles empty stack correctly', () => {
    const stack = new StackOfPlates<number>(3);
    expect(stack.pop()).toBeUndefined();
  });

  test('creates new sub-stack when capacity exceeded', () => {
    const stack = new StackOfPlates<number>(2);
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.push(40);

    // Check internal structure
    // @ts-expect-error - accessing private property for test only
    const stacks = stack.stacks;
    expect(stacks.length).toBe(2);
    expect(stacks[0]).toEqual([10, 20]);
    expect(stacks[1]).toEqual([30, 40]);
  });

  test('removes empty sub-stacks after pop', () => {
    const stack = new StackOfPlates<number>(1);
    stack.push(100);
    stack.push(200);

    expect(stack.pop()).toBe(200);
    // @ts-expect-error - accessing private property for test only
    expect(stack.stacks.length).toBe(1);

    expect(stack.pop()).toBe(100);
    // @ts-expect-error - accessing private property for test only
    expect(stack.stacks.length).toBe(0);
  });

  test('throws error when capacity < 1', () => {
    expect(() => new StackOfPlates<number>(0)).toThrow('Capacity must be at least 1');
  });

  test('popAt removes top item from specific sub-stack', () => {
    const stacks = new StackOfPlates<number>(2);
    stacks.push(1);
    stacks.push(2); // [1, 2]
    stacks.push(3);
    stacks.push(4); // [3, 4]
    stacks.push(5); // [5]

    expect(stacks.popAt(0)).toBe(2); // Pops from first stack
    expect(stacks.popAt(0)).toBe(1); // Now first stack is empty and should be removed
  });

  test('popAt removes empty sub-stack after popping', () => {
    const stacks = new StackOfPlates<number>(2);
    stacks.push(10);
    stacks.push(20); // [10, 20]
    stacks.push(30); // [30]

    expect(stacks.popAt(1)).toBe(30); // [30] becomes empty and should be removed
  });

  test('popAt returns undefined for invalid index', () => {
    const stacks = new StackOfPlates<number>(2);
    stacks.push(1);
    stacks.push(2);

    expect(stacks.popAt(-1)).toBeUndefined();
    expect(stacks.popAt(5)).toBeUndefined();
  });

  test('popAt on all stacks empties them correctly', () => {
    const stacks = new StackOfPlates<number>(2);
    stacks.push(1);
    stacks.push(2); // [1, 2]
    stacks.push(3);
    stacks.push(4); // [3, 4]

    expect(stacks.popAt(1)).toBe(4);
    expect(stacks.popAt(1)).toBe(3);
    expect(stacks.popAt(0)).toBe(2);
    expect(stacks.popAt(0)).toBe(1);
    expect(stacks.popAt(0)).toBeUndefined();
  });
});
