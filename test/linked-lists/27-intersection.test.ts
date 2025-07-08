import {intersection, Node } from '../../src/linked-lists/27-intersection';

describe('intersection', () => {
  test('returns the intersecting node when lists intersect', () => {
    const common: Node<number> = { value: 8, next: { value: 10 } };

    const listA: Node<number> = {
      value: 3,
      next: {
        value: 7,
        next: common,
      },
    };

    const listB: Node<number> = {
      value: 99,
      next: {
        value: 1,
        next: common,
      },
    };

    const result = intersection(listA, listB);
    expect(result).toBe(common);
  });

  test('returns undefined when there is no intersection', () => {
    const listA: Node<number> = {
      value: 1,
      next: { value: 2, next: { value: 3 } },
    };

    const listB: Node<number> = {
      value: 4,
      next: { value: 5, next: { value: 6 } },
    };

    const result = intersection(listA, listB);
    expect(result).toBeUndefined();
  });

  test('returns undefined when one list is empty', () => {
    const listA: Node<number> = {
      value: 1,
      next: { value: 2 },
    };

    const result = intersection(listA, undefined);
    expect(result).toBeUndefined();
  });

  test('returns undefined when both lists are empty', () => {
    const result = intersection(undefined, undefined);
    expect(result).toBeUndefined();
  });

  test('returns head when both lists are the same object', () => {
    const shared: Node<number> = {
      value: 42,
      next: { value: 100 },
    };

    const result = intersection(shared, shared);
    expect(result).toBe(shared);
  });
});