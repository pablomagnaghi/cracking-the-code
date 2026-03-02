// 09.02. Social Network
//
// How would you design the data structures for a very large social network
// like Facebook or LinkedIn? Describe how you would design an algorithm to
// show the shortest path between two people (e.g., Me -> Bob -> Susan -> Jason -> You).
//
// Approach:
//   Model the social network as an undirected graph where each Person is a
//   node with a unique id, name, and adjacency list of friends. Use
//   bidirectional BFS (starting from both source and destination
//   simultaneously) to find the shortest path, which is more efficient than
//   single-direction BFS on large social graphs. When the two BFS frontiers
//   collide, reconstruct the path.
//
// Example:
//   network.addPerson(1, 'Alice')
//   network.addPerson(2, 'Bob')
//   network.addFriendship(1, 2)
//   network.shortestPath(1, 2) => [1, 2]

export class Person {
  id: number;
  name: string;
  friends: Set<number> = new Set();

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class SocialNetwork {
  private people: Map<number, Person> = new Map();

  addPerson(id: number, name: string): Person {
    const person = new Person(id, name);
    this.people.set(id, person);
    return person;
  }

  getPerson(id: number): Person | undefined {
    return this.people.get(id);
  }

  addFriendship(id1: number, id2: number): void {
    const p1 = this.people.get(id1);
    const p2 = this.people.get(id2);
    if (!p1 || !p2) {
      throw new Error('Both people must exist in the network');
    }
    p1.friends.add(id2);
    p2.friends.add(id1);
  }

  shortestPath(sourceId: number, destId: number): number[] | null {
    if (!this.people.has(sourceId) || !this.people.has(destId)) {
      return null;
    }
    if (sourceId === destId) {
      return [sourceId];
    }

    // Bidirectional BFS
    const visitedFromSource: Map<number, number | null> = new Map();
    const visitedFromDest: Map<number, number | null> = new Map();

    const queueSource: number[] = [sourceId];
    const queueDest: number[] = [destId];

    visitedFromSource.set(sourceId, null);
    visitedFromDest.set(destId, null);

    while (queueSource.length > 0 || queueDest.length > 0) {
      // Expand from source side
      const collision1 = this.expandLevel(
        queueSource,
        visitedFromSource,
        visitedFromDest
      );
      if (collision1 !== null) {
        return this.buildPath(collision1, visitedFromSource, visitedFromDest);
      }

      // Expand from dest side
      const collision2 = this.expandLevel(
        queueDest,
        visitedFromDest,
        visitedFromSource
      );
      if (collision2 !== null) {
        return this.buildPath(collision2, visitedFromSource, visitedFromDest);
      }
    }

    return null; // No path found
  }

  private expandLevel(
    queue: number[],
    visitedThisSide: Map<number, number | null>,
    visitedOtherSide: Map<number, number | null>
  ): number | null {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const current = queue.shift()!;
      const person = this.people.get(current)!;

      for (const friendId of person.friends) {
        if (visitedOtherSide.has(friendId)) {
          // Collision found — record parent if not yet visited on this side
          if (!visitedThisSide.has(friendId)) {
            visitedThisSide.set(friendId, current);
          }
          return friendId;
        }
        if (!visitedThisSide.has(friendId)) {
          visitedThisSide.set(friendId, current);
          queue.push(friendId);
        }
      }
    }
    return null;
  }

  private buildPath(
    collision: number,
    visitedFromSource: Map<number, number | null>,
    visitedFromDest: Map<number, number | null>
  ): number[] {
    // Build path from source to collision
    const pathFromSource: number[] = [];
    let node: number | null = collision;
    while (node !== null) {
      pathFromSource.unshift(node);
      node = visitedFromSource.get(node) ?? null;
    }

    // Build path from collision to dest
    node = visitedFromDest.get(collision) ?? null;
    while (node !== null) {
      pathFromSource.push(node);
      node = visitedFromDest.get(node) ?? null;
    }

    return pathFromSource;
  }
}
