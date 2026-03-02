// LCCI 04.01. Route Between Nodes
//
// Given a directed graph, design an algorithm to find out whether there is a
// route between two nodes.
//
// Example 1:
//   Input: n = 3, graph = [[0, 1], [0, 2], [1, 2], [1, 2]], start = 0, target = 2
//   Output: true
//
// Example 2:
//   Input: n = 5, graph = [[0, 1], [0, 2], [0, 4], [0, 4], [0, 1], [1, 3],
//          [1, 4], [1, 3], [2, 3], [3, 4]], start = 0, target = 4
//   Output: true
//
// Constraints:
//   - Node count ranges from 0 to 100,000
//   - All node numbers fall within the range [0, n]
//   - The graph may contain self-cycles and duplicate edges

export type GraphNode = {
  value: number;
  neighbors: GraphNode[];
};

export function hasRouteBetweenNodes(start: GraphNode, end: GraphNode): boolean {
  if (!start || !end) {
    return false;
  }

  if (start === end) return true;

  const visited = new Set<GraphNode>();
  const queue: GraphNode[] = [start];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current === end) return true;
    visited.add(current);

    for (const neighbor of current.neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return false;
}
