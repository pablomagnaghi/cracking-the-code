import { GraphNode, hasRouteBetweenNodes } from '../../src/trees-and-graphs/01-route-between-nodes';

describe('hasRouteBetweenNodes', () => {
  test('returns true when path exists between nodes', () => {
    const a: GraphNode = { value: 1, neighbors: [] };
    const b: GraphNode = { value: 2, neighbors: [] };
    const c: GraphNode = { value: 3, neighbors: [] };
    const d: GraphNode = { value: 4, neighbors: [] };

    a.neighbors.push(b);
    b.neighbors.push(c);
    c.neighbors.push(d);

    expect(hasRouteBetweenNodes(a, d)).toBe(true);
  });

  test('returns false when no path exists', () => {
    const a: GraphNode = { value: 1, neighbors: [] };
    const b: GraphNode = { value: 2, neighbors: [] };
    const c: GraphNode = { value: 3, neighbors: [] };

    a.neighbors.push(b);
    // c is disconnected

    expect(hasRouteBetweenNodes(a, c)).toBe(false);
  });

  test('returns true when start and end are the same node', () => {
    const a: GraphNode = { value: 1, neighbors: [] };
    expect(hasRouteBetweenNodes(a, a)).toBe(true);
  });

  test('handles cycles without infinite loop', () => {
    const a: GraphNode = { value: 1, neighbors: [] };
    const b: GraphNode = { value: 2, neighbors: [] };
    const c: GraphNode = { value: 3, neighbors: [] };

    a.neighbors.push(b);
    b.neighbors.push(c);
    c.neighbors.push(a); // cycle

    expect(hasRouteBetweenNodes(a, c)).toBe(true);
    expect(hasRouteBetweenNodes(c, b)).toBe(true);
    expect(hasRouteBetweenNodes(b, a)).toBe(true);
  });

  test('returns false when end node is not reachable through the cycle', () => {
    const a: GraphNode = { value: 1, neighbors: [] };
    const b: GraphNode = { value: 2, neighbors: [] };
    const c: GraphNode = { value: 3, neighbors: [] };
    const d: GraphNode = { value: 4, neighbors: [] };

    a.neighbors.push(b);
    b.neighbors.push(c);
    c.neighbors.push(a); // cycle
    // d is not connected

    expect(hasRouteBetweenNodes(a, d)).toBe(false);
  });

  test('returns true for multi-branch graph with indirect route', () => {
    const a: GraphNode = { value: 1, neighbors: [] };
    const b: GraphNode = { value: 2, neighbors: [] };
    const c: GraphNode = { value: 3, neighbors: [] };
    const d: GraphNode = { value: 4, neighbors: [] };
    const e: GraphNode = { value: 5, neighbors: [] };

    a.neighbors.push(b, c);
    b.neighbors.push(d);
    c.neighbors.push(d);
    d.neighbors.push(e);

    expect(hasRouteBetweenNodes(a, e)).toBe(true);
  });

  test('returns false for directed graph where reverse path does not exist', () => {
    const a: GraphNode = { value: 1, neighbors: [] };
    const b: GraphNode = { value: 2, neighbors: [] };
    const c: GraphNode = { value: 3, neighbors: [] };

    a.neighbors.push(b);
    b.neighbors.push(c);
    // directed: no path from c back to a

    expect(hasRouteBetweenNodes(c, a)).toBe(false);
  });
});
