import { StackMin } from '../../src/stacks-and-queues/32-stack-min';

describe('StackMin', () => {
  test('push, pop, and min operations', () => {
    const stack = new StackMin<number>();

    stack.push(5);
    expect(stack.min()).toBe(5);

    stack.push(6);
    expect(stack.min()).toBe(5);

    stack.push(3);
    expect(stack.min()).toBe(3);

    stack.push(7);
    expect(stack.min()).toBe(3);

    expect(stack.pop()).toBe(7);
    expect(stack.min()).toBe(3);

    expect(stack.pop()).toBe(3);
    expect(stack.min()).toBe(5);

    expect(stack.pop()).toBe(6);
    expect(stack.min()).toBe(5);

    expect(stack.pop()).toBe(5);
    expect(stack.min()).toBeUndefined();
  });

  test('handles duplicate minimums', () => {
    const stack = new StackMin<number>();

    stack.push(2);
    stack.push(2);
    stack.push(3);

    expect(stack.min()).toBe(2);

    stack.pop(); // 3
    expect(stack.min()).toBe(2);

    stack.pop(); // 2
    expect(stack.min()).toBe(2);

    stack.pop(); // 2
    expect(stack.min()).toBeUndefined();
  });

  test('isEmpty and peek', () => {
    const stack = new StackMin<number>();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.peek()).toBeUndefined();

    stack.push(10);
    expect(stack.isEmpty()).toBe(false);
    expect(stack.peek()).toBe(10);
  });

  test('min on empty stack returns undefined', () => {
    const stack = new StackMin<number>();
    expect(stack.min()).toBeUndefined();
  });
});
