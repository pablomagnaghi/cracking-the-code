import { MyQueue } from '../../src/stacks-and-queues/04-queue-via-stacks';

describe('MyQueue', () => {
  test('enqueue and dequeue elements in FIFO order', () => {
    const queue = new MyQueue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBeUndefined();
  });

  test('peek returns the front of the queue without removing it', () => {
    const queue = new MyQueue<string>();
    queue.enqueue('a');
    queue.enqueue('b');

    expect(queue.peek()).toBe('a');
    expect(queue.dequeue()).toBe('a');
    expect(queue.peek()).toBe('b');
  });

  test('isEmpty works correctly', () => {
    const queue = new MyQueue<number>();
    expect(queue.isEmpty()).toBe(true);

    queue.enqueue(42);
    expect(queue.isEmpty()).toBe(false);

    queue.dequeue();
    expect(queue.isEmpty()).toBe(true);
  });

  test('handles interleaved operations correctly', () => {
    const queue = new MyQueue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.dequeue()).toBe(1);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.isEmpty()).toBe(true);
  });

  test('LCCI example: push 1, push 2, peek, pop, empty', () => {
    const queue = new MyQueue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.peek()).toBe(1);
    expect(queue.dequeue()).toBe(1);
    expect(queue.isEmpty()).toBe(false);
  });

  test('LCCI: multiple push then sequential dequeue maintains FIFO', () => {
    const queue = new MyQueue<number>();
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);
    queue.enqueue(40);
    expect(queue.dequeue()).toBe(10);
    expect(queue.dequeue()).toBe(20);
    expect(queue.peek()).toBe(30);
    expect(queue.dequeue()).toBe(30);
    expect(queue.dequeue()).toBe(40);
    expect(queue.isEmpty()).toBe(true);
  });
});
