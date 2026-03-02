// 12.08. Copy Node
//
// Write a method that takes a pointer to a Node structure and returns a
// complete copy of the passed-in data structure. The data structure is a
// graph where each node has a value, a list of neighbors, and potentially
// a random pointer (like a linked list with random pointers, generalized
// to a graph).
//
// Approach:
//   Use a HashMap (Map<original, clone>) to track already-cloned nodes,
//   preventing infinite loops on cycles. For each node:
//     1. If already cloned, return the existing clone.
//     2. Otherwise, create a new GraphNode with the same value.
//     3. Store it in the map.
//     4. Recursively clone all neighbors.
//   This runs in O(V + E) time and O(V) space.
//
// Example:
//   1 -- 2
//   |    |
//   3 -- 4
//   copyGraph(node1) returns a deep clone of the entire graph.
//
// Constraints:
//   - The graph may contain cycles.
//   - Node values are numbers.
//   - If the input is null, return null.

export class GraphNode {
  value: number;
  neighbors: GraphNode[];

  constructor(value: number, neighbors: GraphNode[] = []) {
    this.value = value;
    this.neighbors = neighbors;
  }
}

export function copyGraph(node: GraphNode | null): GraphNode | null {
  if (node === null) return null;

  const cloneMap = new Map<GraphNode, GraphNode>();

  function cloneNode(original: GraphNode): GraphNode {
    if (cloneMap.has(original)) {
      return cloneMap.get(original)!;
    }

    const copy = new GraphNode(original.value);
    cloneMap.set(original, copy);

    for (const neighbor of original.neighbors) {
      copy.neighbors.push(cloneNode(neighbor));
    }

    return copy;
  }

  return cloneNode(node);
}
