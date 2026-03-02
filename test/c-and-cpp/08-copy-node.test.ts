import { GraphNode, copyGraph } from '../../src/c-and-cpp/08-copy-node';

describe('copyGraph', () => {
  test('returns null for null input', () => {
    expect(copyGraph(null)).toBeNull();
  });

  test('copies a single node', () => {
    const node = new GraphNode(1);
    const copy = copyGraph(node)!;
    expect(copy.value).toBe(1);
    expect(copy).not.toBe(node);
    expect(copy.neighbors).toHaveLength(0);
  });

  test('copies a two-node graph', () => {
    const a = new GraphNode(1);
    const b = new GraphNode(2);
    a.neighbors.push(b);
    b.neighbors.push(a);

    const copyA = copyGraph(a)!;
    expect(copyA.value).toBe(1);
    expect(copyA.neighbors).toHaveLength(1);
    expect(copyA.neighbors[0].value).toBe(2);
    // The copy's neighbor should point back to the copy, not to original
    expect(copyA.neighbors[0].neighbors[0]).toBe(copyA);
  });

  test('copies a linear chain', () => {
    const n1 = new GraphNode(1);
    const n2 = new GraphNode(2);
    const n3 = new GraphNode(3);
    n1.neighbors.push(n2);
    n2.neighbors.push(n3);

    const copy = copyGraph(n1)!;
    expect(copy.value).toBe(1);
    expect(copy.neighbors[0].value).toBe(2);
    expect(copy.neighbors[0].neighbors[0].value).toBe(3);
    // Ensure deep copy (different references)
    expect(copy).not.toBe(n1);
    expect(copy.neighbors[0]).not.toBe(n2);
    expect(copy.neighbors[0].neighbors[0]).not.toBe(n3);
  });

  test('copies a cyclic graph (triangle)', () => {
    const a = new GraphNode(1);
    const b = new GraphNode(2);
    const c = new GraphNode(3);
    a.neighbors.push(b);
    b.neighbors.push(c);
    c.neighbors.push(a);

    const copyA = copyGraph(a)!;
    const copyB = copyA.neighbors[0];
    const copyC = copyB.neighbors[0];
    expect(copyC.neighbors[0]).toBe(copyA); // cycle preserved in copy
    expect(copyA).not.toBe(a);
    expect(copyB).not.toBe(b);
    expect(copyC).not.toBe(c);
  });

  test('copies a node with multiple neighbors', () => {
    const center = new GraphNode(0);
    const n1 = new GraphNode(1);
    const n2 = new GraphNode(2);
    const n3 = new GraphNode(3);
    center.neighbors.push(n1, n2, n3);

    const copy = copyGraph(center)!;
    expect(copy.neighbors).toHaveLength(3);
    expect(copy.neighbors.map((n) => n.value).sort()).toEqual([1, 2, 3]);
  });

  test('copies a fully connected graph of 4 nodes', () => {
    const nodes = [new GraphNode(1), new GraphNode(2), new GraphNode(3), new GraphNode(4)];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (i !== j) nodes[i].neighbors.push(nodes[j]);
      }
    }

    const copy = copyGraph(nodes[0])!;
    expect(copy.neighbors).toHaveLength(3);
    // All copied neighbors should be distinct from originals
    const allCopied = new Set<GraphNode>();
    const queue = [copy];
    while (queue.length > 0) {
      const n = queue.shift()!;
      if (allCopied.has(n)) continue;
      allCopied.add(n);
      queue.push(...n.neighbors);
    }
    expect(allCopied.size).toBe(4);
    for (const original of nodes) {
      expect(allCopied.has(original)).toBe(false);
    }
  });

  test('preserves node values correctly', () => {
    const a = new GraphNode(42);
    const b = new GraphNode(99);
    a.neighbors.push(b);

    const copy = copyGraph(a)!;
    expect(copy.value).toBe(42);
    expect(copy.neighbors[0].value).toBe(99);
  });
});
