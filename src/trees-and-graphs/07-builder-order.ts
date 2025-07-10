// 7. *Build Order*:

// You are given a list of projects and a list of dependencies
// (which is a list of pairs of projects, where the second project is
// dependent on the first project). All of a project's dependencies
// must be built before the project is. Find a build order that will allow
// the projects to be built. If there is no valid build order, return an error.

// ```
// EXAMPLE Input:
// projects: a, b, c, d, e, f
// dependencies: (a, d), (f, b), (b, d), (f, a), (d, c)
// Output: e, f, a, b, d, c
// ```

export function buildOrder(projects: string[], dependencies: string[][]): string[] {
  const graph = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  // Initialize graph and inDegree
  for (const project of projects) {
    graph.set(project, []);
    inDegree.set(project, 0);
  }

  // Build graph and in-degree map
  for (const [before, after] of dependencies) {
    if (!graph.has(before) || !graph.has(after)) {
      throw new Error('Dependency references unknown project');
    }
    graph.get(before)!.push(after);
    inDegree.set(after, (inDegree.get(after) ?? 0) + 1);
  }

  // Start with projects with zero in-degree
  let queue = [
    ...Array.from(inDegree.entries())
      .filter(([_, degree]) => degree === 0)
      .map(([project]) => project),
  ];

  // Sort initially to ensure deterministic order
  queue.sort();

  const order: string[] = [];

  while (queue.length > 0) {
    // Always take the lex smallest project
    const current = queue.shift()!;
    order.push(current);

    for (const neighbor of graph.get(current)!) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        // Insert neighbor and keep queue sorted
        queue.push(neighbor);
        queue.sort();
      }
    }
  }

  if (order.length !== projects.length) {
    throw new Error('No valid build order exists');
  }

  return order;
}
