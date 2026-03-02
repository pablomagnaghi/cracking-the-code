import { SocialNetwork } from '../../src/system-design/02-social-network';

describe('SocialNetwork', () => {
  let network: SocialNetwork;

  beforeEach(() => {
    network = new SocialNetwork();
  });

  test('adds people and retrieves them', () => {
    network.addPerson(1, 'Alice');
    network.addPerson(2, 'Bob');
    expect(network.getPerson(1)!.name).toBe('Alice');
    expect(network.getPerson(2)!.name).toBe('Bob');
    expect(network.getPerson(3)).toBeUndefined();
  });

  test('creates bidirectional friendships', () => {
    network.addPerson(1, 'Alice');
    network.addPerson(2, 'Bob');
    network.addFriendship(1, 2);
    expect(network.getPerson(1)!.friends.has(2)).toBe(true);
    expect(network.getPerson(2)!.friends.has(1)).toBe(true);
  });

  test('shortest path between direct friends is length 2', () => {
    network.addPerson(1, 'Alice');
    network.addPerson(2, 'Bob');
    network.addFriendship(1, 2);
    const path = network.shortestPath(1, 2);
    expect(path).toEqual([1, 2]);
  });

  test('shortest path to self is just the person', () => {
    network.addPerson(1, 'Alice');
    const path = network.shortestPath(1, 1);
    expect(path).toEqual([1]);
  });

  test('finds shortest path through multiple people', () => {
    // Alice - Bob - Carol - Dave
    network.addPerson(1, 'Alice');
    network.addPerson(2, 'Bob');
    network.addPerson(3, 'Carol');
    network.addPerson(4, 'Dave');
    network.addFriendship(1, 2);
    network.addFriendship(2, 3);
    network.addFriendship(3, 4);
    const path = network.shortestPath(1, 4);
    expect(path).not.toBeNull();
    expect(path!.length).toBe(4);
    expect(path![0]).toBe(1);
    expect(path![path!.length - 1]).toBe(4);
  });

  test('returns null when no path exists', () => {
    network.addPerson(1, 'Alice');
    network.addPerson(2, 'Bob');
    // No friendship
    const path = network.shortestPath(1, 2);
    expect(path).toBeNull();
  });

  test('finds shortest path when multiple paths exist', () => {
    // 1 - 2 - 3
    // 1 - 4 - 5 - 3
    network.addPerson(1, 'Alice');
    network.addPerson(2, 'Bob');
    network.addPerson(3, 'Carol');
    network.addPerson(4, 'Dave');
    network.addPerson(5, 'Eve');
    network.addFriendship(1, 2);
    network.addFriendship(2, 3);
    network.addFriendship(1, 4);
    network.addFriendship(4, 5);
    network.addFriendship(5, 3);
    const path = network.shortestPath(1, 3);
    expect(path).not.toBeNull();
    expect(path!.length).toBe(3); // shortest is 1 -> 2 -> 3
  });

  test('returns null for nonexistent person', () => {
    network.addPerson(1, 'Alice');
    expect(network.shortestPath(1, 999)).toBeNull();
    expect(network.shortestPath(999, 1)).toBeNull();
  });

  test('throws when adding friendship with nonexistent person', () => {
    network.addPerson(1, 'Alice');
    expect(() => network.addFriendship(1, 999)).toThrow();
  });
});
