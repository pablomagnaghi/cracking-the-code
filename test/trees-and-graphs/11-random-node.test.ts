import { TreeNode } from '../../src/trees-and-graphs/11-random-node';

describe('TreeNode - getRandomNode', () => {
  let root: TreeNode<number>;

  beforeEach(() => {
    root = new TreeNode(10);
    [5, 15, 3, 7, 13, 17].forEach((n) => root.insert(n));
  });

  test('find returns the correct node', () => {
    expect(root.find(10)?.value).toBe(10);
    expect(root.find(3)?.value).toBe(3);
    expect(root.find(13)?.value).toBe(13);
    expect(root.find(999)).toBeUndefined();
  });

  test('getRandomNode returns a value from the tree', () => {
    const validValues = new Set([3, 5, 7, 10, 13, 15, 17]);

    for (let i = 0; i < 100; i++) {
      const node = root.getRandomNode();
      expect(validValues.has(node.value)).toBe(true);
    }
  });

  test('getRandomNode roughly distributes results', () => {
    const counts: Record<number, number> = {};
    const iterations = 10000;

    for (let i = 0; i < iterations; i++) {
      const node = root.getRandomNode();
      counts[node.value] = (counts[node.value] || 0) + 1;
    }

    // Ensure all nodes were selected at least once
    [3, 5, 7, 10, 13, 15, 17].forEach((v) => {
      expect(counts[v]).toBeGreaterThan(0);
    });

    // Optionally: check rough distribution
    const expected = iterations / 7;
    const tolerance = expected * 0.5; // allow ±50% deviation
    Object.values(counts).forEach((count) => {
      expect(count).toBeGreaterThanOrEqual(expected - tolerance);
      expect(count).toBeLessThanOrEqual(expected + tolerance);
    });
  });
});
