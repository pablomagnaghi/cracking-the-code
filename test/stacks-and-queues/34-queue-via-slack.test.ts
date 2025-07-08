import { MyQueue } from '../../src/stacks-and-queues/34-queue-via-stacks';

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
});
