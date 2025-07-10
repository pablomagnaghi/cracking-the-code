// 1. *Route Between Nodes*:

// Given a directed graph, design an algorithm to find out whether there is a route
// between two nodes.

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
