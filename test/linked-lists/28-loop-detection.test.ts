import {detectLoop, Node } from '../../src/linked-lists/28-loop-detection';

describe('detectLoop', () => {
  test('returns null for an empty list', () => {
    expect(detectLoop(undefined)).toBeNull();
  });

  test('returns null for a list with no cycle', () => {
    const node1: Node<number> = { value: 1 };
    const node2: Node<number> = { value: 2 };
    const node3: Node<number> = { value: 3 };

    node1.next = node2;
    node2.next = node3;

    expect(detectLoop(node1)).toBeNull();
  });

  test('detects cycle in a small list', () => {
    const node1: Node<number> = { value: 1 };
    const node2: Node<number> = { value: 2 };
    const node3: Node<number> = { value: 3 };
    const node4: Node<number> = { value: 4 };

    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node2; // cycle here

    const loopStart = detectLoop(node1);
    expect(loopStart).toBe(node2);
  });

  test('detects cycle starting at head', () => {
    const node1: Node<number> = { value: 1 };
    const node2: Node<number> = { value: 2 };
    const node3: Node<number> = { value: 3 };

    node1.next = node2;
    node2.next = node3;
    node3.next = node1; // cycle starts at head

    const loopStart = detectLoop(node1);
    expect(loopStart).toBe(node1);
  });

  test('detects cycle in longer list', () => {
    const nodes: Node<number>[] = Array.from({ length: 10 }, (_, i) => ({ value: i }));
    for (let i = 0; i < 9; i++) {
      nodes[i].next = nodes[i + 1];
    }
    nodes[9].next = nodes[4]; // cycle starts at node with value 4

    const loopStart = detectLoop(nodes[0]);
    expect(loopStart).toBe(nodes[4]);
  });
});
